// required imports
const _ = require('lodash')
const User = require('../models/user')
const { logout } = require('./auth')

exports.userById = async (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      })
    }
    // user was found at this point
    // add new property profile to the request object
    const { name, email, _id } = user
    req.profile = { name, email, _id }
    next()
  })
}

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth
  if (!authorized) {
    return res.status(403).json({
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

// since any route having userId will first run userById
// then the required user's info will be added to the req.profile
exports.getUser = async (req, res) => {
  return res.json(req.profile)
}

exports.updateUser = async (req, res) => {
  const current_user_details = req.profile
  // user will be updated based on the request body
  const updated_user_details = _.extend(current_user_details, req.body) // will mutate the source object current_user_details with req.body
  // we can also add the user updated field at this point
  updated_user_details.updated = Date.now()
  // save updated user to database
  const query = {
    _id: req.profile._id,
  }
  // pls note we do not want password to be update like this
  // TODO: password updating logic
  User.updateOne(query, updated_user_details, (err, result) => {
    if (err) {
      return res.status(400).json({
        err: err,
      })
    } else {
      // update was successful at this point
      return res.status(200).json({
        message: `user successfully updated`,
        result: result,
      })
    }
  })
}

exports.deleteUser = async (req, res, next) => {
  const query = {
    _id: req.profile._id,
  }
  User.deleteOne(query, (err, result) => {
    if (err) {
      return res.status(400).json({
        err: err,
      })
    } else {
      // delete was successful at this point
      const msg = {
        message: `user successfully deleted and session ended.`,
        result: result,
      }
      logout(req, res, next, msg)
    }
  })
}
