const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;


//Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "..","public")))

/* const uri = process.env.ATLAS_URI;
mongoose.connect(uri,  {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
}); */

app.post('/email', (req,res) => {
    //TODO:
    //send email here
    console.log('Data:', req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fasihere@gmail.com',
            pass: process.env.PASS
        }
    })
    
    const mailOptions = {
        from: req.body.email,
        to:'fasihere@gmail.com',
        subject: `Message from ${req.body.email} in your Portfolio Website`,
        text: req.body.text
    }

    transporter.sendMail(mailOptions,function(err, data) {
        if(err){
            console.log('Oops! Some error in sending mail via transporter. ' + err)
        }
        else {
            console.log('Email sent: ' + data.response)
        }
    })
    res.json({message: 'Message received!'})
});

app.get('/',(req,res) => {
   res.sendFile(path.join(__dirname,'..','public','index.html'));
});

app.listen(PORT, () => console.log("Server running on ",PORT));
