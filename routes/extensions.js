const express = require('express');
const async = require('hbs/lib/async');
const multer = require('multer')
const webp = require('webp-converter');
const path = require('path')

const router = express.Router()

// DECLARING STORAGE VARIABLE TO STORE IMAGES ON THE SERVER
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + file.fieldname + '-' + file.originalname)
    }
})

// CREATING UPLOAD MIDDLEWARE
const upload = multer({ storage: storage }).single('image')



// WEBP TO PNG
router.get('/tools/webptopng', (req, res) => {
    res.render('extensions/webptopng')
})

router.post('/webptopngupload', (req, res) => {
    console.log('sdfsdhfjdshfjgsdhfgsdh');
    try {
        console.log("try");
        // USING UPLOAD MIDDLEWARE
        upload(req, res, err => {
            // IF ANY ERROR OCCURES
            if (err) {
                return res.render('extensions/webptopng')
            }

            // PATH OF IMAGE - TO PASS IN WEBP
            outputpath = '/uploads/' + Date.now() + 'result.png'

            // TAKING INPUT PATH AND PASSING IN WEBP 
            // ALSO PASSING PATH OR OUTPUT IMAGE
            const result = webp.cwebp(req.file.path, outputpath, "-q 80");

            // SLICING IMAGE PATH TO DISPLAY USER
            const imagename = outputpath.slice(8)

            // SENDING RESPONSE WHEN IMAGE IS READY
            result.then((response) => {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
            });


        })
    } catch (error) {
        console.log("try");

        res.render('extensions/webptopng')
    }
})


// WEBP TO JPG
router.get('/tools/webptojpg', (req, res) => {
    res.render('extensions/webptojpg')
})

router.post('/webptojpgupload', (req, res) => {
    try {
           // USING UPLOAD MIDDLEWARE
           upload(req, res, err => {
            // IF ANY ERROR OCCURES
            if (err) {
                return res.render('extensions/webptopng')
            }

            // PATH OF IMAGE - TO PASS IN WEBP
            outputpath = 'uploads/' + Date.now() + 'result.png'

            // TAKING INPUT PATH AND PASSING IN WEBP 
            // ALSO PASSING PATH OR OUTPUT IMAGE
            const result = webp.dwebp(req.file.path, outputpath, "-o");

            // SLICING IMAGE PATH TO DISPLAY USER
            const imagename = outputpath.slice(8)

            // SENDING RESPONSE WHEN IMAGE IS READY
            result.then((response) => {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
            });


        })
    } catch (error) {

        res.render('extensions/webptojpg')
    }
})




// TO DOWNLOAD
router.get('/download', (req, res) => {
    try {
        const ipath = req.query.downloadimage
        console.log(path.join(__dirname,ipath));
        console.log('fgssdfdasdasd');
        res.download(ipath)
    } catch (error) {
        res.render('extensions/download')
    }
})

module.exports = router