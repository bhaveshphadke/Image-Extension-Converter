const mongoose = require('mongoose');

const connecToMongo=()=>{
    const MongoURI = process.env.MONGO_URI
    mongoose.connect(MongoURI,(err)=>{
        if(err) return console.log('err');
        console.log('We are connected successfully!!');
    })    
}


module.exports = connecToMongo