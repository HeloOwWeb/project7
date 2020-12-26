"use strict";

module.exports = function (app) {

    const posts = require('../controller/post.js');
    const auth = require('../middleware/auth.js');
    const multer = require('../middleware/multer-config.js');

    app.post('/api/posts/', auth, multer, posts.create);
    app.get('/api/posts/', auth, posts.findAll);
    app.get('/api/posts/current', auth, posts.findCurrent);   
}