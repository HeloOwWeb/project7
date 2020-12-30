"use strict";

module.exports = function (app) {

    const users = require('../controller/user.js');
    const auth = require('../middleware/auth');
    const multerProfile = require('../middleware/multer-config-profile');

    app.post('/api/auth/signup', users.create);
    app.post('/api/auth/login', users.login);
    //Current User
    app.put('/api/users/modify', auth, multerProfile, users.update);
    app.get('/api/users/current', auth, users.findCurrentUser);


    app.get('/api/users', auth, users.findAll);
    app.delete('/api/users/:userId', users.delete);
}