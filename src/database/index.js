const {MongoClient} = require('mongodb');
const debug = require('debug')('app:Module_Database');

const {config} = require('../config/index')

var connection=null;
module.exports.database = (collection)=> new Promise(async (resolve, reject)=>{
    try {
        if (!connection) {
            const client = new MongoClient(config.mongoUri);
            connection = await client.connect();
            debug('Nueva conexió realizada con MongoDB Atlas');
        }
        debug('reutilizando conexión');
        const db = connection.db(config.mongoDbName);
        resolve(db.collection(collection));
    } catch (error) {
        reject(error)
    }
})