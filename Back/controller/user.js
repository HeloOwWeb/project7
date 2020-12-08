﻿"use strict";

const db = require('../config/config.js');
const User = db.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifAvecToken = (req) => { return req.user.userId };

function maskEmail(email) {
    // Fonction pour remplacer l'email avec '*' -> RGDP
    function mask(string) {
        //Si l'email est plus long que 4 caract�res, remplacer le tout sauf la premi�re lette
        if (string.length > 4) {
            return (
                string.substr(0, 1) +
                string.substr(1, string.length - 1).replace(/\w/g, "*") +
                string.substr(-1, 1)
            );
        }
        // sinon remplace le tout par des �toiles
        return string.replace(/\w/g, "");
    }
    return email.replace(/([\w.]+)@([\w.]+)(\.[\w.]+)/g, function (
        m,
        p1,
        p2,
        p3
    ) {
        return mask(p1) + "@" + mask(p2) + p3;
    });
    return email;
}


function checkValueAdmin(value) {
    if (value == 'CocoLAsticot0480') {
        return true;
    } else {
        return false;
    }
}

// POST Create User
exports.create = (req, res) => {   
    // Sauvegarde BDD MySQL
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: maskEmail(req.body.email),
                password: hash,
                accordTermsOfUse: req.body.accordTermsOfUse,
                isAdmin: checkValueAdmin(req.body.passwordAdmin),
                imageUrl: `${req.protocol}://${req.get('host')}/images/iconProfile.jpg`
            }).then(user => { res.send(user); });
        }).catch(error => res.status(500).json({ error }));
    
};

//POST Login
exports.login = (req, res, next) => {
    User.findOne({ where: { email: maskEmail(req.body.email) } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non existant. Inscrivez-vous.' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect.' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        //Nouveau jeton
                        token: jwt.sign(
                            //Payload
                            { userId: user._id },
                            'KEY_TOKEN_SECRET_GROUPOMANIA',
                            //Time jeton
                            { expiresIn: '24h' }
                        )
                    });
                }).catch(error => res.status(500).json({ error }));
        }).catch(error => res.status(500).json({ error }));
};

/*exports.findById = (req, res) => {
    User.findById(verifAvecToken).then(() => {
        User.findById(req.params.userId).then((user) => {
            res.send(user);
        });
    }).catch((error) => {
        res.status(401).send({ message: 'Veuillez vous identifier' }, error)
    });
};*/

exports.findById = (req, res) => {
    User.findOne({ where: { id: verifAvecToken }}).then(() => {
        User.findOne({ where: { id: req.params.id }})
            .then((user) => { res.status(200).send(user); })
            .catch((error) => { res.status(500).send(error)});
    }).catch((error) => {
        res.status(401).send({ message: 'Veuillez vous identifier' }, error)
    });
};

/*exports.findById = (req, res) => {
    User.findOne({ where: { id: verifAvecToken } }).then((user) => { res.status(200).send(user); })
            .catch((error) => { res.status(500).send(error) });
};*/


exports.findAll = (req, res) => {
    User.findAll().then(users => {
        res.send(users);
    });
};

exports.update = (req, res) => {
    const id = req.params.userId;
    User.update({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email },
        { where: { id: req.params.userId } }
    ).then(() => {
        res.status(200).send("Mise à jour User id = " + id);
    });
};

exports.delete = (req, res) => {
    const id = req.params.userId;
    User.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('Supprimer User id = ' + id);
    });
};