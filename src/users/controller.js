const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const { UsersService } = require('./services')
const { Response } = require('../common/response')

module.exports.UsersControllers = {
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, "Lista de usuarios", users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UsersService.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `User ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {//object.keys(body) nos devuelve todas las claves del objeto body en un array
                Response.error(res, new createError.BadRequest());
            } else {
                const inserted_Id = await UsersService.create(body);
                Response.success(res, 201, "Usuario agregado", inserted_Id);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {//object.keys(body) nos devuelve todas las claves del objeto body en un array
                Response.error(res, new createError.BadRequest());
            } else {
                const userUpdated = await UsersService.update(id, body);
                Response.success(res, 200, "Usuario actualizado",userUpdated);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { params: {id} } = req;
            let user = await UsersService.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound());
            } else {
                const userDeleted = UsersService.eliminar(id);
                Response.success(res, 200, `Usuario ${id} eliminado`, userDeleted);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};