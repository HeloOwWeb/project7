"use strict";

const db = require('../config/config.js');
const User = db.user;
const Comment = db.comment;
const Emotions = db.emotions;
const Post = db.post;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserID = require('../middleware/getUserId.js');
const fs = require('fs');

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
                imageUrl: `${req.protocol}://${req.get('host')}/upload/images/iconProfile.png`
            }).then(user => { res.send(user); });
        }).catch(error => res.status(500).json({ error }));
    
};

//POST Login
exports.login = (req, res) => {
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
                        userId: user.id,
                        //Nouveau jeton
                        token: jwt.sign(
                            //Payload
                            { userId: user.id },
                            'KEY_TOKEN_SECRET_GROUPOMANIA',
                            //Time jeton
                            { expiresIn: '24h' }
                        )
                    });
                }).catch(error => res.status(500).json({ error }));
        }).catch(error => res.status(500).json({ error }));
};

//Modification du User
exports.update = (req, res) => {
    User.update({ 
        descriptif: req.body.description, 
        imageUrl: `${req.protocol}://${req.get('host')}/upload/profile/${req.file.filename}` },
        { where: { id: UserID(req) } }
    ).then(() => {
        res.status(200).send("Mise à jour de l'utilisateur");
    });
};

//DELETE : définitif
exports.delete = (req, res) => {
    const id = req.params.id;
    const user = UserID(req);
    let profilUser;
    let publications;

    User.findOne({ where : { id : id }})
    .then(profile => {
        if(profile.id != user) {
            return res.status(401).send({message: "Vous devez vous identifier."});
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
        res.status(200).send( { message : "Votre compte a été définitivement supprimé."});
    })
    .catch( error => {
        res.status(500).send(error);
    });
};

//GET user connecté
exports.findCurrentUser = (req, res) => {
    User.findOne({
        where: { id: UserID(req) },
        attributes: ["firstname", "lastname", "descriptif", "imageUrl"]
    })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((error) => {
            res.status(401).send({ message: 'Veuillez vous identifier !' }, error)
    });
};


//
exports.findAll = (req, res) => {
    User.findAll().then(users => {
        res.send(users);
    });
};
