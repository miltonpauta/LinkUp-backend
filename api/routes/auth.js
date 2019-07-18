const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/auth')

//login 
router.post('/login', AuthController.postLogin); 

//sign up 
router.post('/register', AuthController.postRegister); 

//sign out 
router.post('/logout', AuthController.postLogout); 

module.exports = router; 
