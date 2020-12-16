"use strict";

const db = require('../config/config.js');
const Post = db.post;
const UserID = require('../middleware/getUserId.js');

//POST Create Publication
exports.create = (req, res) => {
    //extraction PostFormData
    const postObj = req.body;
    let urlText;
    let urlGif;
    let urlFile;
    //Si le text existe cr�ation de l'adresse sinon = NULL
    if (postObj.textPost) {
        urlText = postObj.textPost;
    }
    //Si le gif existe cr�ation de l'adresse sinon = NULL
    if (postObj.gifPost) {
        urlGif = postObj.gifPost;
    }
    //Si le file existe cr�ation de l'adresse sinon = NULL
    if (req.file) {
        urlFile = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
    }

    //Cr�ation de l'objet publication
    const post = {
        userId : UserID(req),
        textPost: urlText,
        gifPost: urlGif,
        imagePost: urlFile
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

//R�cup�rer toutes les publications
exports.findAll = (req, res) => {
    Post.findAll().then(posts => {
        res.send(posts);
    }); 
};

//R�cup�rer toutes les publications
exports.findCurrent = (req, res) => {
    Post.findAll({ where: { userId: UserID(req) } })
        .then(posts => {
            res.send(posts);
        }).catch((error) => {
            res.status(404).send({ message: 'Aucun post trouv�' }, error)
        }); 

};