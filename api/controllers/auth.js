const User = require('../models/User')

//login user! 
exports.postLogin=(req,res,next)=>{

}

exports.postRegister = (req, res, next)=>{
    const email = req.body.email; 
    const password = req.body.password; 

    const newUser = new User(email, password); 
    newUser.save()
    .then(result=>{
         res.status(200).json({
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