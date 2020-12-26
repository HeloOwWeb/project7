"use strict";

const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  //operatorsAliases: false,

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

//Paramétrage des jointures_________________________________________________
//Liaison Publications / Emotions
db.post.hasMany(db.emotions, { as: "EmotionsPublication"});
db.emotions.belongsTo(db.post, {
  foreignKey: "postId",
  as: "EmotionsPublication"
});

module.exports = db;