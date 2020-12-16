'use strict';

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        //User Active qui crée la publication 
        //--lien vers la table user
        // Récupère Firstname + Lastname et imageUrl
        userId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        //Publication
        imagePost: {
            type: Sequelize.STRING, 
            //allowNull: true
        },
        //GIF
        gifPost: {
            type: Sequelize.STRING
            //allowNull: true
        },
        textPost: {
            type: Sequelize.TEXT,
            //allowNull: true
        },
        //Systeme de like/dislike de la publication
        tabDislikes: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        tabLikes: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        dislikes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Post;
}
