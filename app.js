const express = require('express')
const app = express()

const morgan = require('morgan')

// Import routes
const postRoutes = require('./routes/post')


// Middlewares
app.use(morgan("dev"))

// App route
app.use('/', postRoutes);

const port = 8000
app.listen(port, () => {
    console.log(`The API is listening on port: ${port}`)
})


