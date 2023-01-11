const express = require('express')
const app = express()

// All imports
const hbs = require('hbs')
const path = require('path')
const cors = require('cors')
const fs = require('fs')

// Configuring .env file
const dotenv = require('dotenv').config('./.env')

//Connecting MongoDB
const connecToMongo = require('./db.js')
connecToMongo()
const PORT = process.env.PORT || 8000

// Middlewares
app.use(express.json())
app.use(express.urlencoded());
app.use(cors())

// Setting view Engine as hbs
app.set('view engine','hbs')
app.set('views','templates/views')

//Setting partial directory for hbs
hbs.registerPartials('templates/partials')

// Static folder 
app.use('/',express.static(path.join(__dirname,'static')))

// Importing and including routes using middlewares
app.use('/auth',require(path.join(__dirname,'routes/auth')))
app.use('/',require(path.join(__dirname,'routes/extensions')))
app.use('/',require(path.join(__dirname,'routes/videos')))
app.use('/',require(path.join(__dirname,'routes/index')))
app.use('/',require(path.join(__dirname,'routes/contact')))
app.use('/',require(path.join(__dirname,'routes/comments')))


// If user visit wrong path
app.get('*',(req,res)=>{
    res.status(404).render('404')
})


app.listen(PORT, ()=>{console.log(`app is listning on port ${PORT} and http://localhost:${PORT}`);})