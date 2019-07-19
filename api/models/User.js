const getDb = require('../../utils/database').getDb;
const mongo = require('mongodb')

class User {
    //add file next, userID will be added last 
    constructor(email,password){
        this.email = email; 
        this.password = password; 
    }

    save(){
        const db = getDb();
        return db.collection('users').insert(this)
        .catch(err=>{
            console.log(err); 
        })
    }

    static findUserById(id){
        const db = getDb();
        return db.collection('users')
        .find({_id: new mongo.ObjectId(id)})
        .next()
        .then(foundUser=>{
            return foundUser; 
        })
        .catch(err=>{
            console.log(err);  
        })
    }

    static findUserByEmail(email){
        console.log('email being sent to query', email); 
        const db = getDb();
        return db.collection('users')
        .findOne({email: email})
        .then(foundUser=>{
            return foundUser;  
        })
        .catch(err=>{
            console.log(error); 
        })
    }

    //make a query that retrieves all posts from collection 
    static fetchAllUsers(){
        const db = getDb();
        return db.collection('users').find()
        .toArray() 
        .then(allUsers=>{
            return allUsers;  
        })
        .catch(err=>{
            console.log(err);  
        })
    }

}

module.exports = User; 