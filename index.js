const express = require('express');
const debug = require('debug')('app:main');

const { config } = require('./src/config/index');
const {ProductsAPI} = require('./src/products/index')
const {UsersAPI} = require('./src/users/index')

const app = express();

app.use(express.json());//le damos la capacidad al servidor de recibir datos en el body request

//modulos
ProductsAPI(app);
UsersAPI(app);

app.listen(config.port, ()=>{
    debug(`servidor escuchando en el puerto ${config.port}`);
})