"use strict";

var express = require('express');

var cors = require('cors');

var bodyParser = require('body-parser');

require('dotenv').config();

var mongoose = require('mongoose');

var nodemailer = require('nodemailer');

var app = express();

var path = require('path');

var PORT = process.env.PORT || 8080; //Middleware 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "..", "public")));
/* const uri = process.env.ATLAS_URI;
mongoose.connect(uri,  {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
}); */

app.post('/email', function (req, res) {
  //TODO:
  //send email here
  console.log('Data:', req.body);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fasihere@gmail.com',
      pass: process.env.PASS
    }
  });
  var mailOptions = {
    from: req.body.email,
    to: 'fasihere@gmail.com',
    subject: "Message from ".concat(req.body.email, " in your Portfolio Website"),
    text: req.body.text
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Oops! Some error in sending mail via transporter');
    } else {
      console.log('Email sent:' + data.response);
    }
  });
  res.json({
    message: 'Message received!'
  });
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.listen(PORT, function () {
  return console.log("Server running on ", PORT);
});