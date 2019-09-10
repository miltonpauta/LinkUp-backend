const Post = require('../models/Post')
const User = require('../models/User'); 
const FileHelper = require('../../utils/file')

const {validationResult} = require('express-validator'); 

//get all posts from database 
exports.getAllPosts=(req,res,next)=>{
    Post.fetchAllPosts()
    .then(results=>{
        res.status(200).json({
            message: 'All posts fetched successfully',
            allPosts:results //results is an array of all posts 
        })
    })
    .catch(err=>{
        const error = new Error('Error with retriving all posts from database.')
        error.status(404); 
        next(error)
    })
}

//fetch post that belongs to user, fetch id from param  
exports.getPost=(req,res,next)=>{
    const productId = req.params.postId; 

    Post.findById(productId)
    .then(result=>{
        console.log(result)
        res.status(200).json({
            message: `Post with ID#${productId} was fetched.`,
            postData: {
                title: result.title,
                caption: result.caption,
                audioSrc: result.audioSrc,
                timeCreated: result.timeCreated
            }
        })
    })
    .catch(err=>{
        const error = new Error('Error with retriving post from database.')
        error.status(404); 
        next(error)
    })
}

//user creates post 
exports.postPost=(req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    if(!req.file){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    //audio path is stored in req.file path
    const userId = req.body.userId; //remember, if userID is null, then you cant create this post 
    const title = req.body.title;
    const caption = req.body.caption;
    const audioLink = req.file.path;  

    //find first and last name of current session user to add to post 
    User.findUserById(userId)
    .then(result=>{
        if(!result){
            console.log('someshit happened, user should be retrieved idk man ...')
        }

        // name of post creator 
        const firstName = result.firstName;
        const lastName = result.lastName; 
        const fullName = firstName + " " + lastName; 

        //VALIDATION HANDLING WILL EXIST HERE 

        const newPost = new Post(title, caption, audioLink,userId, fullName); 
        newPost.save()
        .then(result=>{
            res.status(201).json({
                message: 'item is created and stored in the database',
                item: result
            })
        })
    })
    .catch(err=>{ //find out how to extract message from this 'err' object 
        const error = new Error('Server side problem.')
        error.status(404); 
        next(error)
    })
}

exports.editPost=(req,res,next)=>{
    //make sure this post belongs to the session user
    console.log('here is where one edits a post with user id provided') 

    //Step 1: find post by Id 
    //Step: 2 see if user id matches with this post Id 
    //Step 3: get all values from form 
    //Step 4: make a new Post Instance out of em 
    //Step 5: See if audio is same or not, if not then delete current file in local dir and replace. If not, then dont edit anything 
    //Step 6: delete current item in db and insert this, OR do a update query with all values in it  

}

exports.fetchCurrentUserPosts=(req,res,next)=>{
    const userId = req.userId; 

    //get all posts beloning to current session user 
    Post.fetchPostsByUserId(userId)
    .then(results=>{
        res.status(200).json({
            message: `all posts belonging to ${userId} have been found`,
            posts:results //results is an array of all posts 
        })
    })
    .catch(err=>{
        const error = new Error('Error with retriving users posts from database.')
        error.status(404); 
        next(error)
    })
}

exports.deletePost=(req,res,next)=>{
    const postId = req.params.postId; 
    console.log(postId); 

    Post.findById(postId)
    .then(post=>{
        if(!post){
            const error = new Error('Could not find Post.')
            error.status = 404;
            return next(error); 
        }

        if(post.userId != req.userId){
            console.log('current user is not allowed to delete this item'); 
            const error = new Error('You are not allowed to delete this post')
            error.status = 400;
            return next(error); 
        } 

        FileHelper.deleteFile(post.audioSrc); 

        return Post.deletePostById(postId) 
    })
    .then(result=>{
        //send success message to front end! 
        console.log('edeuebdubed yeay ')
        res.status(200).json({
            message: 'Success!'
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: 'deleting product failed'
        }); 
    })
}

