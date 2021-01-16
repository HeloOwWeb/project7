"use strict";

//Utilisation de requête brute renvoie un tableau de datas et un objet metaD
const { QueryTypes } = require("sequelize");
//Liens de la config globale
const { sequelize } = require("../config/config.js");
//Liens avec les tables
const db = require("../config/config.js");
const Emotions = db.emotions;
const Post = db.post;
//Middleware : récupérer le userId
const UserID = require("../middleware/getUserId.js");

//Création et modification des émotions
exports.emotionsPost = (req, res) => {
  //Création des constantes  idPublication, userId, objet venant du Front
  const idPublication = req.params.id;
  const userId = UserID(req);
  const objetEmotions = req.body;

  function updateCountEmotion(){
    // Variables total d'Emotions
    let totalLikes;
    let totalSads;
    let totalClaps;
    let totalSmiles;
    let totalAngrys;
    let totalHearts;
    let totalLOLs;
    let totalWoahs;
    //___________________________
    //retourne l'intégration de la requête dans la config
    return sequelize.query(
        //Sélectionne la totalité des lignes de la colonne isLike
        //As : nom de l'alias où le résultat sera stocké
        //From : de la table
        //Where : où l'id de la publication est égale à 
          "SELECT SUM(isLike) AS countLikes FROM emotions where idPublication = ?",
          { replacements: [idPublication], type: QueryTypes.SELECT },
          { model: Emotions }
        )
      .then((resultCountLike) => {
        //Stock le resultat pour Like
        totalLikes = resultCountLike;
        //Demande pour Clap
        return sequelize.query(
          "SELECT SUM(isClap) AS countClaps FROM emotions where idPublication = ?",
          { replacements: [idPublication], type: QueryTypes.SELECT },
          { model: Emotions}
        );
      })
      .then((resultCountClap) => {
        //Stock le resultat pour Clap
        totalClaps = resultCountClap;
        //Demande pour Sad
        return sequelize.query(
          "SELECT SUM(isSad) AS countSads FROM emotions where idPublication = ?",
          { replacements: [idPublication], type: QueryTypes.SELECT },
          { model: Emotions }
        );
      })
      .then((resultCountSad) => {
        //Stock le resultat pour Sad
        totalSads = resultCountSad;
        //Demande pour Smile
        return sequelize.query(
          "SELECT SUM(isSmile) AS countSmiles FROM emotions where idPublication = ?",
          { replacements: [idPublication], type: QueryTypes.SELECT },
          { model: Emotions }
        );
      })
      .then((resultCountSmile) => {
        //Stock le resultat pour Smile
        totalSmiles = resultCountSmile;
        //Demande Angry
        return sequelize.query(
          "SELECT SUM(isAngry) AS countAngrys FROM emotions where idPublication = ?",
          { replacements: [idPublication], type: QueryTypes.SELECT },
          { model: Emotions }
        );
      })
      .then((resultCountAngry) => {
        //Stock le resultat pour Angry
        totalAngrys = resultCountAngry;
        //Demande Love
        return sequelize.query(
          "SELECT SUM(isHeart) AS countHearts FROM emotions where idPublication = ?",
          { replacements: [idPublication], type: QueryTypes.SELECT },
          { model: Emotions }
        );
      })
      .then((resultCountHeart) => {
        //Stock le resultat pour Love
        totalHearts = resultCountHeart;
        //Demande Lol
        return sequelize.query(
          "SELECT SUM(isLOL) AS countLOLs FROM emotions where idPublication = ?",
          { replacements: [idPublication], type: QueryTypes.SELECT },
          { model: Emotions }
        );
      })
      .then((resultCountLOL) => {
        //Stock le resultat pour Lol
        totalLOLs = resultCountLOL;
        //Demande Woah
        return sequelize.query(
          "SELECT SUM(isWoah) AS countWoahs FROM emotions where idPublication = ?",
          { replacements: [idPublication], type: QueryTypes.SELECT },
          { model: Emotions }
        );
      })
      .then((resultCountWoah) => {
        //Stock le resultat pour Woah
        totalWoahs = resultCountWoah;
        //Récupère la ligne de publication concerné
        return db.post.findOne({ where: { id: idPublication } });
      })
      .then((publicationFind) => {
        //Mise à jour des valeurs des compteurs Emotions 
        return publicationFind.update({
          countLike: Number(totalLikes[0].countLikes),
          countClap: Number(totalClaps[0].countClaps),
          countSad: Number(totalSads[0].countSads),
          countSmile: Number(totalSmiles[0].countSmiles),
          countAngry: Number(totalAngrys[0].countAngrys),
          countHeart: Number(totalHearts[0].countHearts),
          countLOL: Number(totalLOLs[0].countLOLs),
          countWoah: Number(totalWoahs[0].countWoahs),
        });
      });
  }

  // Fonction qui va créer les infos Emotions dans les différentes tables
  function creationLigneEmotion(idPublication, userId, objetEmotions) {
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
    if (objetEmotions.isLike) {
      isLike = objetEmotions.isLike;
    }
    if (objetEmotions.isClap) {
      isClap = objetEmotions.isClap;
    }
    if (objetEmotions.isSad) {
      isSad = objetEmotions.isSad;
    }
    if (objetEmotions.isSmile) {
      isSmile = objetEmotions.isSmile;
    }
    if (objetEmotions.isAngry) {
      isAngry = objetEmotions.isAngry;
    }
    if (objetEmotions.isHeart) {
      isHeart = objetEmotions.isHeart;
    }
    if (objetEmotions.isLOL) {
      isLOL = objetEmotions.isLOL;
    }
    if (objetEmotions.isWoah) {
      isWoah = objetEmotions.isWoah;
    }

    //Création de l'objet émotions
    const emotions = {
      idUser: userId,
      idPublication: idPublication,
      postId: idPublication,
      isLike: isLike,
      isClap: isClap,
      isSad: isSad,
      isSmile: isSmile,
      isAngry: isAngry,
      isHeart: isHeart,
      isLOL: isLOL,
      isWoah: isWoah,
    };

    // Sauvegarde de l'objet Emotions dans la DB
    Emotions.create(emotions)
      .then(() => {
        return updateCountEmotion()
      })
      .then(() => {
        res
          .status(201)
          .json({ message: "Tu as partagé ton émotion. " });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Il y a eu une erreur lors du partage de l'émotion.",
        });
      });
  }

  //Vérification si le user à voter sur la publication
  Emotions.findOne({where : { idPublication : idPublication, idUser : userId }})
  .then((ligneEmotion) => {
      //SI OUI
    if(ligneEmotion){
      //Si les valeurs sont identiques
      if( objetEmotions.isLike === ligneEmotion.isLike || objetEmotions.isClap === ligneEmotion.isClap || objetEmotions.isSad === ligneEmotion.isSad || objetEmotions.isSmile === ligneEmotion.isSmile || objetEmotions.isAngry === ligneEmotion.isAngry || objetEmotions.isHeart === ligneEmotion.isHeart || objetEmotions.isLOL === ligneEmotion.isLOL || objetEmotions.isWoah === ligneEmotion.isWoah ){
        //suppression de la ligne simplement
        ligneEmotion.destroy().then(() => { 
          updateCountEmotion()
          .then(() => {
            res.status(201).json({ message: "Emotion supprimé pour remplacement" });
          })
          .catch((err) => {
            res.status(500).send({message: err.message || "Il y a eu une erreur lors du partage de l'émotion."
            });
          });
        })
      //Sinon 
      }else{
        //delete de la ligne de l'ancien vote 
        ligneEmotion.destroy().then(() => { 
          //Puis création de la nouvelle
          creationLigneEmotion(idPublication, userId, objetEmotions);
        });
      }
    //SINON
    }else {
      // Création de la ligne
      creationLigneEmotion(idPublication, userId, objetEmotions);
    }
  })
};

//Affichage des émotions de la publication ciblée
exports.emotionsCountPost = (req, res) => {
  const idPublication = req.params.id;
  Post.findOne({
    where: { id: idPublication },
    attributes: [
      "countLike",
      "countClap",
      "countSad",
      "countSmile",
      "countAngry",
      "countHeart",
      "countLOL",
      "countWoah",
    ],
  })
    .then((publication) => {
      res.status(200).send(publication);
    })
    .catch(() => {
      res.status(404).json({ message: "La publication n'existe plus." });
    });
};