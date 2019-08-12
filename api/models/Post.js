const getDb = require('../../utils/database').getDb;
const mongo = require('mongodb')

class Post {
    //add file next, userID will be added last 
    constructor(title,caption, audioLink,userId, creatorName){
        this.title = title; 
        this.caption = caption;  
        this.audioSrc = audioLink; 
        this.timeCreated = new Date().toLocaleTimeString(); 
        this.userId = new mongo.ObjectId(userId); 
        this.creatorName = creatorName; 
    }

    save(){
        const db = getDb();
        return db.collection('posts').insert(this)
        .catch(err=>{
            console.log(err); 
        })
    }

    static findById(id){
        const db = getDb();
        return db.collection('posts')
        .findOne({_id: new mongo.ObjectId(id)})
        .then(foundPost=>{
            return foundPost; 
        })
        .catch(err=>{
            console.log(err);  
        })
    }

    //make a query that retrieves all posts from collection 
    static fetchAllPosts(){
        const db = getDb();
        return db.collection('posts').find()
        .toArray() 
        .then(allPosts=>{
            return allPosts;  
        })
        .catch(err=>{
            console.log(err);  
        })
    }

    static fetchPostsByUserId(userId){
        const db = getDb();
        return db.collection('posts').find({userId: new mongo.ObjectId(userId)})
        .toArray()
        .then(posts=>{
            return posts;
        })
        .catch(err=>{
            console.log(err); 
        })

    }

    static deletePostById(postId){
        const db = getDb();
        return db.collection('posts').deleteOne({_id: new mongo.ObjectId(postId)})
        .then(result=>{
            console.log('item deleted from database')
        })
        .catch(err=>{
            console.log(err); 
        })

    }

}

module.exports = Post; 