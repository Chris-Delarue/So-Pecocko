//import modèle sauce
const Sauce = require('../models/Sauce');
//récupératiopn module 'file system' de Node pour gérer les images
const fs = require('fs');

//permet de créer une nouvelle sauce
exports.createSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    
    //suppression de l'id
    delete sauceObject._id;
    //creation du modèle sauce
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisLiked: []
    });
    // sauvegarde dans la base de données et envoi une réponse 201 au frontend
    sauce.save()
    .then(() => res.status(201).json({message: 'Votre sauce est enregistrée !'}))
    //code d'erreur en cas de problème
    .catch(error => res.status(500).json({error}));
}
//modification d'un sauce
exports.modifySauce = (req, res ,next) =>{
    let sauceObjet = {}; 
    req.file ? (
        Sauce.findOne({
            _id: req.params.id
        }).then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`)
        }),
        sauceObjet = {

    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }
): (
    sauceObjet = {
        ...req.body
    }
)
    
    Sauce.updateOne({ _id: req.params.id}, {...sauceObjet, _id: req.params.id})
    .then(() => res.status(200).json({message:'votre sauce a été modifiée!'}))
    .catch(error => res.statut(500).json({error}));
};

// suppression sauce
exports.deleteSauce = (req, res, next) => {
    if(!req.params.id){
        return res.status(400).json({message: "bad request !"})
    }
    Sauce.findOne({ _id: req.params.id})
    .then(sauce=> {
        const filename = sauce.imageUrl.split('/images/')[1];
        
       
        fs.unlink(`images/${filename}`, () => {
            
            Sauce.deleteOne({ _id: req.params.id})
            .then(sauce => {
                 if(sauce){
                    return res.status(200).json({message : 'Votre sauce a été supprimée !'});
               } 
               return res.status(404).json({error: "La ressource demandée n'éxiste pas !"})
           })
            .catch(error => res.status(400).json({error}))
        });
    })
    .catch(error => res.status(500).json({error}))
};

//récupération une sauce 
exports.getOneSauce = (req, res, next) => {
    if(!req.params.id){
        return res.status(400).json({message: "bad request !"})
    }
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        if(sauce){
            return res.status(200).json(sauce);
        }
        return res.status(404).json({error: "La ressource demandée n'éxiste pas !"})
    })
    .catch(error => res.status(500).json({error}));
};
//récupération toutes les sauces
exports.getAllSauces = (req, res, next) =>{
    Sauce.find({})
    .then(sauces => res.status(200).json(sauces))
    .catch( error => res.status(500).json({error}));
};
//Incrementation LIKES et DISLIKES des sauces 
exports.likeDislikeSauce = (req, res, next) =>{
  
    switch(req.body.like){
       
        case 0:
            Sauce.findOne({_id: req.params.id})
            .then((sauce) => {
                if(sauce.usersLiked.find(user => user === req.body.userId)){
                    Sauce.updateOne({_id: req.params.id}, {
                      
                        $inc: {likes: -1},
                        $pull : {usersLiked: req.body.userId}

                    })
                    .then(() => res.status(201).json({message: 'Votre avis a été pris en compte !'}))
                    .catch(error => res.status(500).json({error}));
                }//verification que l'User n'a pas déjà disliker la sauce
                if (sauce.usersDisliked.find(user => user === req.body.userId)){
                    Sauce .updateOne({ _id: req.params.id},{
                    $inc: {dislikes: -1},
                    $pull: { usersDisliked: req.body.userId}
                })
                .then(() => res.status(201).json({message: 'Votre avis a été pris en compte !'}))
                .catch(error => res.status(500).json({error}));
            }  console.log(req.body)
        })   
        .catch(error => res.status(500).json({error}));
        break;
        case 1:
            Sauce.updateOne({_id: req.params.id}, {
                $inc: { likes: 1},
                $push: {usersLiked: req.body.userId}
            })
            .then(()=> res.status(201).json({message: 'Votre like a été pris en compte !'}))
            .catch(error => res.status(500).json({error}));
            break;
        case -1:
            Sauce.updateOne({ _id: req.params.id}, {
                $inc: { dislikes: 1},
                $push: { usersDisliked: req.body.userId}
            })
            .then(() => res.status(201).json({message: 'Votre dislike a été pris en compte !'}))
            .catch(error => res.status(500).json({error}));
            break;
            default:
                console.error('mauvaise requête !')
    }
};


