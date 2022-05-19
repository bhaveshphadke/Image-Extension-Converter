const mongoose = require('mongoose');

const connecToMongo=()=>{
    const MongoURI = 'mongodb+srv://bhavesh:l1qD495iZrWwFLyX@imageconverter.cgv13.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(MongoURI,(err)=>{
        if(err) return console.log('err');
        console.log('We are connected successfully!!');
    })    
}


module.exports = connecToMongo