// required imports
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const tweetSchema = new mongoose.Schema({
  body: {
    type: String,
    trim: true,
    required: true,
  },
  tweetedBy: {
    type: ObjectId,
    ref: 'User',
  },
})

const tweetModel = mongoose.model('Tweet', tweetSchema)
module.exports = tweetModel
