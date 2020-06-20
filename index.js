const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const router = require('./router/router')
const dotenv = require('dotenv')
const logger = require('./logger/index')
dotenv.config()

const app = new express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/", router)

const port = process.env.PORT || 3400

server = http.createServer(app)

server.listen(port, ()=> logger.log(`app started successfully on port ${port}`))