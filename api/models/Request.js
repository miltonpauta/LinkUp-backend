const getDb = require('../../utils/database').getDb;
const mongo = require('mongodb')

class Request {
    constructor(requesterId, userId, postId){
        this.userId = userId;
        this.postId = postId; 
        this.requesterId = requesterId; 
    }

    save(){
        const db = getDb();
        return db.collection('requests').insert(this)
        .catch(err=>{
            console.log(err); 
        })
    }

    static findById(id){
        const db = getDb();
        return db.collection('requests')
        .findOne({_id: new mongo.ObjectId(id)})
        .then(foundRequest=>{
            return foundRequest; 
        })
        .catch(err=>{
            console.log(err);  
        })
    }

    //make a query that fetches all requests made to a certain user 

    //make a query that deletes a request 
}

module.exports = Request; 