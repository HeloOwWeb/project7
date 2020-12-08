"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
    credentials: true
};

//Premier Middleware qui sera execute par le serveur
// Middleware sera applique a toutes les routes
app.use((req, res, next) => {
    // Cors : détermine quelles origines sont autorisées aux ressources du serveur
    res.setHeader('Access-Control-Allow-Origin', '*');
    // indiquer quels en-têtes HTTP peuvent être utilisés lors de la demande réelle vers l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //Spécifie les méthodes autorisées lors de l'accès à la ressource
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());

//connexion à la BDD SQL avec Sequelize
const db = require('./config/config.js');

// Synchronisation
db.sequelize.sync({ force: true }).then(() => {
    console.log('Synchronise');
});

//Route
require('./route/user.js')(app);
require('./route/post.js')(app);

//Exportation de l'application
module.exports = app;

