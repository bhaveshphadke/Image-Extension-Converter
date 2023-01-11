// Setting Router
const express = require('express')
const router = express.Router()

// Impoorting Model
const User = require('../models/Users')

// Importing packages
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// SIGNUP
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    try {
        // Getting user data
        const { name, email, password } = req.body

        // Finding user already exist or not
        let user = await User.findOne({ email: email })
        if (user) {
            return res.send("Email is already in use.....")
        }

        // Hashing password
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);

        // Storing data
        user = await User.create({
            name: name,
            email: email,
            password: hash
        })

        res.redirect('/auth/login')
    } catch (error) {
        return res.send(`<h2>ERROR 404</h2>`)
    }
})

//LOGIN
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {


    try {
        // Getting user credentials
        const { email, password } = req.body

        // Finding user alredy exist or not 
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.redirect('/austh/signup')

        }

        // Verifying password
        let checkPass = await bcrypt.compare(password, user.password); // true
        if (!checkPass) {
            return res.redirect('/austh/signup')
        }

        // Storing user id to generate token
        let data = {
            user: {
                id: user.id
            }
        }

        // Generating token
        let token = jwt.sign(data, process.env.JWT_SECRETE);

        res.json({ data, token })
    } catch (error) {
        return res.send(`<h2>ERROR 404</h2>`)
    }

})

module.exports = router