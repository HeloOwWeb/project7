'use strict';

module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define('group', {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        descriptif: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        },
        jsonUsers: {
            type: Sequelize.JSON,
        }
    });
    return Group;
}