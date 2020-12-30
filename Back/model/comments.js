'use strict';

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        //Jointures : idUser (firstname/lastname/icon) / idPost
        //__________________Contenu du comment
        userId: {
            type: Sequelize.INTEGER
        },
        postId: {
            type: Sequelize.INTEGER
        },
        actualUserOK: {
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