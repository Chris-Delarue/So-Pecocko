//importation de mongoose
const mongoose = require('mongoose');


//Valide que l'émail est bien unique
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

//création d'un schéma user pour la base de donnée MongoDB 
const userSchema = mongoose.Schema({
    email : { 
        type: String, 
        required: true,
        unique: true,
    },
        password: { 
        type: String, 
        required: true},

});

//  Plugin pour vérifier un email unique
userSchema.plugin(uniqueValidator);


userSchema.plugin(sanitizerPlugin);


//exporte le schéma de données pour interagir acvec l'application
module.exports = mongoose.model('User', userSchema);

