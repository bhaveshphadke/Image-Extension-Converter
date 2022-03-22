const express = require('express')
const hbs = require('hbs')
const path = require('path')
const connecToMongo = require('./db.js')
const dotenv = require('dotenv').config('./.env')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8000
connecToMongo()
app.set('view engine','hbs')
app.set('views','templates/views')
hbs.registerPartials('templates/partials')

app.use('/',express.static(path.join(__dirname,'static')))
app.use('/',require(path.join(__dirname,'routes/extensions')))
app.use('/',require(path.join(__dirname,'routes/videos')))
app.use('/',require(path.join(__dirname,'routes/index')))
app.use('/auth',require(path.join(__dirname,'routes/auth')))

app.get('*',(req,res)=>{
    res.status(404).send('404 PAGE NOT FOUND')
})


app.listen(PORT, ()=>{console.log(`app is listning on port ${PORT} and http://localhost:${PORT}`);})