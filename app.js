const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

// Import routes
const authRoutes = require('./routes/auth')


// Middlewares
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(cookieParser())
// Used imported App route as middleware
app.use('/api', authRoutes);




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


