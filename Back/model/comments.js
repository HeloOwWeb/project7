'use strict';

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        //__________________Contenu du comment
        userId: {
            type: Sequelize.INTEGER
        },
        postId: {
            type: Sequelize.INTEGER
        },
        //Champs d'exploitation si Current User
        actualUserOK: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        //Champs d'exploitation si ADLIN
        permission: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        //Autocollant
        autocollantComment: {
            type: Sequelize.STRING
        },
        //Commentaire
        textComment: {
            type: Sequelize.TEXT
        }
    });
    return Comment;
}