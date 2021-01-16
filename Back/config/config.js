"use strict";

const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../model/users.js')(sequelize, Sequelize);
db.post = require('../model/posts.js')(sequelize, Sequelize);
db.emotions = require('../model/emotions.js')(sequelize, Sequelize);
db.comment = require('../model/comments.js')(sequelize, Sequelize);

//Paramétrage des jointures_________________________________________________
//Liaison Publications / Emotions
db.post.hasMany(db.emotions, { as: "EmotionsPublication"});
db.emotions.belongsTo(db.post, {
  foreignKey: "postId",
  as: "EmotionsPublication"
});
//Liaison Publications / Users (1 utilisateur à plusieurs publications / 1 post à 1 utilisateur)
db.user.hasMany(db.post, { as: "UserPublications"});
db.post.belongsTo(db.user, {
  foreignKey: "userId",
  as: "UserPublications"
});
//Liaison Comments/ Posts (1 publication à plusieurs commentaires / 1 commentaire à 1 publication)
db.post.hasMany(db.comment, { as: "PublicationComments"});
db.comment.belongsTo(db.post, {
  foreignKey: "postId",
  as: "PublicationComments" 
});
//Liaison Comments/ User (1 user à plusieurs commentaires / 1 commentaire à 1 user)
db.user.hasMany(db.comment, { as: "UserComments"});
db.comment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "UserComments"
});

module.exports = db;