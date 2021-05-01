//importation de mongoose
const mongoose = require('mongoose');

//création d'un schéma produit pour la base de donnée MongoDB 
const sauceSchema = mongoose.Schema({
    userId : { type: String, required: true},
    name: { type : String, require: true},
    manufacturer : { type : String, required : true},
    description: { type: String, required: true},
    mainPepper : { type: String, required: true},
    imageUrl: { type : String, required: true},
    heat : { type : Number, required: true},
    likes : { type : Number, required: false, default: 0},//à expliquer 
    dislikes : { type: Number, requied: false, default: 0},
    usersLiked : { type : [String]},
    usersDisliked : { type : [String]},

});

//exporte le schéma de données pour interagir acvec l'application
module.exports = mongoose.model('Sauce', sauceSchema);


