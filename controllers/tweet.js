// required imports
const { validationResult } = require('express-validator')
const Tweet = require('../models/tweet')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

// returns a tweet by the tweetId
exports.tweetById = async (req, res, next, id) => {
  Tweet.findById(id)
    // populate allows us to bring in fields from another model
    .populate('tweetedBy', '_id name')
    .exec((err, tweet) => {
      if (err || !tweet) {
        return res.status(400).json({
          error: err,
        })
      }
      // at this point, no errors so:
      // make tweet profile available in the request object
      // add new property tweet to the request object
      req.tweet = tweet
      // proceed to the next middleware
      next()
    })
}

// returns the most recent tweet
exports.getTweet = async (req, res) => {
  Tweet.find()
    .sort({ _id: -1 })
    .limit(1)
    .populate('tweetedBy', '_id name')
    .select('_id body')
    .then((tweet) => {
      return res.status(200).json({ tweet })
    })
    .catch((err) => console.log(err))
}

// returns all tweets
exports.getTweets = async (req, res) => {
  Tweet.find()
    .populate('tweetedBy', '_id name')
    .select('_id body')
    .then((tweets) => {
      return res.status(200).json({ tweets })
    })
    .catch((err) => console.log(err))
}

// create a new tweet
exports.createTweet = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // use formidable to parse form & handle file uploads
  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: `Image could not be uploaded`,
        error: err,
      })
    }
    // we set tweet body to fields parsed by formidable
    const tweet = new Tweet(fields)
    // We add the user who posted the tweet
    // current user is present in req.profile
    tweet.tweetedBy = req.profile
    if (files.photo) {
      tweet.photo.data = fs.readFileSync(files.photo.path)
      tweet.photo.contentType = files.photo.type
    }
    // save tweet to database
    tweet.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        })
      }
      res.status(200).json({
        tweet: result,
      })
    })
  })
}

// get tweets from a user
exports.tweetsByUser = async (req, res) => {
  Tweet.find({ tweetedBy: req.profile._id })
    .populate('tweetedBy', '_id name')
    .sort('created')
    .exec((err, tweets) => {
      if (err) {
        return res.status(400).json({
          error: err,
        })
      }
      return res.status(200).json(tweets)
    })
}

// verify if user is logged in and authorized
exports.isTweeter = async (req, res, next) => {
  const isPoster = req.tweet && req.auth && req.tweet.tweetedBy._id == req.auth
  if (!isPoster) {
    return res.status(403).json({
      error: 'User is not authorized',
    })
  }
  // proceed to the next middleware it isPoster = true
  next()
}

// delete a tweet
exports.deleteTweet = async (req, res) => {
  const query = {
    _id: req.tweet._id,
  }
  Tweet.deleteOne(query, (err, result) => {
    if (err) {
      return res.status(400).json({
        err: err,
      })
    }
    // delete was successful at this point
    return res.status(200).json({
      message: `tweet successfully deleted`,
      result: result,
    })
  })
}

// TODO: tweet should be updated via formidable in case there is photo to add
exports.updateTweet = async (req, res) => {
  const current_tweet = req.tweet
  // tweet will be updated based on the request body
  const updated_tweet = _.extend(current_tweet, req.body) // will mutate the source object current_user_details with req.body
  // we can also add the tweet updated field at this point
  updated_tweet.updated = Date.now()
  // save updated tweet to database
  const query = {
    _id: req.tweet._id,
  }

  Tweet.updateOne(query, updated_tweet, (err, result) => {
    if (err) {
      return res.status(400).json({
        err: err,
      })
    } else {
      // update was successful at this point
      return res.status(200).json({
        message: `tweet successfully updated`,
        result: result,
      })
    }
  })
}
