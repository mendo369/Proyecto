//capa donde se gestiona la comunicación y los servicios con nuestra base de datos

const {ObjectId} = require('mongodb')//necesario para poder obtener el id ya que el _id es un object

const {database} = require('../database/index');
const {ProductUtils} = require('./utils');

const COLLECTION = 'products';

//dado a que el driverd de MngoDB (mongodb) es asincrono, debemos de usar todas sus funciones de forma asincrona (async/await)
const getAll = async ()=>{
    const collection = await database(COLLECTION);
    return await collection.find({}).toArray();//nos devuelve todos los datos de la collection produsto e forma de array
}

const getById = async (id)=>{
    const collection = await database(COLLECTION);
    return await collection.findOne({_id: ObjectId(id)});
}

const create = async (product)=>{
    const collection = await database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async (id, product)=>{
    const collection = await database(COLLECTION);
    const {name, precio, cantidad} = product;
    const filter = {_id:ObjectId(id)};
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    const updateDoc = {$set: {
        name: name,
        precio: precio,
        cantidad: cantidad
    }}
    const result = await collection.updateOne(filter, updateDoc, options);
    return product;
}

const eliminar = async (id)=>{
    const collection = await database(COLLECTION);
    const filter = {_id: ObjectId(id)};
    const result = await collection.deleteOne(filter);
    return id;
}

const generateReport = async (name, res)=>{
    let products= await getAll();
    ProductUtils.excelGenerate(products, name, res);
}
module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    update,
    eliminar
}