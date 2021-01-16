'use strict';

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        //Champs d'exploitation si Current User
        actualUserOK: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        //Champs d'exploitation si ADMIN
        permission: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        idUserPost:{
            type : Sequelize.INTEGER
        },
        //Publication
        imagePost: {
            type: Sequelize.STRING
        },
        //GIF
        gifPost: {
            type: Sequelize.STRING
        },
        textPost: {
            type: Sequelize.TEXT
        },
        //_________________________Compteurs Emotions
        countLike: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        countClap: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        countSad: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        countSmile: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        countAngry: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        countHeart: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        countLOL: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        countWoah: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Post;
}
