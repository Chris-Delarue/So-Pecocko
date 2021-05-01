//import modèle sauce
const Sauce = require('../models/Sauce');
//récupératiopn module 'file system' de Node pour gérer les images
const fs = require('fs');

//permet de créer une nouvelle sauce, nous exposons la logique de notre route POST en tant que fonction appelée createSauce
exports.createSauce = (req, res, next) => {
    //stock les données reçu du front-end sous forme de data et les transforment en objet dans une variable
   
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
    .catch(error => res.status(400).json({error}));
}
//modification d'un sauce
exports.modifySauce = (req, res ,next) =>{
    const sauceObjet = req.file ? 
    {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}: {...req.body}; 
    
    Sauce.updateOne({ _id: req.params.id}, {...sauceObjet, _id: req.params.id})
    .then(() => res.status(200).json({message:'votre sauce a été modifiée!'}))
    .catch(error => res.statut(400).json({error}));
};

// suppression sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce=> {
        //nous utilisons le fait de savoir que notre URL d'image contient un segment /images/ pour séparer le nom de fichier ;
        const filename = sauce.imageUrl.split('/image/')[1];
        //nous utilisons ensuite la fonction unlink du package fs pour supprimer ce fichier, en lui passant le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé ;
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id})
            .then(() => res.status(200).json({message : 'Votre sauce a été supprimée !'}))
            .catch(error => res.status(400).json({error}));
        });
    })
    .catch(error => res.status(500).json({error}));
}; 
//récupération une sauce 
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}));
};
//récupération toutes les sauces
exports.getAllSauces = (req, res, next) =>{
    Sauce.find({})
    .then(sauces => res.status(200).json(sauces))
    .catch( error => res.status(400).json({error}));
};
//Incrementation LIKES et DISLIKES des sauces A COMPLETER
exports.likeDislikeSauce = (req, res, next) =>{
    //L'instruction switch évalue une expression et, selon le résultat obtenu et le cas associé, exécute les instructions correspondantes.
    switch(req.body.like){
        //default = 0 verification que l'User n'a pas déjà liker la sauce
        case 0:
            Sauce.findOne({_id: req.params.id})
            .then((sauce) => {
                if(sauce.usersLiked.find(user => user === req.body.userId)){
                    Sauce.updateOne({_id: req.params.id}, {
                        //$inc permet de rajouter une valeur à une donnée numérique. Cette valeur peut être positive ou négative.
                        $inc: {likes: -1},
                        //Pour supprimer un élément, on peut utiliser $pull.
                        $pull : {usersLiked: req.body.userId}

                    })
                    .then(() => res.status(201).json({message: 'Votre avis a été pris en compte !'}))
                    .catch(error => res.status(400).json({error}));
                }//verification que l'User n'a pas déjà disliker la sauce
                if (sauce.usersDisliked.find(user => user === req.body.userId)){
                    Sauce .updateOne({ _id: req.params.id},{
                    $inc: {dislikes: -1},
                    $pull: { usersDisliked: req.body.userId}
                })
                .then(() => res.status(201).json({message: 'Votre avis a été pris en compte !'}))
                .catch(error => res.status(400).json({error}));
            }  
        })   
        .catch(error => res.status(404).json({error}));
        break;//L'instruction break permet de terminer la boucle en cours ou l'instruction switch ou label en cours et de passer le contrôle du programme à l'instruction suivant l'instruction terminée.

        // likes = 0
        case 1:
            Sauce.updateOne({_id: req.params.id}, {
                $inc: { likes: 1},
                //L’opérateur $push permet de rajouter un nouvel élément à un tableau.
                $push: {usersLiked: req.body.userId}
            })
            .then(()=> res.status(201).json({message: 'Votre like a été pris en compte !'}))
            .catch(error => res.status(400).json({error}));
            break;
        //likes = -1
        case -1:
            Sauce.updateOne({ _id: req.params.id}, {
                $inc: { dislikes: 1},
                $push: { usersDisliked: req.body.userId}
            })
            .then(() => res.status(201).json({message: 'Votre dislike a été pris en compte !'}))
            .catch(error => res.status(400).json({error}));
            break;
            default:
                console.error('mauvaise requête !')
    }
};


