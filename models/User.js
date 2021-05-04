//importation de mongoose
const mongoose = require('mongoose');
//https://www.npmjs.com/package/mongoose-type-email
require('mongoose-type-email');

//Valide que l'émail est bien unique
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

//création d'un schéma user pour la base de donnée MongoDB 
const userSchema = mongoose.Schema({
    email : { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
        },
    password: { 
        type: String, 
        required: true}
});

//  Plugin pour vérifier un email unique
userSchema.plugin(uniqueValidator);

// Plugin pour Mongoose qui purifie les champs du model avant de les enregistrer dans la base MongoDB.
// On utilise le HTML Sanitizer de Google Caja pour effectuer cette désinfection.
userSchema.plugin(sanitizerPlugin);


//exporte le schéma de données pour interagir acvec l'application
module.exports = mongoose.model('User', userSchema);

