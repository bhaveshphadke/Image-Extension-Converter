const mongoose = require('mongoose')

const {Schema} = mongoose

// Creating Model
const ContactSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

// Compiling Model
const Contact = mongoose.model('contact',ContactSchema)

module.exports = Contact