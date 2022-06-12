// // required imports
// const { body, validationResult } = require('express-validator')
//
// exports.createTweetValidator = async (req, res, next) => {
//   body('tweet', 'Write a tweet').notEmpty()
//   body('tweet', 'tweet must be between 10 to 280 characters.').isLength({
//     min: 10,
//     max: 280,
//   })
//   // Finds the validation errors in this request and wraps them in an object with handy functions
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
//
//   // move to the next middleware
//   next()
// }
