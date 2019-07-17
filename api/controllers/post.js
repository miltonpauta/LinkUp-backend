const Post = require('../models/Post')

//get all posts from database 
exports.getPosts=(req,res,next)=>{
    res.status(200).json({
        message: 'this is all the posts in database '
    })
}

//fetch post that belongs to user 
exports.getPost=(req,res,next)=>{
    console.log('searching...')
}

//user creates post ******NOTE WHEN MAKING FRONT END, MAKE SURE U CONVERT TITLE AND CAPTION INTO JSON (stringify) ATTACH IT TO THE FORM DATA
exports.postPost=(req,res,next)=>{
    if(!req.file){
        const error = new Error('No image provided')
        error.status(422); 
        throw error; 
    }

    console.log('title is ', req.body.title); 

    //audio path is stored in req.file path
    const title = req.body.title;
    const caption = req.body.caption;
    const audioLink = req.file.path;  

    //VALIDATION HANDLING WILL EXIST HERE 

    const newPost = new Post(title, caption, audioLink)
    newPost.save()
    .then(result=>{
        res.status(201).json({
            message: 'item is created and stored in the database',
            item: result
        })
    })
    .catch(err=>{ //find out how to extract message from this 'err' object 
        const error = new Error('Error with saving item into database')
        error.status(404); 
        next(error)
    })
}
