//this middleware will check if jwt token is present, decides whether to continue
const jwt = require('jsonwebtoken');
const config = require('../config'); 

module.exports = (req,res,next)=>{
    console.log('this is hit')
    const token = req.get('Authorization').split(' ')[1];
    console.log('token is', token)
    let decoded;
    try{
        decoded = jwt.verify(token, config.jwt_privateKey);
    }catch(error){
        return res.status(500).json({
            message: 'Auth failed'
        })
    }

    if(!decoded){
        return res.status(500).json({
            message: 'Auth failed'
        })
    }

    //user id decrypted from token will be stored here! 
    req.userId = decoded.userId; 
    next();  
}