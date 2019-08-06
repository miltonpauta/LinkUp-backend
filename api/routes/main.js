const express = require('express')

const router = express.Router()

const PostController = require('../controllers/post')

const isAuth = require('../../middleware/isAuth'); 

const {body} = require('express-validator/check'); 


//this is for file uploads!
const multer = require('multer'); 
const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'music-files')
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().toISOString() + '-' + file.originalname) //original name is orginal name of file uploaded 
    }
})
const fileFilter = (req, file, cb)=>{
    console.log('file is ... ', file);
    if(file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3'){
        console.log('file accepted by filter'); 
        cb(null, true)
    }
    else{
        cb(null, false)
        cb(new Error('file not accepted by multer')) //ends up passing error message to front end 
    }
}

//get all posts (main page)
router.get('/',PostController.getAllPosts); 

//get all posts belonging to single user 
router.get('/myPosts',isAuth, PostController.fetchCurrentUserPosts); 

//TODO: fix validation, not working for this! 
//create post 
router.post('/create',isAuth, 
    // [
    //     body('title')
    //     .isLength({ min: 5 }).withMessage('title must be at least 5 characters long')
        

    //     // body('caption')
    //     // .trim().isLength({ min: 10 }).withMessage('Caption must be at least 10 characters long')

    // ],
    multer({storage: fileStorage, fileFilter: fileFilter}).single('audio')
,PostController.postPost); 

//get single post 
router.get('/:postId', isAuth, PostController.getPost); 

//edit a single post 
router.patch('/:postId', isAuth, PostController.editPost) 

// should I pass the user id back to server too? 
router.delete('/myPosts/:postId')

module.exports = router; 


//IMPORTANT: when completing majority of project, add isAuth to all these routes and compliment this in front end