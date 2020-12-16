"use strict";

module.exports = function (app) {

    const users = require('../controller/user.js');
    const auth = require('../middleware/auth');

    app.post('/api/auth/signup', users.create);
    app.post('/api/auth/login', users.login);

    app.get('/api/users/current', auth, users.findCurrentUser);


    app.get('/api/users', auth, users.findAll);
    app.put('/api/users/:userId', users.update);
    app.delete('/api/users/:userId', users.delete);
}