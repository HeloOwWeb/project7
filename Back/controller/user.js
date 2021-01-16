"use strict";

//Liens avec les tables
const db = require('../config/config.js');
const User = db.user;
const Comment = db.comment;
const Emotions = db.emotions;
const Post = db.post;
//Cryptage et token
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Middleware : récupérer le userId
const UserID = require('../middleware/getUserId.js');
//FileSystem gestion
const fs = require('fs');
//Validation des données reçues
const { body, validationResult } = require('express-validator');

function maskEmail(email) {
    // Fonction pour remplacer l'email avec '*' -> RGDP
    function mask(string) {
        //Si l'email est plus long que 4 caractères, remplacer le tout sauf la premi�re lette
        if (string.length > 4) {
            return (
                string.substr(0, 1) +
                string.substr(1, string.length - 1).replace(/\w/g, "*") +
                string.substr(-1, 1)
            );
        }
        // sinon remplace le tout par des étoiles
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
    // Recherche les erreurs de validation dans cette requête
    // et les encapsule dans un objet avec des fonctions pratiques
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
                imageUrl: `${req.protocol}://${req.get('host')}/upload/images/iconProfile.png`
            }).then(() => { res.status(201).json('Afin de valider votre compte, rendez-vous dans vos mails.'); });
        }).catch(error => res.status(500).json({ error }));
    
};

//POST Login
exports.login = (req, res) => {
    // Recherche les erreurs de validation dans cette requête
    // et les encapsule dans un objet avec des fonctions pratiques
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({ where: { email: maskEmail(req.body.email) } })
        .then(user => {
            if (!user) {
                return res.status(401).json('Utilisateur non existant. Inscrivez-vous.');
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json('Mot de passe incorrect.');
                    }
                    res.status(200).json({
                        //Nouveau jeton
                        token: jwt.sign(
                            //Payload
                            { userId: user.id },
                            'KEY_TOKEN_SECRET_GROUPOMANIA',
                            //Time jeton
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Modification du User
exports.update = (req, res) => {
    User.update({ 
        descriptif: req.body.description, 
        imageUrl: `${req.protocol}://${req.get('host')}/upload/profile/${req.file.filename}` },
        { where: { id: UserID(req) } }
    ).then(() => {
        res.status(200).json("Mise à jour de l'utilisateur");
    });
};

//DELETE : définitif
exports.delete = (req, res) => {
    const user = UserID(req);
    let profilUser;
    let publications;

    User.findOne({ where : { id : user }})
    .then(profile => {
        if(profile.id != user) {
            return res.status(401).json("Vous devez vous identifier.");
        }
        
        profilUser = profile;
        return Comment.destroy({ where : { userId : profilUser.id }})
    })
    .then(() => {
        return Emotions.destroy({ where : { idUser : profilUser.id }});
    })
    .then(() => {
        return Post.findAll({ where: { idUserPost : profilUser.id }});        
    })
    .then((post) => { 
        publications = post;
        for(let i=0; i < publications.length; i++){
            if(publications[i].imagePost){
                const filename = publications[i].imagePost.split('/upload/')[1];
                fs.unlink(`./upload/${filename}`, (error) => {
                    if(error){
                        return console.log(error);
                    }else {
                        return console.log({ message : "Image supprimée"});
                    }
                })
            }
            //Supprime également tous les commentaires liés à la publication
            Comment.destroy({ where : { postId : publications[i].id }});
            //Supprime également tous les commentaires liés à la publication
            Emotions.destroy({ where : { idPublication : publications[i].id }});
        }   
        return Post.destroy({ where: { idUserPost : profilUser.id }}); 
    })
    .then(() => {
        return User.destroy({ where : { id : profilUser.id }})
    })
    .then(() => {
        res.status(200).json("Votre compte a été définitivement supprimé.");
    })
    .catch( error => {
        res.status(500).send(error);
    });
};

//DELETE | ADMIN : différente pour une future archive ou parmétrage autre
//Paramètre d'url 
exports.adminDelete = (req, res) => {
    const userAdmin = UserID(req);
    const idUser = req.params.id;
    let profilUser;
    let publications;

    User.findOne({ where : { id : userAdmin }})
    .then(admin => {
        if(!admin.isAdmin) {
            return res.status(403).json("Vous n'êtes pas autorisé.");
        }
    })
    .then(() => {
        return User.findOne({ where : { id : idUser }});
    })
    .then((profile) => {
        profilUser = profile;
        return Comment.destroy({ where : { userId : profilUser.id }})
    })
    .then(() => {
        return Emotions.destroy({ where : { idUser : profilUser.id }});
    })
    .then(() => {
        return Post.findAll({ where: { idUserPost : profilUser.id }});        
    })
    .then((post) => { 
        publications = post;
        for(let i=0; i < publications.length; i++){
            if(publications[i].imagePost){
                const filename = publications[i].imagePost.split('/upload/')[1];
                fs.unlink(`./upload/${filename}`, (error) => {
                    if(error){
                        return console.log(error);
                    }else {
                        return console.log({ message : "Image supprimée"});
                    }
                })
            }
            //Supprime également tous les commentaires liés à la publication
            Comment.destroy({ where : { postId : publications[i].id }});
            //Supprime également tous les commentaires liés à la publication
            Emotions.destroy({ where : { idPublication : publications[i].id }});
        }   
        return Post.destroy({ where: { idUserPost : profilUser.id }}); 
    })
    .then(() => {
        return User.destroy({ where : { id : profilUser.id }})
    })
    .then(() => {
        res.status(200).json("Le compte de l'utilisateur a bien été supprimé.");
    })
    .catch( error => {
        res.status(500).send(error);
    });
};

//GET user connecté
exports.findCurrentUser = (req, res) => {
    User.findOne({
        where: { id: UserID(req) },
        attributes: ["firstname", "lastname", "descriptif", "imageUrl", "isAdmin"]
    })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch(() => {
            res.status(401).json('Veuillez vous identifier !')
    });
};


//All users uniquement par ADMIN
exports.findAll = (req, res) => {
    const user = UserID(req);

    User.findOne({ where : { id: user }})
    .then((data) => {
        if( !data.isAdmin ){
            return res.status(403).json("Vous n'êtes pas autorisé à accéder à cet espace.");
        }
    })
    .then(() => {
        return User.findAll();
    })
    .then((usersList) => {
        res.send(usersList);
    })
    .catch (() => {
        res.status(401).json('Veuillez vous identifier !')
    });
};
