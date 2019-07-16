const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/auth')

//login 
router.post('/login', AuthController.postLogin); 

//sign up 
router.post('/signup', AuthController.postSignup); 

//sign out 
router.post('/signout', AuthController.postSignout); 

module.exports = router; 
