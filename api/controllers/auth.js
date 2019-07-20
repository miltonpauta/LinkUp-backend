const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config'); 

const {validationResult} = require('express-validator'); 

//TODO: compare user input password with hashed password found with email (from db)
exports.postLogin=(req,res,next)=>{
    const email = req.body.email; 
    const password = req.body.password; 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    User.findUserByEmail(email)
    .then(result=>{
        if(!result){
            return res.status(403).json({
                error: 'Please enter correct email or password.'
            })
        }
        //user is found, so now compare passwords! 
        bcrypt.compare(password, result.password, function(err, match) {
            if(match) { 
                // Passwords match

                //auth successful -> create a jwt token!
                const token = jwt.sign({
                    email: result.email,
                    userId: result._id
                }, config.jwt_privateKey, {
                    expiresIn: "1h"
                })
                
                return res.status(200).json({
                    message: 'logged in successful',
                    token: token
                })
            } else {
                return res.status(403).json({
                    error: 'Please enter correct email or password.'
                })
            } 
          });

    })
    .catch(err=>{
        const error = new Error('an error has occured trying to login')
        error.status(500); //see if this correct error code 
        next(error)
    })
}


//TODO: hash the passwords!
exports.postRegister = (req, res, next)=>{
    //get validation error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const email = req.body.email; 
    const password = req.body.password;
    
    //hash the password
    bcrypt.hash(password, 10, function(err, hashedPassword) {
        // Store hash in database
        const newUser = new User(email, hashedPassword); 
        newUser.save()
        .then(result=>{
            return res.status(200).json({
                message: 'User created' 
            })
        })
        .catch(err=>{
            const error = new Error('Error with creating user.')
            error.status(400); //see if this correct error code 
            next(error)
        })
    });
}

exports.postLogout = (req, res, next)=>{
    
}