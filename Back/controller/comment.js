"use strict";

const db = require("../config/config.js");
const Comment = db.comment;
const User = db.user;
const Post = db.post;
const UserID = require("../middleware/getUserId.js");

//__________________PAGINATION________________________________
//Variable qui définit le
//nombre de comments / page et le nombre de page
const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
  //Variable datas Pagination
  //data = result search in DB
  // page = offset
    const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: comments } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    // retourne le total Posts, objet contenant la limit posts,
    // nombre de pages créées, page actuelle
    return { totalItems, comments, totalPages, currentPage };
};
  //____________________________________________________________

exports.createComment = (req, res) =>{
    //Si les deux éléments sont nuls alors Erreur 400
    if( !req.body.autocollantComment && !req.body.textComment){
        return res.status(400).json({ message: "Vous devez remplir un élément pour créer un commentaire." });
    }

    const commentObj = req.body;
    const idPost = req.params.id; //idPost column
    const idUser = UserID(req); //idUser column
    let urlAutocollant;
    let texte;

    //Si le autocollant existe création de l'adresse sinon = NULL
    if(commentObj.autocollantComment){
        urlAutocollant = commentObj.autocollantComment;
    } 
    //Si le text existe création du contenu sinon = NULL
    if(commentObj.textComment){
        texte = commentObj.textComment;
    }

    //Création de l'obj Commentaire
    const comment = {
        postId : idPost,
        userId : idUser,
        autocollantComment : urlAutocollant,
        textComment : texte
    }

    //Création du commentaire
    Comment.create(comment)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
        message: err.message
        });
    });
};

//PUT Modifier Commentaire
exports.modify = (req, res) => {  
    //Si les deux éléments sont nuls alors Erreur 400
    if( req.body.autocollantComment == null && req.body.textComment == null ){
        return res.status(400).json({ message: "Vous devez remplir un élément pour modifier un commentaire." });
    } 

    const idComment = req.params.id; 
    const user = UserID(req);
    let autocollantComment;
    let textComment;
    
    Comment.findOne({ where : { id : idComment }})
        .then((commentaire) => {
            if(commentaire.id != user) {
                return res.status(401).send("Vous devez vous identifier.");
            }

            //Présence ou non d'une valeur
            if( !req.body.autocollantComment ){
                autocollantComment = '';
            } else {
                autocollantComment = req.body.autocollantComment;
            }

            if( !req.body.textComment ){
                textComment = '';
            } else {
                textComment = req.body.textComment;
            }

            return commentaire.update({ autocollantComment : autocollantComment, textComment : textComment }) 
        })
    .then(() => {res.status(200).send("Mise à jour du commentaire");})
    .catch( error => res.status(400).json({ message : "La modification du commentaire n'a pas été prise en compte." }, error));
}

exports.getComment = (req, res) => {
    const idPost = req.params.id;
    const user = UserID(req);

    //query => chercher dans la BDD
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const createdAt = req.query.createdAt;

    Comment.findAndCountAll({
        where: { postId : idPost }, createdAt,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        include: [
            {
                model : User,
                as : "UserComments",
                attributes : [ "firstname","lastname","imageUrl"] 
            }
        ]
    })
    .then((comments) => {
        const tabComments = comments.rows;
        for(let i = 0 ; i < tabComments.length ; i++){
            if(user === tabComments[i].userId){
                tabComments[i].actualUserOK = 1; 
            } else {
                tabComments[i].actualUserOK = 0;
            }
        }

        const response = getPagingData(comments, page, limit);
        res.status(200).send(response);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "Erreur survenue" });
        });
};

exports.getOneComment = (req, res) => {
    const id= req.params.id;

    Comment.findOne({ where : { id : id}})
    .then((comment) => {
        res.send(comment);
    })
    .catch((error) => {
        res.status(500).send({ message : error.message || "Erreur survenue "});
    })
};