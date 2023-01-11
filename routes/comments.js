// Setting router
const express = require('express')
const router = express.Router()

// Importing Models 
const Comments = require('../models/Comments')
const User = require('../models/Users')

// importing express validator form validation of user input
const { body, validationResult } = require('express-validator');

// importing middleware to fetch user
const fetchuser = require('../middleware/fetchuser')

// Route to post comment
router.post('/comment', [

    body('comment').isLength({ min: 5 })
    
], fetchuser, async (req, res) => {
    try {
console.log(req.body.comment);
        // If any vallidation error 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ sent: false })
        }

        // default user
        let user = {
            name: "Guest"
        }

        if (req.user) {
            userId = req.user.id
            user = await User.findOne({ userId })

        }

        // Values to be upload
        const name = user.name
        const profile = name.charAt(0)
        const { comment } = req.body;

        // Saving data
        const commentData = await new Comments({ profile, name, comment })
        await commentData.save()

        res.json({ sent: true })

    } catch (error) {

        res.json({ sent: false })

    }

})

router.get('/allcomments', async (req, res) => {
    try {

        const comments = await Comments.find()
        res.json({
            comments
        })
    } catch (error) {
        res.status(500).json({"Error":"Internal server error"})
    }
})

module.exports = router