const getDb = require('../../utils/database').getDb;
const mongo = require('mongodb')

class Post {
    //add file next, userID will be added last 
    constructor(title,caption, audioLink){
        this.title = title; 
        this.caption = caption;  
        this.audioSrc = audioLink; 
        this.timeCreated = new Date().toLocaleTimeString(); 
    }

    save(){
        const db = getDb();
        return db.collection('posts').insert(this)
        .catch(err=>{
            console.log(err); 
        })
    }

    //make a function that finds a user with a id
    // static findById(id){
    //     const db = getDb();
    //     return db.collection('users')
    //     .find({_id: new mongo.ObjectId(id)})
    //     .next()
    //     .then(foundUser=>{
    //         return foundUser; 
    //     })
    //     .catch(err=>{
    //         console.log(err); 
    //     })
    // }
}

module.exports = Post; 