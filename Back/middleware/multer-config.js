"use strict";

//gestion des fichiers avec des requetes HTTP envoye vers notre API
const multer = require('multer');
//3 mimes types possibles du front
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

// config de lespace storage
//need destination et filename explique quel nom de fichier use
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // pas eu d'erreur -> dossier
        callback(null, 'upload')
    },
    filename: (req, file, callback) => {
        //creation du nom avec le nom d origine
        //on transforme les espaces par undercore
        const name = file.originalname.split(' ').join('_');
        //on crée l'extension via le mime types 
        const extension = MIME_TYPES[file.mimetype];
        //pas d'erreur -> crea du filename avec la crea d'un time � la milliseconde pour le rendre le + unique
        callback(null, name + Date.now() + '.' + extension);
    }

});

//appeler la methode multer avec notre objet storage
//on précise que c'est un fichier unique et non un groupe
//et on précise que ce n'est que des images uniquemt
module.exports = multer({ storage: storage }).single('image');