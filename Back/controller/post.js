"use strict";

const db = require('../config/config.js');
const Post = db.post;

//POST Create Publication
exports.create = (req, res) => {
    const post = {
        gifPost: req.body.gifPost,
        textPost: req.body.textPost
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