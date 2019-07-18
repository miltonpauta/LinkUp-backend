const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const DatabaseConnect = require('./utils/database').mongoConnect; 
const multer = require('multer'); 
const config = require('./config'); 

const app = express();
const morgan = require('morgan'); 
//specify the storage yourself! 
const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'music-files')
    },
    filename: (req,file,cb)=>{
        cb(null, new Date().toISOString() + '-' + file.originalname) //original name is orginal name of file uploaded 
    }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'audio/mpeg'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

//use morgan 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('audio')); //make sure in front end, input name ="audio"

//handleCORS 
app.use((req,res,next)=>{
    //attach these headers to all responses 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept, Authorization')
    if(req.method=='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next(); 
})

//import routes
const HomepageRoutes = require('./api/routes/main');
const AuthRoutes = require('./api/routes/auth'); 

app.use('/posts', HomepageRoutes); 

//will work on these later! get all other routes working 
app.use(AuthRoutes); 

//catch all errors that head to unexisting routes 
app.use((req, res, next)=>{
    const error = new Error('Route not found')
    error.status(404); 
    next(error)
})

//general error handler 
app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

DatabaseConnect(()=>{
    app.listen(config.port, ()=>{
        console.log(`Server running on port ${config.port}`)
    });  
}) 