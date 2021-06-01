//express module
const express = require('express')
const path = require('path')
const api = require('./server/routes/api')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/weather-appDB', { useNewUrlParser: true })

const app = express()


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)

const port = 3001
app.listen(port, function () {
    console.log("server is listening on port " + port)
})

