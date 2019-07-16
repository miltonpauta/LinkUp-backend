const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect('mongodb+srv://miltonpauta:xn863vrARXrxUJUn@cluster0-doc4o.mongodb.net/LinkUp?retryWrites=true&w=majority', {useNewUrlParser:true})
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