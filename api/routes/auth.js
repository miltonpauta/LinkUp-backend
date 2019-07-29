const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/auth')

const {check} = require('express-validator/check'); 

//login 
router.post('/login',[
        check('email')
        .isEmail().withMessage('Please enter a valid email!')
        .normalizeEmail()
    ]
    , 
    AuthController.postLogin
); 

//sign up -- ADDING VALIDATION HERE 
router.post('/register', [
    check('email')
    .isEmail().withMessage('Please enter a valid email!')
    .normalizeEmail(),

    check('password', 'The password must be 5+ chars long and contain a number')
    .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
    .isLength({ min: 5 })
    .matches(/\d/)
    ],
    AuthController.postRegister
); 

//sign out 
router.post('/logout', AuthController.postLogout); 

module.exports = router; 
