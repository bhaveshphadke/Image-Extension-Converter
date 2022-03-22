const mongoose = require('mongoose');

const MongoURI =`${ process.env.MONGO_URI}`

const connecToMongo=()=>{
    mongoose.connect(MongoURI,()=>{
        // if(err) return console.log('err');
        console.log('We are connected successfully!!');
    })
}

module.exports = connecToMongo