const express = require('express');
const async = require('hbs/lib/async');
const multer = require('multer')
const webp = require('webp-converter');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs')
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

            outputpath = 'uploads/' + Date.now() + 'result.png'
            const result = await webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(8)
            if (result === "") {
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
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

            outputpath = 'uploads/' + Date.now() + 'result.jpg'

            const result = await webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(8)
            if (result === "") {
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
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

            outputpath = 'uploads/' + Date.now() + 'result.jpeg'

            const result = await webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(8)
            if (result === "") {
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
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

            outputpath = 'uploads/' + Date.now() + 'result.gif'

            const result = await webp.dwebp(req.file.path, outputpath, "-o");

            const imagename = outputpath.slice(8)
            if (result === "") {
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            }
            else {
                res.render('extensions/webptogif', { error: true })
            }
        })
    } catch (error) {
        res.render('extensions/webptogif')
    }
})



// PNG TO WEBP
router.get('/tools/pngtowebp', (req, res) => {
    res.render('extensions/pngtowebp', { error: false })
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
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            }
            else {

                res.render('extensions/pngtowebp', { error: true })
            }

        })
    } catch (error) {
        res.render('extensions/pngtowebp')
    }
})


// JPG TO WEBP
router.get('/tools/jpgtowebp', (req, res) => {
    res.render('extensions/jpgtowebp', { error: false })
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
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            }
            else {

                res.render('extensions/jpgtowebp', { error: true })
            }

        })
    } catch (error) {
        res.render('extensions/jpgtowebp')
    }
})



// JPEG TO WEBP
router.get('/tools/jpegtowebp', (req, res) => {
    res.render('extensions/jpegtowebp', { error: false })
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
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            }
            else {

                res.render('extensions/jpegtowebp', { error: true })
            }

        })
    } catch (error) {
        res.render('extensions/jpegtowebp')
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

            outputpath = 'uploads/' + Date.now() + 'result.webp'
            const result = await webp.gwebp(req.file.path, outputpath, "-q 80");
            console.log(result);

            const imagename = outputpath.slice(8)
            if (result === "") {
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            }
            else {

                res.render('extensions/giftowebp', { error: true })
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

router.post('/jpgtopngupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/jpgtopng', { error: true }) }

            outputpath = 'uploads/' + Date.now() + 'result.png'
            jimp.read(req.file.path, async (err, image) => {
                if (err) return res.render('extensions/jpgtopng', { error: true })
                let a = await image.write(outputpath)
                const imagename = outputpath.slice(8)
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            })

        })
    } catch (error) {
        res.render('extensions/jpgtopng')
    }
})



// JPEG TO PNG
router.get('/tools/jpegtopng', (req, res) => {
    console.log('dsfs');
    res.render('extensions/jpegtopng', { error: false })
})

router.post('/jpegtopngupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/jpegtopng', { error: true }) }

            outputpath = 'uploads/' + Date.now() + 'result.png'
            jimp.read(req.file.path, async (err, image) => {
                if (err) return res.render('extensions/jpegtopng', { error: true })
                let a = await image.write(outputpath)
                const imagename = outputpath.slice(8)
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            })

        })
    } catch (error) {
        res.render('extensions/jpegtopng')
    }
})




// JPEG TO JPG
router.get('/tools/jpegtojpg', (req, res) => {
    console.log('dsfs');
    res.render('extensions/jpegtojpg', { error: false })
})

router.post('/jpegtojpgupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/jpegtojpg', { error: true }) }

            outputpath = 'uploads/' + Date.now() + 'result.jpg'
            jimp.read(req.file.path, async (err, image) => {
                if (err) return res.render('extensions/jpegtojpg', { error: true })
                let a = await image.write(outputpath)
                const imagename = outputpath.slice(8)
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            })

        })
    } catch (error) {
        res.render('extensions/jpegtojpg')
    }
})



// JPG TO JPEG
router.get('/tools/jpgtojpeg', (req, res) => {
    console.log('dsfs');
    res.render('extensions/jpgtojpeg', { error: false })
})

router.post('/jpgtojpegupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/jpgtojpeg', { error: true }) }

            outputpath = 'uploads/' + Date.now() + 'result.jpeg'
            jimp.read(req.file.path, async (err, image) => {
                if (err) return res.render('extensions/jpgtojpeg', { error: true })
                let a = await image.write(outputpath)

                const imagename = outputpath.slice(8)
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            })

        })
    } catch (error) {
        res.render('extensions/jpgtojpeg')
    }
})

// PNG TO JPG
router.get('/tools/pngtojpg', (req, res) => {
    console.log('dsfs');
    res.render('extensions/pngtojpg', { error: false })
})

router.post('/pngtojpgupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/pngtojpg', { error: true }) }

            outputpath = 'uploads/' + Date.now() + 'result.jpg'
            jimp.read(req.file.path, async (err, image) => {
                if (err) return res.render('extensions/pngtojpg', { error: true })
                let a = await image.write(outputpath)

                const imagename = outputpath.slice(8)
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            })

        })
    } catch (error) {
        res.render('extensions/pngtojpg')
    }
})

// PNG TO JPG
router.get('/tools/pngtojpeg', (req, res) => {
    console.log('dsfs');
    res.render('extensions/pngtojpeg', { error: false })
})

router.post('/pngtojpegupload', async (req, res) => {
    try {
        // USING UPLOAD MIDDLEWARE
        upload(req, res, async (err) => {

            if (err) { return res.render('extensions/pngtojpeg', { error: true }) }

            outputpath = 'uploads/' + Date.now() + 'result.jpeg'
            jimp.read(req.file.path, async (err, image) => {
                if (err) return res.render('extensions/pngtojpeg', { error: true })
                let a = await image.write(outputpath)

                const imagename = outputpath.slice(8)
                 res.render('extensions/download', { outputpath: outputpath, imagename: imagename })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 5000);
            })

        })
    } catch (error) {
        res.render('extensions/pngtojpeg')
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