
//importation de mongoose
const mongoose = require('mongoose')

const sanitizerPlugin = require('mongoose-sanitizer-plugin');

//création d'un schéma produit pour la base de donnée MongoDB 
const sauceSchema = mongoose.Schema({
    userId : { 
        type: String, 
        required: true
    },
    name: { 
        type : String, 
        required: true,
        lowercase: true,
        trim: true
      },
    manufacturer : { 
        type : String, 
        required : true,
        trim: true
    },
    description: { 
        type: String, 
        required: true,
        trim: true
    },
    mainPepper : { 
        type: String, 
        required: true,
        trim: true
    },
    imageUrl: { 
        type : String, 
        required: true,
        trim: true
    },
    heat : { 
        type : Number,
         required: true
        },
    likes : { 
        type : Number
    },
    dislikes : { 
        type: Number
    },
    usersLiked : { 
        type : [String]
    },
    usersDisliked : { 
        type : [String]
    },
});

sauceSchema.plugin(sanitizerPlugin);

//exporte le schéma de données pour interagir acvec l'application
module.exports = mongoose.model('Sauce', sauceSchema);


