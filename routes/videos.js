const express = require('express')
const multer = require('multer')
const { exec } = require('child_process')
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
const upload = multer({ storage: storage })





// All Get Requests
router.get('/tools/tomp4', (req, res) => {
    res.render('videos/tomp4', { error: false })
})
router.get('/tools/towebm', (req, res) => {
    res.render('videos/towebm', { error: false })
})
router.get('/tools/toavi', (req, res) => {
    res.render('videos/toavi', { error: false })
})
router.get('/tools/tompeg', (req, res) => {
    res.render('videos/tompeg', { error: false })
})
router.get('/tools/tomov', (req, res) => {
    res.render('videos/tomov', { error: false })
})
router.get('/tools/tomkv', (req, res) => {
    res.render('videos/tomkv', { error: false })
})
router.get('/tools/toflv', (req, res) => {
    res.render('videos/toflv', { error: false })
})

// Common Post API
router.post('/upload', upload.single('video'), (req, res, next) => {
    if (req.file) {
        // console.log(req.file.path)
        const to = req.body.format
        console.log(to);
        var outputpath = 'uploads/' + Date.now() + `output.${to}`

        exec(`ffmpeg -i ${req.file.path} ${outputpath}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            else {
                console.log("file is converted")
                const videoname = outputpath.slice(8)

                res.render('videos/download', { outputpath: outputpath, videoname: videoname })
                setTimeout(() => {
                    fs.unlinkSync(req.file.path)
                    fs.unlinkSync(outputpath)
                }, 43200000);

            }
        })
    }
})

// TO DOWNLOAD
router.get('/download', (req, res) => {
    try {
        const ipath = req.query.video
        console.log(path.join(__dirname, ipath));
        console.log('fgssdfdasdasd');
        res.download(ipath)
    } catch (error) {
        res.render('videos/download')
    }
})

module.exports = router