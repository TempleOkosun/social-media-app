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
    req.userId = decodedData._id
    next()
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      await logout(req, res)
    }
  }
}
