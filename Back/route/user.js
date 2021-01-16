"use strict";

module.exports = function (app) {

    const users = require('../controller/user.js');
    const auth = require('../middleware/auth');
    const multerProfile = require('../middleware/multer-config-profile');

    //Importation limiteur de débit
    const rateLimit = require('express-rate-limit');
    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // laps de temps de 15 min
        max: 3
    });

    //Variable de validation des champs 
    const { body, validationResult } = require('express-validator');

    app.post('/api/auth/signup', [
        body('lastname').matches(/^([A-Z{1}])?[a-zéèçà]{2,25}(-| )?([A-Z{1}])?([a-zéèçà]{2,25})?$/),
        body('firstname').matches(/^([A-Z{1}])?[a-zéèçà]{2,25}(-| )?([A-Z{1}])?([a-zéèçà]{2,25})?$/),
        // Vérification de l'email
        body('email').isEmail(),
        // le mot de passe doit comporter au moins 6 caractères
        body('password').matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,45}/)
    ], users.create);
    app.post('/api/auth/login', apiLimiter, [
        // Vérification de l'email
        body('email').isEmail(),
        // le mot de passe doit comporter au moins 6 caractères
        body('password').matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,45}/)
    ], users.login);
    //Current User
    app.put('/api/users/modify', auth, multerProfile, users.update);
    app.delete('/api/users/', auth, users.delete);
    app.get('/api/users/current', auth, users.findCurrentUser);
    //ADMIN
    app.delete('/api/users/:id', auth, users.adminDelete);
    app.get('/api/users', auth, users.findAll);
    
}

//isAlphanumeric mot de passe Admin