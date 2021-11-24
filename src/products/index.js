const express = require('express');

const {ProductControllers} = require('./controller')

const router = express.Router();

module.exports.ProductsAPI = (app)=>{
    router
        .get('/', ProductControllers.getProducts)
        .get('/report', ProductControllers.generateReport)
        .get('/:id', ProductControllers.getProduct)
        .post('/', ProductControllers.createProduct)
        .put('/:id', ProductControllers.updateProduct)
        .delete('/:id', ProductControllers.deleteProduct);

    app.use('/api/products', router);//concatena las rutas
};