const mongoose = require('mongoose')

// Creating Model
const CommentSchema = new mongoose.Schema({
    profile: {
        type: String,
        default: "G"
    },
    name: {
        type: String,
        default: "guest"
    },
    comment: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

// Compiling Model 
const Comments = mongoose.model('comment', CommentSchema)
module.exports = Comments