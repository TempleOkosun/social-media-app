const express = require('express')
const router = express.Router()

const { userById, allUsers, getUser, updateUser, hasAuthorization } = require('../controllers/user')
const { auth } = require('../middleware/auth')

router.get('/users', allUsers)
router.get('/user/:userId', auth, getUser)
// we can use the same route but put http verb since it is updating
router.put('/user/:userId', auth, hasAuthorization, updateUser)

// When there is a particular action - say update info required by a user
//The url should look like: http://localhost:8000/profile/userid9765545
// we can user router.param to process incoming request with userid
// based on the userid, the backend will query database for the user infos & it will be loaded
// the user info will be added to the request object: req.profile= userInfo
// the update can then be allowed if the user is logged in
// any route containing userId, our app will first execute userById
router.param('userId', userById)

module.exports = router
