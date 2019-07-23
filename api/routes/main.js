const express = require('express')

const router = express.Router()

const PostController = require('../controllers/post')

const isAuth = require('../../middleware/isAuth'); 

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
    console.log('shit is', file);
    if(file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

//get all posts (main page)
router.get('/',PostController.getAllPosts); 

//create post 
router.post('/create', multer({storage: fileStorage, fileFilter: fileFilter}).single('audio'), PostController.postPost)

//get single post 
router.get('/:postId', PostController.getPost)

//edit a single post 
router.patch('/:postId', isAuth, PostController.editPost) 

module.exports = router; 