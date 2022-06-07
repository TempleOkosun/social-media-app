const express = require('express');
const router = express.Router();

const {register, authorizeUser} = require('../controllers/auth')

router.post("/register", register)
router.post('/login', authorizeUser);

module.exports = router;