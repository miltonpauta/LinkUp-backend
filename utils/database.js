const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('../config'); 

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect(`mongodb+srv://${config.db_username}:${config.db_password}@cluster0-doc4o.mongodb.net/${config.db_clusterName}?retryWrites=true&w=majority`, {useNewUrlParser:true})
    .then(client=>{
        console.log('Connected');  
        _db=client.db() //THIS STORES ***ACCESS**** TO THE DATABASE
        callback(client);
    })
    .catch(err=>{
        console.log(err)
        throw err; 
    })
}

const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw 'no database found';
}

exports.mongoConnect = mongoConnect; 
exports.getDb = getDb;