// required imports
const User = require('../models/user')

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      })
    }
    // add new property profile to the request object
    const { name, email, _id } = user
    req.profile = { name, email, _id }
    next()
  })
}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id
  if (!authorized) {
    res.status(403).json({
      error: 'User is not authorized',
    })
  }
  next()
}

exports.allUsers = async (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      })
    }
    res.json({ users })
  }).select('_id name email created updated')
}

exports.getUser = async (req, res) => {
  return res.json(req.profile)
}
