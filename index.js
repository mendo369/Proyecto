const express = require('express');
const debug = require('debug')('app:main');

const { config } = require('./src/config/index');
const {ProductsAPI} = require('./src/products/index')
const {UsersAPI} = require('./src/users/index')
const { IndexApi,NotFoundApi } = require('./src/index/index')

const app = express();

app.use(express.json());//le damos la capacidad al servidor de recibir datos en el body request

//modulos
IndexApi(app);//debe ir de primera para que haga match ante cualquier ruta
ProductsAPI(app);
UsersAPI(app);
NotFoundApi(app);

app.listen(config.port, ()=>{
    debug(`servidor escuchando en el puerto ${config.port}`);
})