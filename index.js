const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8000

app.set('view engine','hbs')
app.set('views','templates/views')
hbs.registerPartials('templates/partials')

app.use('/',express.static(path.join(__dirname,'static')))
app.use('/',require(path.join(__dirname,'routes/extensions')))
app.use('/',require(path.join(__dirname,'routes/index')))


app.listen(PORT, ()=>{console.log(`app is listning on port ${PORT} and http://localhost:${PORT}`);})