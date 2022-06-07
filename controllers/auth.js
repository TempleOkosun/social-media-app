const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require("../models/user")

exports.register = async (req, res) =>{
    const userExists = await User.findOne({email: req.body.email})

    if(userExists) return res.status(403).json({
        error: "A user with the email already exists."
    })

    const user = await new User(req.body)
    await user.save()
    res.status(200).json({message:`Registration successful. Please login `})

}

exports.authorizeUser = async (req, res) => {
    // find the user based on the email
    const {email, password} = req.body
    // User.findOne({email}, (err, user) => {
    //     // if error or no user
    //     if(err || !user){
    //         return res.status(401).json({
    //             error: `User with that email does not exist.`
    //         })
    //     }
    //     // if user found, authenticate
    //
    // })

    const userData = await  User.findOne({email})

    const savedPassword = userData['password']
    console.log(savedPassword)
    res.status(200).json({message: `login successful`})
    const isAuthorized = await compare(password, savedPassword)
    return isAuthorized










    // generate a token with user id and secret

    // persist the token as 't' in cookie with expiry date
}