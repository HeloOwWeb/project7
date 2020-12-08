"use strict";

module.exports = function (app) {

    const users = require('../controller/user.js');
    const auth = require('../middleware/auth');

    app.post('/api/auth/signup', users.create);
    //app.post('/api/auth/forget-password', users.create);
    app.post('/api/auth/login', users.login);
    app.get('/api/users/:id', auth, users.findById);


    app.get('/api/users', users.findAll);
    app.put('/api/users/:userId', users.update);
    app.delete('/api/users/:userId', users.delete);
}