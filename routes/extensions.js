const express = require('express');
const async = require('hbs/lib/async');
const multer = require('multer')
const webp = require('webp-converter');
const path = require('path');
const { redirect } = require('express/lib/response');

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
    res.render('extensions/webptopng',{error:false})
})

router.post('/webptopngupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/webptopng') }

            outputpath = 'uploads/' + Date.now() + 'result.png'
            const result = await webp.dwebp(req.file.path, outputpath, "-o");
            console.log(result);

            const imagename = outputpath.slice(8)
            if (result === "") {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename})
            }
            else{
                res.render('extensions/webptopng',{error:true})
            }

        })
    } catch (error) {
        res.render('extensions/webptopng')
    }
})


// WEBP TO JPG
router.get('/tools/webptojpg', (req, res) => {
    res.render('extensions/webptojpg',{error:false})
})

router.post('/webptojpgupload', (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async(err) => {

            if (err) { return res.render('extensions/webptopng') }

            outputpath = 'uploads/' + Date.now() + 'result.jpg'

            const result = await  webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(8)
            if (result === "") {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
            }
            else{
                res.render('extensions/webptojpg',{error:true})
            }
        })
    } catch (error) {
        res.render('extensions/webptojpg')
    }
})




// TO DOWNLOAD
router.get('/download', (req, res) => {
    try {
        const ipath = req.query.downloadimage
        console.log(path.join(__dirname, ipath));
        console.log('fgssdfdasdasd');
        res.download(ipath)
    } catch (error) {
        res.render('extensions/download')
    }
})

module.exports = router