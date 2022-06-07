const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const User = require("../models/user")

exports.register = async (req, res) =>{
    const {email, password, confirmPassword, name} = req.body

    try{
        const userExists = await User.findOne({email})

        if(userExists) return res.status(400).json({
            message: "User already exists."
        })

        if(password !== confirmPassword) res.status(400).json({
            message: "Passwords do not match!"
        })

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({email, password:hashedPassword, name})
        const token = jwt.sign({email, id:user._id},process.env.JWT_SECRET, "test", {expiresIn: "1h"})

        res.status(200).json({message:`Registration successful. Please login `, token})

    }catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

exports.authorizeUser = async (req, res) => {
    // find the user based on the email
    const {email, password} = req.body
    const userData = await  User.findOne({email})
    const savedPassword = userData['password']
    const isAuthorized = await  bcrypt.compare(password, savedPassword)
    return {isAuthorized, userId: userData._id}
}