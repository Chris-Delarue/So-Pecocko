
// importation d'express - framework node.js
const express = require('express');

// aide à proteger les en-têtes HTTP
//Helmet  aide à protéger l'application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.
const helmet = require('helmet');
const cookieSession = require('cookie-session');
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

//masque les infos de connextion à la BDD à l'aide dune variable d'environnement
require('dotenv').config();

//création d'une application express
const app = express();

//connection à la base de données MongoDB sécurisé vers le fichier .env
mongoose.connect(process.env.DB_URI,
    {
      useCreateIndex: true,
      userNewUrlParser: true,
      useUnifiedTopology: true
    })
.then(()=> console.log('Connexion à MongoDB réussie !'))
.catch(()=> console.log('Connexion à MongoDB échoué !'));



// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
  });

// options pour la sécurité des cookies
//https://www.npmjs.com/package/cookie-session
//https://github.com/expressjs/cookie-session
//Les cookies de session sont donc utilisés pour stocker des informations sur la session en cours. 
//ils utilisent des cookies de session pour se souvenir d’un utilisateur pendant une période limitée.
const expireDate = new Date(Date.now()+ 3600000); //1 heure (60*60*1000)
app.use(cookieSession({
  name : 'session',
  secret : process.env.SECRET_SES,
  cookie: {
      secure: true,
      httpOnly: true,
      domain: 'http://localhost:3000',
      expires: expireDate
  }
}));

// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

//transforme les données arrivant de la requête POST en un objet JSON
app.use(bodyParser.json());

// mise en place X-XSS-Protection pour activer le filtre script intersiteXSS dans les navigateurs
app.use(helmet());

//Désactive la mise en cache du navigateur
app.use(nocache());

//routes dédiées aux sauces
app.use('/api/sauces', sauceRoutes);

//routes dédiées aux utilisateurs
app.use('/api/auth', userRoutes);

//export de l'application express pour déclaration dans server.js
module.exports = app;

