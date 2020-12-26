'use strict';

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        //User Active qui crée la publication 
        //--lien vers la table user
        // Récupére Firstname + Lastname et imageUrl
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
        }
    });
    return Post;
}
