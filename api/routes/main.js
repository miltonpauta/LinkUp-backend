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

//TODO: fix validation, not working for this! Add isAuth later! 
//create post 
router.post('/create', 
    // [
    //     body('title')
    //     .isLength({ min: 5 }).withMessage('title must be at least 5 characters long')
        

    //     // body('caption')
    //     // .trim().isLength({ min: 10 }).withMessage('Caption must be at least 10 characters long')

    // ],
    multer({storage: fileStorage, fileFilter: fileFilter}).single('audio')
,PostController.postPost); 

//get single post 
router.get('/post/:postId',isAuth, PostController.getPost); 

//edit a single post 
router.patch('/post/:postId', isAuth, PostController.editPost) 

// delete post
router.delete('/post/:postId', isAuth, PostController.deletePost); 

module.exports = router; 