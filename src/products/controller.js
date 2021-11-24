const createError = require('http-errors');
const debug = require('debug')('app:module-produts-controller');

const { ProductsService } = require('./services')
const { Response } = require('../common/response')

module.exports.ProductControllers = {
    getProducts: async (req, res) => {
        try {
            let productos = await ProductsService.getAll();
            Response.success(res, 200, "Lista de productos", productos);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductsService.getById(id);
            if (!product) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {//object.keys(body) nos devuelve todas las claves del objeto body en un array
                Response.error(res, new createError.BadRequest());
            } else {
                const inserted_Id = await ProductsService.create(body);
                Response.success(res, 201, "Producto agregado", inserted_Id);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {//object.keys(body) nos devuelve todas las claves del objeto body en un array
                Response.error(res, new createError.BadRequest());
            } else {
                const productUpdated = await ProductsService.update(id, body);
                Response.success(res, 200, "Producto actualizado",productUpdated);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { params: {id} } = req;
            let product = await ProductsService.getById(id);
            if (!product) {
                Response.error(res, new createError.NotFound());
            } else {
                const productDeleted = ProductsService.eliminar(id);
                Response.success(res, 200, `Producto ${id} eliminado`, productDeleted);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    generateReport: (req, res) => {
        try {
            ProductsService.generateReport('inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};