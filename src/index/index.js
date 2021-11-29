const express= require('express')

const {Response}= require('../common/response');
const createError=require('http-errors');

module.exports.IndexApi= (app)=>{
    const router = express.Router();
    router.get('/',(req, res)=>{
        const menu={
            products:`https://${req.headers.host}/api/products`,//saca el host donde está nuestro proyecto
            users:`https://${req.headers.host}/api/users`
        }
        Response.success(res,200,"API Inventario",menu);
    });
    app.use('/',router);
}

module.exports.NotFoundApi= (app)=>{
    const router = express.Router();
    router.all('*',(req,res)=>{
        Response.error(res, new createError.NotFound());
    });//all recibe cualquier verbo en la url
    app.use('/',router);
}