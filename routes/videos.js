const express = require('express')
const multer = require('multer')
const { exec } = require('child_process')
const fs = require('fs')
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




// MP4 TO MP3
router.get('/tools/mp4tomp3', (req, res) => {
    res.render('videos/mp4tomp3', { error: false })
})

router.post('/mp4tomp3upload', upload.single('video'), (req, res, next) => {
    if (req.file) {
        // console.log(req.file.path)

        var outputpath = 'uploads/' + Date.now() + "output.mp3"

        exec(`ffmpeg -i ${req.file.path} ${outputpath}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            else {
                console.log("file is converted")
                const videoname = outputpath.slice(8)

                res.render('videos/download', { outputpath: outputpath, videoname: videoname })
                fs.unlinkSync(req.file.path)

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


