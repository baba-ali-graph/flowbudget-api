"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var http = require('http');

var router = require('./router/router');

var dotenv = require('dotenv');

var logger = require('./logger/index');

dotenv.config();
var app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/", router);
var port = process.env.PORT || 3400;
server = http.createServer(app);
server.listen(port, function () {
  return logger.log("app started successfully on port ".concat(port));
});