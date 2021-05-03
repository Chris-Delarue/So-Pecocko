const passwordValidator = require('password-validator');


//crétaion schéma plus sécurisé
const passwordSchema = new passwordValidator();


passwordSchema
                                                //https://www.npmjs.com/package/password-validator
.is().min(8)                                    //minimum lenght 8
.is().max(50)                                   //maximum Lenght 50
.has().uppercase()                              // doit avoir au moins une majuscule
.has().lowercase()                              //doit avoir au moins une minuscule
.has().digits(1)                                //doit avoir au moins un chiffre
.has().not().spaces()                           //ne doit pas voir d'espace
.is().not().oneOf(['PasswOrd', 'Password123']); //valeurs à proscrire

module.exports = passwordSchema;