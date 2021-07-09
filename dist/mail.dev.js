"use strict";

var nodemailer = require('nodemailer');

var mailGun = require('nodemailer-mailgun-transport');

var auth = {
  auth: {
    apiKey: '',
    domain: ''
  }
};
var transporter = nodemailer.createTransport(mailGun(auth));
var mailOptions = {
  from: 'ed18b012@smail.iitm.com',
  to: 'fasihere@gmail.com',
  subject: 'Message from personal website',
  text: 'I would like to get in touch with you'
};
transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log('Oops! Some error in sending mail via transporter');
  } else console.log('Email message sent!');
});