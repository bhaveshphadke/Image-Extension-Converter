const express = require('express')
// const { find, findOne } = require('../models/Image')
const router = express.Router()
const Image = require('../models/Downloads')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const JWT_SECRETE = process.env.JWT_SECRETE
router.get('/', (req, res) => {
    const url = req.url
    res.render('index')
})
// router.get('/tools/extesnions', (req, res) => {
//     const url = req.url
//     res.render('tools/#extension-converter')
// })

router.get('/docs', (req, res) => {
    res.render('docs')
})

router.get('/downloads',(req,res)=>{
    res.render('downloads')
})
router.post('/images', async (req, res) => {
   try {
    console.log(req.body.token);
    if (req.body.token) {
        const data = await jwt.verify(req.body.token, JWT_SECRETE)
        let user = await User.findById(data.user.id)
        if (user) {
            const imgarr = []
            const videoarr = []
            const files = await Image.find({ id: user._id })
            files.map((item) => {
                if (item.imagepath) {

                    imgarr.push({ img: item.imagepath })
                } else if (item.videopath) {

                    videoarr.push({ video: item.videopath })
                }
            })
            res.json({ images: imgarr, videos: videoarr, success:true })
        }
    } else {
        res.json({ success:false })
    }
   } catch (error) {
    res.json({ success:false })
   }

})



module.exports = router