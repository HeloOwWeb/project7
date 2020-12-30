'use strict';

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        //User Active qui crée la publication 
        //--lien vers la table user
        // Récupére Firstname + Lastname et imageUrl
        actualUserOK: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        idUserPost:{
            type : Sequelize.INTEGER
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
        //_________________________Compteurs Emotions
        countLike: {
            type: Sequelize.INTEGER,
            defaultValue: 0
            //allowNull: true
        },
        countClap: {
            type: Sequelize.INTEGER,
            defaultValue: 0
            //allowNull: true
        },
        countSad: {
            type: Sequelize.INTEGER,
            defaultValue: 0
            //allowNull: true
        },
        countSmile: {
            type: Sequelize.INTEGER,
            defaultValue: 0
            //allowNull: true
        },
        countAngry: {
            type: Sequelize.INTEGER,
            defaultValue: 0
            //allowNull: true
        },
        countHeart: {
            type: Sequelize.INTEGER,
            defaultValue: 0
            //allowNull: true
        },
        countLOL: {
            type: Sequelize.INTEGER,
            defaultValue: 0
            //allowNull: true
        },
        countWoah: {
            type: Sequelize.INTEGER,
            defaultValue: 0
            //allowNull: true
        }
    });
    return Post;
}
