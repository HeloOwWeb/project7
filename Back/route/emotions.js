"use strict";

module.exports = function (app) {

    const emotions = require('../controller/emotions.js');
    const auth = require('../middleware/auth.js');

    app.post('/api/posts/like/:id', auth, emotions.emotionsPost);
    app.get('/api/posts/like/:id', auth, emotions.emotionsCountPost);
}