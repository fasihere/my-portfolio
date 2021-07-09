"use strict";

var express = require('express');

var cors = require('cors');

var bodyParser = require('body-parser');

require('dotenv').config();

var mongoose = require('mongoose');

var nodemailer = require('nodemailer');

var _require = require('googleapis'),
    google = _require.google;

var app = express();

var path = require('path');

var PORT = process.env.PORT || 8080;
var CLIENT_ID = '6774359123-dj8havvuj5vl5mehte9ldk7s086ocdpo.apps.googleusercontent.com';
var CLIENT_SECRET = '92lAVzE3J1SAuMtma_xGXugk';
var REDIRECT_URI = 'https://developers.google.com/oauthplayground';
var REFRESH_TOKEN = '1//043og_jeIu4UvCgYIARAAGAQSNwF-L9Ir86phMIrGle4nD_yIQ0RmBmKU40I9jHuNn7l8sBg6pqjXmy_8EPLQqrfTI-tMxePE5BY';
var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
}); //Middleware 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "..", "public")));

function sendMail(req) {
  var accessToken, transport, mailOptions, result;
  return regeneratorRuntime.async(function sendMail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(oAuth2Client.getAccessToken());

        case 3:
          accessToken = _context.sent;
          transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'fasihere@gmail.com',
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken
            }
          });
          mailOptions = {
            from: req.body.email,
            to: 'fasihere@gmail.com',
            subject: "Message from ".concat(req.body.email, " in your Portfolio Website"),
            text: req.body.text
          };
          _context.next = 8;
          return regeneratorRuntime.awrap(transport.sendMail(mailOptions));

        case 8:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

app.post('/email', function (req, res) {
  //TODO:
  //send email here
  console.log('Data:', req.body);
  sendMail(req).then(function (result) {
    return console.log('Email sent: ', result);
  }).catch(function (error) {
    return error;
  });
});
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

app.use(function (err, req, res, next) {
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
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, function () {
  return console.log("Server running on ", PORT);
});