const express = require('express')
const multer = require('multer')
const { exec } = require('child_process')
const router = express.Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const Downloads = require('../models/Downloads')
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
    try {
        if (req.file) {
            // Grabing data
            const to = req.body.format

            fs.stat(req.file.path, (err, data) => {
                let size = (data.size / (1024000)).toString()
                if (size > 10) {
                    console.log(size.split('.')[0]);
                    return res.status(400).send("File size ecceded its limit --> " + size.split('.')[0] + "mb")
                }
            })

            // Setting output path 
            let outputpath = 'static/uploads/' + Date.now() + `output.${to}`
            let outsubstring = outputpath.split("static/")
            console.log(outsubstring[1]);
            // Main code to convert videos extensions 
            exec(`ffmpeg -i ${req.file.path} ${outputpath}`, (error, stdout, stderr) => {
                if (error) {
                    return;
                }
                else {
                    const videoname = outputpath.slice(8)
                    return res.render('videos/download', { outputpath: outsubstring[1], videoname: videoname })
                }
            })
        }
    } catch (error) {
        return res.status.json({ "ERROR": "Internal Server Error" })
    }
})

// TO DOWNLOAD
router.get('/video/download', async (req, res) => {
    try {
        const ipath = req.query.video
        const token = req.query.token
        if (token) {
            const data = await jwt.verify(token, JWT_SECRETE)
            // clog
            const user = await User.findById(data.user.id)
            if (user) {
                let result = new Downloads({
                    user: user.name,
                    id: user._id,
                    videopath: ipath
                })
                result.save()
            }
        }
        console.log(token);
        // console.log('videos');
        const videopath = 'static/' + req.query.video
        res.download(videopath)
    } catch (error) {
        res.render('videos/download')
    }
})

module.exports = router