const Post = require('../models/Post')

//get all posts from database 
exports.getAllPosts=(req,res,next)=>{
    Post.fetchAllPosts()
    .then(results=>{
        console.log(results); 
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
