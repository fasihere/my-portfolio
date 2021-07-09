"use strict";

var express = require('express');

var log = console.log;
var app = express();

var path = require('path');

var PORT = process.env.PORT || 8080; //Middleware

app.use(express.static('views'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.post('/email', function (req, res) {
  //TODO:
  //send email here
  log('Data:', req.body);
  res.json({
    message: 'Message received!'
  });
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.listen(PORT, function () {
  return log("Server running on ", PORT);
});