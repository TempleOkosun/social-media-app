// required imports
const _ = require('lodash')
const User = require('../models/user')
const Tweet = require('../models/tweet')

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
  const authorized = req.profile && req.auth && req.profile._id == req.auth
  console.log(`Here is authorized : ${authorized}`)
  console.log(` Here is req.profile ${req.profile}`)
  console.log(` Here is req.auth ${req.auth}`)
  console.log(` Here is req.profile._id ${req.profile._id}`)
  console.log(` Here is req.profile && req.auth ${req.profile._id == req.auth}`)

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

exports.updateUser = async (req, res, next) => {
  const current_user_details = req.profile
  console.log(current_user_details)
  // user will be updated based on the request body
  const updated_user_details = _.extend(current_user_details, req.body) // will mutate the source object current_user_details with req.body
  // we can also add the user updated field at this point
  updated_user_details.updated = Date.now()
  console.log(updated_user_details)
  // save updated user to database
  const user = new User(updated_user_details)
  user.save((err) => {
    if (err) {
      return res.status(400).json({
        // error: `You are not authorized to perform this action`,
        error: err,
      })
    }
    res.json({ user })
  })
}
