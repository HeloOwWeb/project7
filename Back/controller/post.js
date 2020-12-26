"use strict";

const db = require("../config/config.js");
const Post = db.post;
const Emotions = db.emotions;
const UserID = require("../middleware/getUserId.js");

//__________________PAGINATION________________________________
//Variable qui définit le
//nombre de publication / page et le nombre de page
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
//Variable datas Pagination
//data = result search in DB
// page = offset
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: publications } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  // retourne le total Posts, objet contenant la limit posts,
  // nombre de pages créées, page actuelle
  return { totalItems, publications, totalPages, currentPage };
};
//____________________________________________________________

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
    urlFile = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
  }

  //Création de l'objet publication
  const post = {
    userId: UserID(req),
    textPost: urlText,
    gifPost: urlGif,
    imagePost: urlFile
  };

  // Sauvegarde la publication dans la DB
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Il y a eu une erreur lors de la publication.",
      });
    });
};

//Récupérer toutes les publications
exports.findAll = (req, res) => {
  //query => chercher dans la BDD
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const createdAt = req.query.createdAt;

  Post.findAndCountAll({
    where: createdAt,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    /* include: [
      {
        model: Emotions,
        as: "publicationEmotions",
        attributes : []
      }
    ] */
    include: [ "EmotionsPublication" ]
  })
    .then((posts) => {
      const response = getPagingData(posts, page, limit);
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erreur survenue" });
    });
};

//R�cup�rer toutes les publications
exports.findCurrent = (req, res) => {
  Post.findAll({
    where: { userId: UserID(req) },
    order: [["createdAt", "DESC"]],
    include: [ "EmotionsPublication" ]
  })
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      res.status(404).send({ message: "Aucun post trouvé" }, error);
    });
};