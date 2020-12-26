"use strict";

const { sequelize } = require("../config/config.js");
const db = require("../config/config.js");
const Emotions = db.emotions;
const Posts = db.posts;
const UserID = require("../middleware/getUserId.js");

exports.emotionsPost = (req, res) => {
    //Création des constantes  idPublication, userId, objet venant du Front
    const idPublication = req.params.id;
    const userId = UserID(req);
    const objetEmotions = req.body;

    //Création des variables de stockage des réponses
    let isLike;
    let isClap;
    let isSad;
    let isSmile;
    let isAngry;
    let isHeart;
    let isLOL;
    let isWoah;
    //Condition de présence -> Intégration de la valeur
    if(objetEmotions.isLike){
      isLike = objetEmotions.isLike;
    }
    if(objetEmotions.isClap){
      isClap = objetEmotions.isClap;
    }
    if(objetEmotions.isSad){
      isSad = objetEmotions.isSad;
    }
    if(objetEmotions.isSmile){
      isSmile = objetEmotions.isSmile;
    }
    if(objetEmotions.isAngry){
      isAngry = objetEmotions.isAngry;
    }
    if(objetEmotions.isHeart){
      isHeart = objetEmotions.isHeart;
    }
    if(objetEmotions.isLOL){
      isLOL = objetEmotions.isLOL;
    }
    if(objetEmotions.isWoah){
      isWoah = objetEmotions.isWoah;
    } 

      //Création de l'objet émotions
    const emotions = {
      idUser: userId,
      postId: idPublication,
      isLike: isLike,
      isClap: isClap,
      isSad: isSad,
      isSmile: isSmile,
      isAngry: isAngry,
      isHeart: isHeart,
      isLOL: isLOL,
      isWoah: isWoah 
    };

    // Sauvegarde de l'objet Emotions dans la DB
    Emotions.create(emotions)
    .then(()=> {
      res.status(201).json( { message : "Wouah ! Tu as partagé ton émotion ! "} );
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Il y a eu une erreur lors de la publication.",
      });
    });


};

exports.countEmotions = (req, res) => {
  const id = req.params.id;
  //const countLike = await Emotions.sum('isLike');
  Emotions.findAll({ where : { idPublication : id }})
  .then((emotionsPublicationCurrent) => {
    emotionsPublicationCurrent.findAll({
      attributes: [
        'id',
        [ sequelize.fn("sum", sequelize.col("isLike")), "totalLike"],
        [ sequelize.fn("sum", sequelize.col("isClap")), "totalClap"],
        [ sequelize.fn("sum", sequelize.col("isSad")), "totalSad"],
        [ sequelize.fn("sum", sequelize.col("isSmile")), "totalSmile"],
        [ sequelize.fn("sum", sequelize.col("isAngry")), "totalAngry"],
        [ sequelize.fn("sum", sequelize.col("isHeart")), "totalHeart"],
        [ sequelize.fn("sum", sequelize.col("isLOL")), "totalLOL"],
        [ sequelize.fn("sum", sequelize.col("isWoah")), "totalWoah"]
      ]
    })
  })

/* 
  Emotions.findAll({
    attributes: [
      'idPublication',
      [ sequelize.fn("sum", sequelize.col("isLike")), "totalLike"],
      [ sequelize.fn("sum", sequelize.col("isClap")), "totalClap"],
      [ sequelize.fn("sum", sequelize.col("isSad")), "totalSad"],
      [ sequelize.fn("sum", sequelize.col("isSmile")), "totalSmile"],
      [ sequelize.fn("sum", sequelize.col("isAngry")), "totalAngry"],
      [ sequelize.fn("sum", sequelize.col("isHeart")), "totalHeart"],
      [ sequelize.fn("sum", sequelize.col("isLOL")), "totalLOL"],
      [ sequelize.fn("sum", sequelize.col("isWoah")), "totalWoah"]
    ],
    group: ['idPublication']
  }) */
  .then((result) => {
    res.send(result);
  })
  .catch(error => {
    res.send(error);
  })
};