'use strict';

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accordTermsOfUse: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        descriptif: {
            type: Sequelize.STRING,
            allowNull: true
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true,
        }
    });
    return User;
}