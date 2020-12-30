"use strict";

const fs = require('fs');
const db = require("../config/config.js");
const Post = db.post;
const User = db.user;
const Comment = db.comment;
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
  //Si les trois éléments sont nuls alors Erreur 400
  if( !req.body.textPost && !req.body.gifPost && !req.file ){
    return res.status(400).json({ message: "Vous devez remplir un élément pour créer une publication." });
  }

  //Si le text existe création du contenu sinon = NULL
  if (postObj.textPost) {
    urlText = postObj.textPost;
  }
  //Si le gif existe création de l'adresse sinon = NULL
  if (postObj.gifPost) {
    urlGif = postObj.gifPost;
  }
  //Si le file existe création de l'adresse sinon = NULL
  if (req.file) {
    urlFile = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
  }

  //Création de l'objet publication
  const post = {
    idUserPost: UserID(req),
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

//PUT Modifier Publication
exports.modify = (req, res) => {  
  //Si les trois éléments sont nuls alors Erreur 400
  if( req.body.textPost == null && req.body.gifPost == null && req.file == null){
    return res.status(400).json({ message: "Vous devez remplir un élément pour modifier une publication." });
  } 

  const idPost = req.params.id;
  const user = UserID(req);
  const textPublication = req.body.textPost;
  const gifPublication = req.body.gifPost;
  
  Post.findOne({ where : { id : idPost }})
    .then((publication) => {
        if(publication.idUserPost != user) {
          return res.status(401).send("Vous devez vous identifier.");
        }

        //Supprimer l'image de ma publication si ce n'est pas null et mettre null gifPost
        if( req.file ){
          if ( publication.imagePost != null){
            //Récupère le nom du fichier
            const filename = publication.imagePost.split('/upload/')[1];
            //Supprimer le fichier
            fs.unlink(`./upload/${filename}`, (error) => {
              if(error){
                return console.log(error);
              }else{
                return console.log("Image supprimée");
              }        
            })
          }
          return publication.update({ imagePost : `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`,
        gifPost : '', textPost : textPublication }) 
        } else { 
          return publication.update({ imagePost: '', gifPost : gifPublication, textPost : textPublication }) 
        }
      
    })
  .then(() => {res.status(200).send("Mise à jour de la publication");})
  .catch( error => res.status(400).json({ message : "La modification de la publication n'a pas été prise en compte." }, error));
}

//Récupérer toutes les publications
exports.findAll = (req, res) => {
  //query => chercher dans la BDD
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  const createdAt = req.query.createdAt;
  const userId = UserID(req);

  Post.findAndCountAll({
    where: createdAt,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    include: [ {
      model : User,
      as : "UserPublications",
      attributes : [ "firstname","lastname","imageUrl"] }]
  })
    .then((posts) => {
      const tabPosts = posts.rows;
      for(let i = 0 ; i < tabPosts.length ; i++){
        if(userId === tabPosts[i].idUserPost){
            tabPosts[i].actualUserOK = 1;
          
        } else {
          tabPosts[i].actualUserOK = 0;
        }
      }

      const response = getPagingData(posts, page, limit);
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Erreur survenue" });
    });
};

//Récupérer toutes les publications
exports.findCurrent = (req, res) => {
  Post.findAll({
    where: { userId: UserID(req) },
    order: [["createdAt", "DESC"]],
    include: [ {
        model : Comment,
        as : "PublicationComments",
        attributes : ["autocollantComment", "textComment"],
        include: [ {
          model : User,
          as : "UserComments",
          attributes : [ "firstname","lastname","imageUrl"] 
        }]
      },
      {
        model : User,
        as : "UserPublications",
        attributes : [ "firstname","lastname","imageUrl"] 
      }
    ]
  })
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      res.status(404).send({ message: "Aucun post trouvé" }, error);
    });
};

//Récupérer les infos d'une publication
exports.findOnePost = (req, res) => {
  const id = req.params.id;

  Post.findOne({ where : { id : id }, attributes : ["imagePost","gifPost","textPost"]})
  .then((publication) => {
    res.send(publication);
  })
  .catch((error) => { res.status(404).send({ message: "Les informations ne sont pas retrouvées."}, error)});
}