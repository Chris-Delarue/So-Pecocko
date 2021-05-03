const passwordSchema = require('../models/password');

//verification que le password correspond au SCHEMA

module.exports = (req,res, next) => {
    if(!passwordSchema.validate(req.body.password)){
        res.writeHead(400, '{"message" : "Mot de passe requis : 8 caractères minimun; Au moins 1 majuscule, 1 minuscule, Sans espace"}',{
            'content-type' : 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    }
     next();
};