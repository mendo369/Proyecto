const express = require('express');

const {UsersControllers} = require('./controller')

const router = express.Router();

module.exports.UsersAPI = (app)=>{
    router
        .get('/', UsersControllers.getUsers)
        .get('/:id', UsersControllers.getUser)
        .post('/', UsersControllers.createUser)
        .put('/:id', UsersControllers.updateUser)
        .delete('/:id', UsersControllers.deleteUser);

    app.use('/api/users', router);//concatena las rutas
};