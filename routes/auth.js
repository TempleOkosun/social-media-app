const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')
const { register, authorizeUser, logout } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', authorizeUser)
router.get('/logout', auth, logout) // require auth to logout

module.exports = router
