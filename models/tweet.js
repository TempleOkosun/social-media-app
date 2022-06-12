// required imports
const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  body: {
    type: String,
    trim: true,
    required: true,
  },
})

const tweetModel = mongoose.model('Tweet', tweetSchema)
module.exports = tweetModel
