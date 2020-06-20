"use strict";var express=require("express"),bodyParser=require("body-parser"),http=require("http"),router=require("./router/router"),dotenv=require("dotenv"),logger=require("./logger/index");dotenv.config();var app=new express;app.use(bodyParser.json()),app.use(bodyParser.urlencoded({extended:!0})),app.use("/",router);var port=process.env.PORT||3400;server=http.createServer(app),server.listen(port,function(){return logger.log("app started successfully on port ".concat(port))});