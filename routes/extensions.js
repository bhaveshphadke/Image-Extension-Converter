const express = require('express');
const multer = require('multer')
const webp = require('webp-converter');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs')
const router = express.Router()
const Downloads = require('../models/Downloads');
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken')
const User = require('../models/Users')


const JWT_SECRETE = process.env.JWT_SECRETE
// DECLARING STORAGE VARIABLE TO STORE IMAGES ON THE SERVER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/uploads')
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + file.fieldname + '-' + file.originalname)
    }
})

// CREATING UPLOAD MIDDLEWARE
const upload = multer({ storage: storage }).single('image')


/* 
    *******************************************WEBP-CONVERTER***************************************** 
    *********** WEBP TO PNG,JPG,JPEG,GIF *********** PNG,JPG,JPEG,GIF TO WEBP**************
*/
// WEBP TO PNG
router.get('/tools/webptopng', (req, res) => {
    res.render('extensions/webptopng', { error: false })
})



router.post('/webptopngupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {



            if (err) { return res.render('extensions/webptopng') }

            outputpath = 'static/uploads/' + Date.now() + 'result.png'
            const result = await webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(7)
            let outsubstring = outputpath.split("static/")
            if (result === "") {
                res.render('extensions/download', { outputpath: outsubstring[1], imagename: imagename })
            }
            else {

                res.render('extensions/webptopng', { error: true })
            }


        })
    } catch (error) {
        res.render('extensions/webptopng')
    }
})


// WEBP TO JPG
router.get('/tools/webptojpg', (req, res) => {
    res.render('extensions/webptojpg', { error: false })
})

router.post('/webptojpgupload', (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/webptojpg') }

            outputpath = 'static/uploads/' + Date.now() + 'result.jpg'

            const result = await webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(7)
            let outsubstring = outputpath.split("static/")
            if (result === "") {

                res.render('extensions/download', { outputpath: outsubstring[1], imagename: imagename })


            
            }
            else {
                res.render('extensions/webptojpg', { error: true })
            }
        })
    } catch (error) {
        res.render('extensions/webptojpg')
    }
})



// WEBP TO JPEG
router.get('/tools/webptojpeg', (req, res) => {
    res.render('extensions/webptojpeg', { error: false })
})

router.post('/webptojpegupload', (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/webptojpeg') }

            outputpath = 'static/uploads/' + Date.now() + 'result.jpeg'

            const result = await webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(7)
            let outsubstring = outputpath.split("static/")
            if (result === "") {
                res.render('extensions/download', { outputpath: outsubstring[1], imagename: imagename })
            }
            else {
                res.render('extensions/webptojpeg', { error: true })
            }
        })
    } catch (error) {
        res.render('extensions/webptojpeg')
    }
})


// WEBP TO GIF
router.get('/tools/webptogif', (req, res) => {
    res.render('extensions/webptogif', { error: false })
})

router.post('/webptogifupload', (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/webptogif') }

            outputpath = 'static/uploads/' + Date.now() + 'result.gif'

            const result = await webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(7)
            let outsubstring = outputpath.split("static/")
            if (result === "") {
                res.render('extensions/download', { outputpath: outsubstring[1], imagename: imagename })
            }
            else {
                res.render('extensions/webptogif', { error: true })
            }
        })
    } catch (error) {
        res.render('extensions/webptogif')
    }
})



// GIF TO WEBP
router.get('/tools/giftowebp', (req, res) => {
    console.log('dsfs');
    res.render('extensions/giftowebp', { error: false })
})

router.post('/giftowebpupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/giftowebp') }

            outputpath = 'static/uploads/' + Date.now() + 'result.webp'
            const result = await webp.gwebp(req.file.path, outputpath, "-q 80");
            console.log(result);

            const imagename = outputpath.slice(7)
            let outsubstring = outputpath.split("static/")
            if (result === "") {
                res.render('extensions/download', { outputpath: outsubstring[1], imagename: imagename })
            }
            else {

                res.render('extensions/giftowebp', { error: true })
            }

        })
    } catch (error) {
        res.render('extensions/giftowebp')
    }
})


router.get('/tools/towebp', (req, res) => {
    res.render('extensions/towebp')
})

router.post('/towebpupload', async (req, res) => {
    try {

        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('tools') }

            outputpath = 'static/uploads/' + Date.now() + `result.webp`
            const result = await webp.cwebp(req.file.path, outputpath, "-q 80");
            console.log(result);

            const imagename = outputpath.slice(7)
            let outsubstring = outputpath.split("static/")
            if (result === "") {
                res.render('extensions/download', { outputpath: outsubstring[1], imagename: imagename })
            }
            else {
                res.render('extesnions/towebp', { error: true })
            }

        })
    } catch (error) {
        res.render('extensions/giftowebp')
    }
})






// *******************************************JIMP***************************************** 

// JPG TO PNG
router.get('/tools/jpgtopng', (req, res) => {
    console.log('dsfs');
    res.render('extensions/jpgtopng', { error: false })
})

// JPEG TO PNG
router.get('/tools/jpegtopng', (req, res) => {
    console.log('dsfs');
    res.render('extensions/jpegtopng', { error: false })
})

// JPEG TO JPG
router.get('/tools/jpegtojpg', (req, res) => {
    console.log('dsfs');
    res.render('extensions/jpegtojpg', { error: false })
})
// JPG TO JPEG
router.get('/tools/jpgtojpeg', (req, res) => {
    console.log('dsfs');
    res.render('extensions/jpgtojpeg', { error: false })
})

// PNG TO JPG
router.get('/tools/pngtojpg', (req, res) => {
    console.log('dsfs');
    res.render('extensions/pngtojpg', { error: false })
})

// PNG TO JPG
router.get('/tools/pngtojpeg', (req, res) => {
    console.log('dsfs');
    res.render('extensions/pngtojpeg', { error: false })
})

router.post('/imageupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {
            const from = req.body.from
            const to = req.body.to
            if (err) { return res.render(`extensions/${from}to${to}`, { error: true }) }

            outputpath = 'static/uploads/' + Date.now() + `result.${to}`
            jimp.read(req.file.path, async (err, image) => {
                if (err) return res.render(`extensions/${from}to${to}`, { error: true })
                let a = await image.write(outputpath)

                const imagename = outputpath.slice(7)
                let outsubstring = outputpath.split("static/")
                res.render('extensions/download', { outputpath: outsubstring[1], imagename: imagename })
            })

        })
    } catch (error) {
        res.render(`extensions/${from}to${to}`)
    }
})




// TO DOWNLOAD
router.get('/download', async (req, res) => {
    try {
      
        const ipath = req.query.downloadimage
        const token = req.query.token
        if (token) {
            const data = await jwt.verify(token, JWT_SECRETE)
            
            let user = await User.findById(data.user.id)
            if(user){
                let result = new Downloads({
                    user: user.name,
                    id:user._id,
                    imagepath: ipath
                })
                console.log(result)
                result.save()

            }
        }
        const imagepath = 'static/' + ipath
        res.download(imagepath)
    } catch (error) {
        res.render('extensions/download')
    }
})

module.exports = router