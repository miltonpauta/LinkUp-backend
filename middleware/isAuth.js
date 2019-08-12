//this middleware will check if jwt token is present, decides whether to continue
const jwt = require('jsonwebtoken');
const config = require('../config'); 

module.exports = (req,res,next)=>{
    const authHeader = req.get('Authorization');
    
    if(!authHeader){
        const error = new Error('Authentication failed')
        error.status = 400;
        throw error; 
    }
    const token = req.get('Authorization').split(' ')[1];
    let decoded;
    try{
        decoded = jwt.verify(token, config.jwt_privateKey);
    }catch(error){
        console.log('error')
        error.status = 500;
        throw error; 
    }

    if(!decoded){
        console.log('error')
        const error = new Error('Authentication failed')
        error.status = 400;
        throw error; 
    }

    //user id decrypted from token will be stored here! 
    req.userId = decoded.userId; 
    console.log('this is hit')
    console.log('----------Authentication Successful---------'); 
    next();  
}