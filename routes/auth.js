const express = require('express')
const router = express.Router()
const User = require('../models/Users.js')

// SIGNUP
router.get('/signup',(req,res)=>{
    res.send('Hello World!!')
})

router.post('/signup',(req,res)=>{
    res.send('Hello World!!')
})

//LOGIN
router.get('/login',(req,res)=>{
    res.send('Hello World!!')
})

router.post('/login',(req,res)=>{
    res.send('Hello World!!')
})

module.exports = router