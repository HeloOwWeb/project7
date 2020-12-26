'use strict';

module.exports = (sequelize, Sequelize) => {
    const Emotions = sequelize.define('emotions', {
        idUser: {
            type: Sequelize.INTEGER,
            AllowNull: false
        },
        /* idPublication: {
            type: Sequelize.INTEGER,
            AllowNull: false
        }, */
    //________________________________________________    
        isLike: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isClap: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isSad: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isSmile: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isAngry: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isHeart: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isLOL: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isWoah: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    },
    //__________________________________________________________
    //
    //Configuration la PrimaryKey Unique 
     /* {
        sequelize,
        tableName: "emotions",
        timestamps: false,
        indexes: [{
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{
                name: "idUser"
            },{
                name: "idPublication"
            }]
        },
        {
            name: "fk_emotions_publications_idx",
            using: "BTREE",
            fields: [{name: "id"}]
        }
        ]
    } */);
    return Emotions;
}