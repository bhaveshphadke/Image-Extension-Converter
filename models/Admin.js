const mongoose = require('mongoose')

const {Schema} = mongoose

const ContactSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Contact = mongoose.model('admin',ContactSchema)

module.exports = Contact