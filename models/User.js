//importation de mongoose
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

//création d'un schéma user pour la base de donnée MongoDB 
const userSchema = mongoose.Schema({
    email : { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

//package qui valide une seule email adresse
userSchema.plugin(uniqueValidator);
//exporte le schéma de données pour interagir acvec l'application
module.exports = mongoose.model('User', userSchema);

