// Setting router
const express = require('express')
const router = express.Router()

// Importing packages
const nodemailer = require('nodemailer');

// Importing Models
const Contact = require('../models/Contact')



router.post('/contact', async (req, res) => {
    try {


        let success = false
        // Storing user data in variables
        const { name, email, description } = req.body

        // Storing data in the database
        let userData = await Contact.create({
            name: name,
            email: email,
            description: description
        })

        // Creating transport using nodemailer
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bhaveshphadke30@gmail.com',
                pass: process.env.EMAIL_SECRETE
            }

        })

        // Mail data
        // //To User
        // const mailOptionsToUser = {
        //     from: 'bhaveshphadke30@gmail.com',
        //     to: email,
        //     subject: `Your Query --> ${description}`,
        //     html: `<p>Welcome ${name} on this app. </p>
            
        //     <p>My Email Address --> bhaveshphadke30@gmail.com</p>
        //     <p>Whatsapp no. --> +91 9152569289</p>
        //     <p>Contact me using above data. Thanks.😊</p>`
        // }

        //To Me
        const mailOptionsToMe = {
            from: 'bhaveshphadke30@gmail.com',
            to: email,
            subject: `${name}`,
            html: `<p>Hi, I am Bhavesh Phadke!! </p>
            <p>My details</p>
            <p>My Email Address --> bhaveshphadke30@gmail.com</p>
            <p>My Contact No. --> +91 9152569289</p>

            <p>Your Message --> Your Message "${description}"</p>
            `
        }
        // Now sending email
        await transporter.sendMail(mailOptionsToMe, (error, data) => {
            if (error) {
                success = false
                return res.json({ userData, success, name })
            }
            else {
                success = true
                return res.json({ userData, success, name })
            }
        })


    } catch (error) {
        return res.send(`<h2>ERROR 404</h2>`)
    }

})
module.exports = router