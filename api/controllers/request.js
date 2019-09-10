const Post = require('../models/Post')
const Request = require('../models/Request')
const User = require('../models/User'); 

//At this point, user is authenticated 
exports.makeRequest = (req,res,next) =>{
    const postId = req.params.postId;
    const requesterId = req.query.requesterId; 

    //find post by postId
    Post.findById(postId)
    .then(post=>{
        if(!post){
            const error = new Error('Could not find Post.')
            error.status = 404;
            return next(error); 
        }

        const postCreatorId = post.userId; 

        //verify if requesterId exists in database 
        User.findUserById(requesterId)
        .then(foundUser=>{

            //if requesterId does not exist 
            if(!foundUser){
                const error = new Error("Requester's User Id does not exist in database"); 
                error.status = 404;
                return next(error); 
            }

            //make a new request object and add it to db 
            const newRequest = new Request(requesterId, postCreatorId, postId);
            newRequest.save()
            .then(result=>{
                //find the post in db and UPDATE/increment its like amount 
                Post.incrementRequestAmt(postId)
                .then(result=>{
                    res.status(201).json({
                        message: 'request is created and stored in the database',
                        item: result
                    })
                })
            })
        })
    })
    .catch(err=>{
        const error = new Error('Server side problem.')
        error.status(404); 
        next(error)
    })
}