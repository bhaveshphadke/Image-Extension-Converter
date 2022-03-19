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

            if (err) { return res.render('extensions/webptojpg') }

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



// WEBP TO JPEG
router.get('/tools/webptojpeg', (req, res) => {
    res.render('extensions/webptojpeg',{error:false})
})

router.post('/webptojpegupload', (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async(err) => {

            if (err) { return res.render('extensions/webptojpeg') }

            outputpath = 'uploads/' + Date.now() + 'result.jpeg'

            const result = await  webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(8)
            if (result === "") {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
            }
            else{
                res.render('extensions/webptojpeg',{error:true})
            }
        })
    } catch (error) {
        res.render('extensions/webptojpeg')
    }
})


// WEBP TO GIF
router.get('/tools/webptogif', (req, res) => {
    res.render('extensions/webptogif',{error:false})
})

router.post('/webptogifupload', (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async(err) => {

            if (err) { return res.render('extensions/webptogif') }

            outputpath = 'uploads/' + Date.now() + 'result.gif'

            const result = await  webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(8)
            if (result === "") {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
            }
            else{
                res.render('extensions/webptogif',{error:true})
            }
        })
    } catch (error) {
        res.render('extensions/webptogif')
    }
})



// PNG TO WEBP
router.get('/tools/pngtowebp', (req, res) => {
    res.render('extensions/pngtowebp',{error:false})
})

router.post('/pngtowebpupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/pngtowebp') }

            outputpath = 'uploads/' + Date.now() + 'result.webp'
            const result = await webp.cwebp(req.file.path, outputpath, "-q 80");
            console.log(result);

            const imagename = outputpath.slice(8)
            if (result === "") {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename})
            }
            else{
                
                res.render('extensions/pngtowebp',{error:true})
            }

        })
    } catch (error) {
        res.render('extensions/pngtowebp')
    }
})


// JPG TO WEBP
router.get('/tools/jpgtowebp', (req, res) => {
    res.render('extensions/jpgtowebp',{error:false})
})

router.post('/jpgtowebpupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/jpgtowebp') }

            outputpath = 'uploads/' + Date.now() + 'result.webp'
            const result = await webp.cwebp(req.file.path, outputpath, "-q 80");
            console.log(result);

            const imagename = outputpath.slice(8)
            if (result === "") {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename})
            }
            else{
                
                res.render('extensions/jpgtowebp',{error:true})
            }

        })
    } catch (error) {
        res.render('extensions/jpgtowebp')
    }
})



// JPEG TO WEBP
router.get('/tools/jpegtowebp', (req, res) => {
    res.render('extensions/jpegtowebp',{error:false})
})

router.post('/jpegtowebpupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/jpegtowebp') }

            outputpath = 'uploads/' + Date.now() + 'result.webp'
            const result = await webp.cwebp(req.file.path, outputpath, "-q 80");
            console.log(result);

            const imagename = outputpath.slice(8)
            if (result === "") {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename})
            }
            else{
                
                res.render('extensions/jpegtowebp',{error:true})
            }

        })
    } catch (error) {
        res.render('extensions/jpegtowebp')
    }
})


// GIF TO WEBP
router.get('/tools/giftowebp', (req, res) => {
    console.log('dsfs');
    res.render('extensions/giftowebp',{error:false})
})

router.post('/giftowebpupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/giftowebp') }

            outputpath = 'uploads/' + Date.now() + 'result.webp'
            const result = await webp.gwebp(req.file.path, outputpath, "-q 80");
            console.log(result);

            const imagename = outputpath.slice(8)
            if (result === "") {
                res.render('extensions/download', { outputpath: outputpath, imagename: imagename})
            }
            else{
                
                res.render('extensions/giftowebp',{error:true})
            }

        })
    } catch (error) {
        res.render('extensions/giftowebp')
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