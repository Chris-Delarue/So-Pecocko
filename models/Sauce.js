//importation de mongoose
const mongoose = require('mongoose');

const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const validate = require('../middleware/sauceValidate');

//création d'un schéma produit pour la base de donnée MongoDB 
const sauceSchema = mongoose.Schema({
    userId : { type: String, required: true},
    name: { type : String, require: true},
    manufacturer : { type : String, required : true},
    description: { type: String, required: true},
    mainPepper : { type: String, required: true},
    imageUrl: { type : String, required: true},
    heat : { type : Number, required: true},
    likes : { type : Number, required: false},
    dislikes : { type: Number, requied: false},
    usersLiked : { type : [String]},
    usersDisliked : { type : [String]},
});
//https://www.npmjs.com/package/mongoose-sanitizer
// Plugin pour Mongoose qui purifie les champs du model avant de les enregistrer dans la base MongoDB.
// Utilise le HTML Sanitizer de Google Caja pour effectuer la désinfection.
sauceSchema.plugin(sanitizerPlugin);

//exporte le schéma de données pour interagir acvec l'application
module.exports = mongoose.model('Sauce', sauceSchema);


