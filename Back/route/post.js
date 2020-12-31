"use strict";

module.exports = function (app) {

    const posts = require('../controller/post.js');
    const auth = require('../middleware/auth.js');
    const multer = require('../middleware/multer-config.js');

    app.post('/api/posts/', auth, multer, posts.create);
    app.put('/api/posts/:id', auth, multer, posts.modify);
    app.delete('/api/posts/:id', auth, multer, posts.delete);
    app.get('/api/posts/', auth, posts.findAll);
    app.get('/api/posts/current', auth, posts.findCurrent);   
    app.get('/api/posts/:id', auth, posts.findOnePost);
}