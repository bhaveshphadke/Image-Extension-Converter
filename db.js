const mongoose = require('mongoose');

const MongoURI ="mongodb://localhost:27017/hello?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connecToMongo=()=>{
    mongoose.connect(MongoURI,(err)=>{
        if(err) return console.log('err');
        console.log('We are connected successfully!!');
    })
}

module.exports = connecToMongo