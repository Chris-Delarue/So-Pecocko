
// importation d'express - framework node.js
const express = require('express');

// aide à proteger les en-têtes HTTP
//Helmet  aide à protéger l'application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.
const helmet = require('helmet');

const nocache = require('nocache');

//permet d'extraire l'objet json des requête post
const bodyParser = require('body-parser');


//plugin Mongoose pour utiliser la base de donnée MondoBD
const mongoose = require('mongoose'); 

// accès au chemin de notre système fichier
const path = require('path');


//déclaration des routes
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

//création d'une application express
const app = express();

//masque les infos de connextion à la BDD à l'aide dune variable d'environnement
require('dotenv').config();

//connection à la base de données MongoDB sécurisé vers le fichier .env
mongoose.connect(process.env.DB_URI,
    {
      useCreateIndex: true,
      userNewUrlParser: true,
      useUnifiedTopology: true
    })
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch(()=> console.log('Connexion à MongoDB échoué !'));

// mise en place X-XSS-Protection pour activer le filtre script intersiteXSS dans les navigateurs. cross-scripting protection
app.use(helmet());

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 
// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

//transforme les données arrivant de la requête POST en un objet JSON
app.use(bodyParser.json());


//Désactive la mise en cache du navigateur
app.use(nocache());

//routes dédiées aux sauces
app.use('/api/sauces', sauceRoutes);

//routes dédiées aux utilisateurs
app.use('/api/auth', userRoutes);

//export de l'application express pour déclaration dans server.js
module.exports = app;

