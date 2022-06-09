const mongoose = require('mongoose')

exports.connect = (uri) => {
  // mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  // const connection = mongoose.connection
  // connection.on('error', console.error.bind(console, 'connection error:'))
  // connection.on('connected', function () {
  //   console.log('MongoDB Connection Successful.')
  // })
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
