"use strict";

const db = require('../config/config.js');
const Post = db.post;
const UserID = require('../middleware/getUserId.js');

//POST Create Publication
exports.create = (req, res) => {
    //extraction PostFormData
    const postObj = req.body;
    //Analyse de l'objet
    const post = {
        userId : UserID(req),
        textPost: postObj.textPost,
        gifPost: postObj.gifPost,
        imagePost: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
    };

    // Sauvegarde la publication dans la DB
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Il y a eu une erreur lors de la publication."
            });
        });
};

//Récupérer toutes les publications
exports.findAll = (req, res) => {
    Post.findAll().then(posts => {
        res.send(posts);
    });
};