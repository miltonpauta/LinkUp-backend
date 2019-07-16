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

//user creates post 
exports.postPost=(req,res,next)=>{
    const postName = req.body.name; //should be Json 
    if(postName){
        res.status(201).json({
            message: 'item recieved by server',
            postName: postName
        })
    }
    // //no post inputted by user
    // else{
    //     const error = new Error('please enter data')
    //     error.status(404); 
    //     next(error)
    // }
    
}