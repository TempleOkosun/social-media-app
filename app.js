// required imports
const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

// import routes
const authRoutes = require('./routes/auth')

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
// use imported app route as middleware
app.use('/api', authRoutes)

module.exports = app
