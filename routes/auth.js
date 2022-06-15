const express = require('express')
const router = express.Router()

const { auth } = require('../middleware/auth')
const { register, authorizeUser, logout } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/register', register)
router.post('/login', authorizeUser)
router.get('/logout', auth, logout) // require auth to logout

// When there is a particular action - say update info required by a user
//The url should look like: http://localhost:8000/profile/userid9765545
// we can use router.param to process incoming request with userid
// based on the userid, the backend will query database for the user infos &
// the user info will be added to the request object: req.profile= userInfo
// the update can then be allowed if the user is logged in
// any route containing userId, our app will first execute userById
router.param('userId', userById)

module.exports = router
