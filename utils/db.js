const mongoose = require('mongoose')

exports.connect = (uri) => {
  const mongoURL = uri
  mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
  const connection = mongoose.connection
  connection.on('error', console.error.bind(console, 'connection error:'))
  connection.on('connected', function () {
    console.log('MongoDB Connection Successful.')
  })
}
