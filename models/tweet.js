// required imports
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const tweetSchema = new mongoose.Schema({
  body: {
    type: String,
    trim: true,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  tweetedBy: {
    type: ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

const tweetModel = mongoose.model('Tweet', tweetSchema)
module.exports = tweetModel
