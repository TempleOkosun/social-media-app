// required imports
const express = require('express')
const router = express.Router()

const { body } = require('express-validator')

const { auth } = require('../middleware/auth')
const { getTweet, getTweets, createTweet } = require('../controllers/tweet')

router.get('/tweet', getTweet)
router.get('/tweets', getTweets)
router.post(
  '/create-tweet',
  body('body', 'Write a tweet').notEmpty(),
  body('body', 'Tweet must be between 10 to 280 characters.').isLength({
    min: 10,
    max: 280,
  }),
  createTweet
)

module.exports = router
