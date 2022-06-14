// required imports
const { validationResult } = require('express-validator')
const Tweet = require('../models/tweet')
const formidable = require('formidable')
const fs = require('fs')

// returns the most recent tweet
exports.getTweet = async (req, res) => {
  Tweet.find()
    .sort({ _id: -1 })
    .limit(1)
    .select('_id body')
    .then((tweets) => {
      return res.status(200).json({ tweets })
    })
    .catch((err) => console.log(err))
}

// returns all tweets
exports.getTweets = async (req, res) => {
  Tweet.find()
    .select('_id body')
    .then((tweets) => {
      return res.status(200).json({ tweets })
    })
    .catch((err) => console.log(err))
}

exports.createTweet = async (req, res) => {
  // using middleware - commented out, code is more readable with validators on route
  // apply createTweetValidator middleware
  // await createTweetValidator(req, res)
  // save validated tweet to database
  // const tweet = new Tweet(req.body)
  // tweet.save((err, result) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: err,
  //     })
  //   }
  //   res.status(200).json({
  //     tweet: result,
  //   })
  // })

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: `Image could not be uploaded`,
      })
    }
    // we set tweet body to fields parsed by formidable
    const tweet = new Tweet(fields)
    // We add the user who posted the tweet
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

  // save validated tweet to database
  //const tweet = new Tweet(req.body)
  // tweet.save((err, result) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: err,
  //     })
  //   }
  //   res.status(200).json({
  //     tweet: result,
  //   })
  // })
}
