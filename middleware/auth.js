// required imports
const jwt = require('jsonwebtoken')
const { logout } = require('../controllers/auth')

exports.auth = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return res.status(401).json({ message: `You have to be logged in to access this resource` })
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false })
    // req.userId = decodedData?._id
    // if the token is valid, append the verified user's id to the request object in an auth property
    req.auth = decodedData._id

    next()
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      const msg = `Your token expired and you will be signed out.`
      await logout(req, res, next, msg)
    }
  }
}
