// required imports
const { validationResult } = require('express-validator')
const Tweet = require('../models/tweet')

exports.getTweet = async (req, res) => {
  res.status(200).json({
    tweets: { title: 'First' },
  })
}

exports.getTweets = async (req, res) => {
  res.status(200).json({
    tweets: [{ title: 'First' }, { title: 'Second' }],
  })
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

  // save validated tweet to database
  const tweet = new Tweet(req.body)
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
}
