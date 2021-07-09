const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;

const CLIENT_ID = '6774359123-dj8havvuj5vl5mehte9ldk7s086ocdpo.apps.googleusercontent.com';
const CLIENT_SECRET = '92lAVzE3J1SAuMtma_xGXugk';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//043og_jeIu4UvCgYIARAAGAQSNwF-L9Ir86phMIrGle4nD_yIQ0RmBmKU40I9jHuNn7l8sBg6pqjXmy_8EPLQqrfTI-tMxePE5BY';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN})

//Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "..","public")))
async function sendMail(req){
    try{
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                type: 'OAuth2',
                user: 'fasihere@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        const mailOptions = {
            from: req.body.email,
            to:'fasihere@gmail.com',
            subject: `Message from ${req.body.email} in your Portfolio Website`,
            text: req.body.text
        };
        const result = await transport.sendMail(mailOptions)
        return result
    }
    catch(error){
        return(error);
    }
}
app.post('/email', (req,res) => {
    //TODO:
    //send email here
    console.log('Data:', req.body)
    sendMail(req).then(result=> console.log('Email sent: ',result))
    .catch((error) => {
        return error;
    })
})

/* const uri = process.env.ATLAS_URI;
mongoose.connect(uri,  {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
}); */
/*
app.post('/email', (req,res) => {
    //TODO:
    //send email here
    console.log('Data:', req.body)

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'fasihere@gmail.com',
            serviceClient: '113600000000000000000',
            privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...',
            accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
            expires: 1484314697598
        }
    }); 
    
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
*/
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      /*
       if we're in development mode, include stack trace (full error object)
       otherwise, it's an empty object so the user doesn't see all of that
      */
      error: app.get("env") === "development" ? err : {}
    });
  });

app.get('/',(req,res) => {
   res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(PORT, () => console.log("Server running on ",PORT));
