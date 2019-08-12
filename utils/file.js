const fs = require('fs')
const path = require('path')

const deleteFile = (filePath)=>{
    //deletes mp3 file from file storage

    pathToDelete = path.join(__dirname,'..',filePath)
    fs.unlink(pathToDelete, (err)=>{
        if(err){
            console.log('error with file helper, delete function didnt work')
        }
    })
}

exports.deleteFile = deleteFile; 