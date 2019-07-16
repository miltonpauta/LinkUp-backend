const express = require('express')

const router = express.Router()

const PostController = require('../controllers/post')


//get all posts (main page)
router.get('/',PostController.getPosts); 

//create post 
router.post('/create', PostController.postPost)

//get single post 
router.get('/:postId', PostController.getPost)

module.exports = router; 