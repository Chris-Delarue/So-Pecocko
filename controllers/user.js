//utilisation de bcryp pour hasher le mot de passe des Users
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata')

require('dotenv').config();
//const CryptoJS = require('crypto-js');
//récupération schéma User

const User = require('../models/User');

//middleware creation nouvel User

exports.signup = (req, res, next) =>{
     
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      
     const emailMask2Options = {
            maskWith: "*", 
            unmaskedStartCharactersBeforeAt: 0,
            unmaskedEndCharactersAfterAt: 0,
            maskAtTheRate: false
        }
       
        const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

        const user = new User({

            //on passe email trouvé dans le corps de la requête
            email:maskedEmail,
            //récupération du mdp hashé de bcrypt
            password: hash
           
        });  console.log(user)
        //enregistrement de User dans BDD
        user.save()
        .then(() => res.status(200).json({message: 'Utilisateur crée !'}))
        .catch(error => {
            console.log(error)
            res.status(500).json({error})
        } );
    })
    .catch(error => res.status(500).json({error}));
};

// Le Middleware pour la connexion d'un utilisateur vérifie si l'utilisateur existe dans la base MongoDB lors du login
//si oui il vérifie son mot de passe, s'il est bon il renvoie un TOKEN contenant l'id de l'utilisateur, sinon il renvoie une erreur 401 Unauthorized
exports.login = (req, res, next) => {

    const emailMask2Options = {
        maskWith: "*", 
        unmaskedStartCharactersBeforeAt: 0,
        unmaskedEndCharactersAfterAt: 0,
        maskAtTheRate: false
    }
    
    const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);


    User.findOne( {
        email : maskedEmail
      
    })
    .then(user => {
        if(!user){
           
            return res.status(401).json(
                {error: 'Utilisateur non trouvé !'}
          );
        }
        //utilisation de bcrypt pour comparer les hashs pour être sur d'avoir les même string d'origine
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(404).json({error: 'Veuillez vérifier votre émail et/ou votre mot de passe !'});
            }
            // Si true, on renvoie un statut 200 et un objet JSON avec un userID + un token
           res.status(200).json({
                userId : user._id,
                //verify si la requête est authentifié
                token: jwt.sign(//Encode un nouveau token avec une chaine de développement temporaire
                    {userId: user._id},
                    process.env.TOKEN_SECRET,//Clé d'encodage du token 
                    {
                    expiresIn: '24h'
                })
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error=> res.status(500).json({error}));
};


