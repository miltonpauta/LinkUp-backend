const express = require('express')

const router = express.Router()

const PostController = require('../controllers/post')

const isAuth = require('../../middleware/isAuth'); 

//get all posts (main page)
router.get('/',PostController.getAllPosts); 

//create post 
router.post('/create', isAuth, PostController.postPost)

//get single post 
router.get('/:postId', PostController.getPost)

//edit a single post 
router.patch('/:postId', isAuth, PostController.editPost) 

module.exports = router; 