// required imports
const express = require('express')
const app = express()

const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

// import routes
const authRoutes = require('./routes/auth')
const tweetRoutes = require('./routes/tweet')
const userRoutes = require('./routes/user')
// api documentation
app.get('/api', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
        // error: `file err`,
      })
    }
    const docs = JSON.parse(data.toString())
    res.json(docs)
  })
})

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
// use imported app route as middleware
app.use('/api', authRoutes)
app.use('/api', tweetRoutes)
app.use('/api', userRoutes)

module.exports = app
