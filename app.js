const express = require('express')
const app = express()

const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

// Import routes
const postRoutes = require('./routes/post')


// Middlewares
app.use(morgan("dev"))

// App route
app.use('/', postRoutes);


// db
const mongoose = require('mongoose')
const mongoURL = process.env.MONGO_URI
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
const connection = mongoose.connection
connection.on('error', console.error.bind(console, 'connection error:'))
connection.on('connected', function () {
    console.log('MongoDB Connection Successful.')
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`The API is listening on port: ${port}`)
})


