"use strict";

module.exports = function (app) {
    const comment = require('../controller/comment.js');
    const auth = require('../middleware/auth.js');

    app.post('/api/posts/comment/:id', auth, comment.createComment); //id post
    app.put('/api/posts/comment/:id', auth, comment.modify); //id comment
    app.delete("/api/posts/comment/:id", auth, comment.delete); // id comment
    app.get('/api/posts/comment/:id', auth, comment.getComment); //id post
    app.get('/api/posts/commentOne/:id', auth, comment.getOneComment); //id comment
}