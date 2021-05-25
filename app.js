
// importation d'express - framework node.js
const express = require('express');


const helmet = require('helmet');

const nocache = require('nocache');


const bodyParser = require('body-parser');


const mongoose = require('mongoose'); 

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


app.use(helmet());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 

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

