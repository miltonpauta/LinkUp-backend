//this middleware will check if jwt token is present, decides whether to continue
const jwt = require('jsonwebtoken');
const config = require('../config'); 

module.exports = (req,res,next)=>{
    try{
        const decoded = jwt.verify(req.body.token, config.jwt_privateKey); 
        req.userData = decoded; 
        next(); 
    }catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}