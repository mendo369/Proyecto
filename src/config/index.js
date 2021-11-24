require('dotenv').config();//dotenv nos ayuda a traer todas las variables del .env

module.exports.config={
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbName: process.env.MONGO_DBNAME,
}