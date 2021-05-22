// Contient les fonctions qui s'appliquent aux différentes routes pour les utilisateurs
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

const passwordVerify = require('../middleware/passwordVerify');

// chiffre le mot de passe de l'USER et ajoute L'USER à la BDD
router.post('/signup', passwordVerify, userCtrl.signup);

//vérifie l'ID de l'USER en renvoyant userID depuis la BDD
router.post('/login', userCtrl.login);

module.exports = router;

