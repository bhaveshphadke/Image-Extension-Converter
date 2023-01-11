const mongoose = require('mongoose')

const DownloadsSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    imagepath:{
        type:String
    },
    videopath:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

let Downloads = mongoose.model('image',DownloadsSchema)
module.exports = Downloads