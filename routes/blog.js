const express = require('express')
const router = express.Router()
const path = require('path')
const blogs = require('../data/blogs.js')

router.get('/blogs',(req,res)=>{
    let eachblog = blogs.forEach(element => {
        console.log(element);
    });
    res.render('blogs',{blogs:blogs})
})

router.get('/blogs/:slug',(req,res)=>{
   blogpost = blogs.filter((e)=>{
       return e.slug == req.params.slug
   })
    res.render('blogpost',{
        title:blogpost[0].title,
        description:blogpost[0].description
    })
})

module.exports = router