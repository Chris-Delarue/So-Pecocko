//ajout de plugin externe pour utiliser le router d'Express
const express = require('express');
//appel du router
const router = express.Router();

//import du middleware auth pour sécuriser les routes
const auth = require('../middleware/auth');
//import du middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');

//pour réimplémenter cela dans notre route, nous devons importer notre contrôleur puis enregistrer sauceThing :
const sauceCtrl = require('../controllers/sauce');

//appel routes API

router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);


module.exports = router;




