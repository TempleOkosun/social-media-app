const mongodb = require('./utils/db')
const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

// Import routes
const authRoutes = require('./routes/auth')

// db
mongodb.connect(process.env.MONGO_URI)

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
// use imported app route as middleware
app.use('/api', authRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`The API is listening on port: ${port}`)
})
