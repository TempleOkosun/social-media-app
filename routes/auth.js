const express = require('express');
const router = express.Router();

const {register, authorizeUser, logout, requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')

router.post("/register", register)
router.post('/login', authorizeUser);
router.get('/logout', logout);
router.get('/posts', requireSignin, (req, res) =>{
    res.json({
        posts:[{title:"First post"}, {title: "Second post"}]
    })
})

// Any route containing userId, our app will first execute this
router.param("userId", userById)

module.exports = router;