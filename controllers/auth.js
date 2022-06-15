// required imports
const jwt = require('jsonwebtoken')
const { hash, compare } = require('../utils/password') // utility functions
const User = require('../models/user')
require('dotenv').config()

// controller for registration
exports.register = async (req, res) => {
  // extract the required fields from request body
  const { email, password, confirmPassword, name } = req.body

  try {
    // check if a user with the email already exists.
    const userExists = await User.findOne({ email })

    // if email is already taken
    if (userExists)
      // status 409: conflicts with current state, user can resolve & resubmit.
      return res.status(409).json({
        message: 'User already exists.',
      })

    // if passwords don't match
    if (password !== confirmPassword)
      // bad request
      return res.status(400).json({
        message: 'Passwords do not match!',
      })

    // hash password
    const hashedPassword = await hash(password)

    // save the user to database
    const user = await User.create({ email, password: hashedPassword, name })

    return res.status(200).json({ message: `Registration successful. Please login ${user.name}` })
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong', error: err })
  }
}

// checks if a user is who he/she claims to be & issue token if valid
exports.authorizeUser = async (req, res) => {
  // find the user based on the email
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    // not found
    if (!user) return res.status(404).json({ message: 'User does not exist!' })
    // if user exists get the stored hashed password
    const savedPassword = user.password
    // compare passwords
    const isAuthorized = await compare(password, savedPassword)
    // if passwords match, generate token and set cookie
    if (isAuthorized) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      })
      const { _id, name, email } = user
      // persist the token as 'token' in cookie with expiry date
      res.cookie('token', token, { expire: new Date() + 9999, httpOnly: true })
      return res.status(200).json({ token, user: { _id, email, name } })
    } else {
      // not authorized
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    // any other error
    return res.status(500).json({ message: 'Something went wrong', error: err })
  }
}

// logout and end session
// accepts msg as info. to be displayed when logout is called by other functions
exports.logout = async (req, res, next, msg = '') => {
  res.clearCookie('token')
  // if msg is not empty then use msg else normal response
  const displayMsg = msg ? msg : `Signed out successfully`
  return res.status(200).json({
    message: displayMsg,
  })
}
