//utilisation de bcryp pour hasher le mot de passe des Users
const bcrypt = require('bcrypt');

//récupération schéma User
const User = require('../models/User');

//utilisation package jsonwebtoken pour attribuer un token au User au moment de sa connection
const jwt = require('jsonwebtoken');

//middleware creation nouvel User

exports.signup = (req, res, next) =>{
      // nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois. 
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //création nouvel User
        const user = new User({
            //on passe email trouvé dans le corps de la requête
            email: req.body.email,
            //récupération du mdp hashé de bcrypt
            password: hash
        });
        //enregistrement de User dans BDD
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur crée'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

// Le Middleware pour la connexion d'un utilisateur vérifie si l'utilisateur existe dans la base MongoDB lors du login
//si oui il vérifie son mot de passe, s'il est bon il renvoie un TOKEN contenant l'id de l'utilisateur, sinon il renvoie une erreur 401 Unauthorized
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé !'});
        }
        //utilisation de bcrypt pour comparer les hashs pour être sur d'avoir les même string d'origine
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({error: 'Mot de passe incorrect !'});
            }
            // Si true, on renvoie un statut 200 et un objet JSON avec un userID + un token
            res.status(200).json({
                userId : user._id,
                //verify si la requête est authentifié
                token: jwt.sign(
                    {userId: user.id},
                    'RANDOM_TOKEN_SECRET',
                    {
                    expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error=> res.status(500).json({error}));
};


