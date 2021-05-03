//https://www.npmjs.com/package/mongoose-validator
const validate = require('mongoose-validator');

exports.nameValidator = [//Validation du chapms de la sauce
    
    validate ({
        validator : 'isLength',
        arguments : [3,50],//le nom de la sauce doit contenir entre 3 et 50 caractères
        message: 'le nom de la sauce doit contenir entre 3 et 60 caractères',
    }),
    validate ({
        validator: 'matches',
        arguments: /^[a-zA-Z\-]+$/i, // Regex pour restreindre le type de symboles utilisables
        message: 'Vous ne pouvez utiliser que des chiffres et des lettres pour nommer votre sauce',
    }),
];

exports.manufacturerValidator = [ //Validation pour le manufacturer
    validate({
        validator: 'isLength',
        arguments: [3, 50], 
        message: 'le nom du fabricant doit contenir entre 3 et 50 caractères',
    }),
    validate ({
        validator: 'matches',
        arguments: /^[a-zA-Z\-]+$/i,
        message: 'Vous ne pouvez utiliser que des chiffres et des lettres pour nommer le fabriquant',
    }),
];

exports.descriptionValidator = [ //Validation pour la description
    validate({
        validator: 'isLength',
        arguments: [10, 200], 
        message: 'la description de la sauce doit contenir entre 3 et 200 caractères',
    }),
    validate ({
        validator: 'matches',
        arguments: /^[a-zA-Z\-]+$/i,
        message: 'Vous ne pouvez utiliser que des chiffres et des lettres pour nommer la description de la sauce',
    }),
];

exports.pepperValidator = [ //Validation pour le non du piment 
    validate({
        validator: 'isLength',
        arguments: [3, 50], 
        message: 'le nom du piment doit contenir entre 3 et 50 caractères',
    }),
    validate ({
        validator: 'matches',
        arguments: /^[a-zA-Z\-]+$/i,
        message: 'Vous ne pouvez utiliser que des chiffres et des lettres pour le nom du piment',
    }),
];

