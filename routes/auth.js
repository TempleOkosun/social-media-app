const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')
const { register, authorizeUser, logout } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/register', register)
router.post('/login', authorizeUser)
router.get('/logout', auth, logout)
router.get('/posts', auth, (req, res) => {
  res.json({
    posts: [{ title: 'First post' }, { title: 'Second post' }],
  })
})

// Any route containing userId, our app will first execute this
router.param('userId', userById)

module.exports = router
