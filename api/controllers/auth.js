const User = require('../models/User')

const {validationResult} = require('express-validator'); 

//login user! 
exports.postLogin=(req,res,next)=>{

}

exports.postRegister = (req, res, next)=>{
    //get validation error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const email = req.body.email; 
    const password = req.body.password; 

    const newUser = new User(email, password); 
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
}

exports.postLogout = (req, res, next)=>{
    
}