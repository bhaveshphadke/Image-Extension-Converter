const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact')

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.post('/contact', async (req, res) => {
    try{
    let success = false
    const { name, email, description } = req.body
    console.log(name);

    let userData = await Contact.create({
        name: name,
        email: email,
        description: description
    })
console.log(process.env.EMAIL_SECRETE);

    const transporter =await  nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'bhaveshphadke5256@gmail.com',
            pass:process.env.EMAIL_SECRETE
        }
    
    })
    const mailOptions={
        from:'bhaveshphadke5256@gmail.com',
        to:'bhaveshphadke6433@gmail.com',
        subject:`Hi, ${name}`,
        html:`<h4>Hello ${name}</h4><p>we are working on your email( ${description}).. Thanks for contacting us!</p>`
    }
    
  let a = await transporter.sendMail(mailOptions,(error,data)=>{
        if(error){
            console.log(error);
            // return false
            success = false
            return  res.render('contact',{ userData,success,name })


        }
        else{
        //    return true
        success = true
            console.log('email sent');
            return  res.render('contact',{ userData,success,name})
        }
        
    })

console.log(success);
// return  res.json({ userData })
} catch (error) {
    console.log(error);
    return res.send(`<h2>ERROR 404</h2>`)
}
   
})
module.exports = router