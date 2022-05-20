const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// SIGNUP
router.get('/signup', (req, res) => {
    res.render('signup')
    console.log(process.env.JWT_SECRETE);
})

router.post('/signup', async (req, res) => {
    try {
        console.log('1');
        const { name, email, password } = req.body

        console.log('2');
        let user = await User.findOne({ email: email })

        console.log('3');
        if (user) {
            return res.send("Email is already in use.....")
        }
console.log('12');
        var salt = await bcrypt.genSaltSync(10);
        var hash = await bcrypt.hashSync(password, salt);
        console.log('4');

        user = await User.create({
            name: name,
            email: email,
            password: hash
        })
        console.log('5');

        res.redirect('/auth/login')
    } catch (error) {
        console.log(error);
        return res.send(`<h2>ERROR 404</h2>`)
    }
})

//LOGIN
router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {


    try {
        console.log('1');
        let isLoggedIn = false
        const { email, password } = req.body
        console.log('2');

        let user = await User.findOne({ email: email })
        console.log('3');

        if (!user) {
            return res.redirect('/austh/signup')

        }

        console.log('4');

        let checkPass = await bcrypt.compare(password, user.password); // true
        console.log(checkPass);
        if (!checkPass) {
            return res.redirect('/austh/signup')

        }
        console.log('5');

        let data = {
            user: {
                id: user.id
            }
        }
        console.log('6');

        isLoggedIn = true

        console.log(data);
        console.log('7');

        var token = jwt.sign(data, process.env.JWT_SECRETE);
        console.log(token);
        console.log('8');

        res.json({ data, isLoggedIn })
    } catch (error) {
        console.log(error);
        return res.send(`<h2>ERROR 404</h2>`)
    }

})

module.exports = router