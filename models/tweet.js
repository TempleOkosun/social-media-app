// required imports
const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  tweet: {
    type: String,
    trim: true,
    required: true,
  },
})

const tweetModel = mongoose.model('Tweet', tweetSchema)
module.exports = tweetModel
