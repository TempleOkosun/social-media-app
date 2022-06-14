// required imports
const express = require('express')
const router = express.Router()

const { body } = require('express-validator')

const { auth } = require('../middleware/auth')
const { getTweet, getTweets, createTweet, tweetsByUser } = require('../controllers/tweet')
const { userById, hasAuthorization } = require('../controllers/user')

router.get('/tweet', getTweet)
router.get('/tweets', getTweets)
router.post(
  '/tweet/new/:userId',
  auth,
  hasAuthorization,
  createTweet,
  body('body', 'Write a tweet').notEmpty(),
  body('body', 'Tweet must be between 10 to 280 characters.').isLength({
    min: 10,
    max: 280,
  })
)
router.get('/tweets/by/:userId', auth, tweetsByUser)

// any route containing userId, our app will first execute userById
router.param('userId', userById)

module.exports = router
