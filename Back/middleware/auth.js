"use strict";

//Verif Tokens
const jwt = require('jsonwebtoken');

// Middleware qui sera applique a toutes les routes
//Export de la fonction de verif
module.exports = (req, res, next) => {
    try {
        //recup le token dans le header
        const token = req.headers.authorization.split(' ')[1];
        //decoder le token
        const decodedToken = jwt.verify(token, 'KEY_TOKEN_SECRET_GROUPOMANIA');
        //recupere le userId dans objet decodetoken
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'ID utilisateur non valable';
        } else {
            req.user = decodedToken;
            next();
        }
    } catch (error) {
        //Pblm authentification
        res.status(401).json({ error: error | 'Echec authentification' });
    }
};