const express = require('express')
const router = express.Router()

// router.get('/',(req,res)=>{
    // const url = req.url
    // res.render('index')
// })
router.get('/',(req,res)=>{
    const url = req.url
    res.render('tools')
})
router.get('/tools/extesnions',(req,res)=>{
    const url = req.url
    res.render('tools/#extension-converter')
})

module.exports = router