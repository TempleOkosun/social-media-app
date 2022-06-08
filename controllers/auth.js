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

        res.status(200).json({message:`Registration successful. Please login ${user['name']}`})

    }catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

exports.authorizeUser = async (req, res) => {
    // find the user based on the email
    const {email, password} = req.body

    try{
        const user = await  User.findOne({email})
        if(!user) return res.status(401).json({message: 'User does not exist!', })
        const savedPassword = user['password']
        const isAuthorized = await  bcrypt.compare(password, savedPassword)
        if(isAuthorized){
            const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_TIME})
            const {_id, name, email} = user
            res.cookie("t", token, {expire: new Date() + 9999, httpOnly:true})
            res.status(200).json({token, user: {_id, email,name}})

        } else{
            res.status(404).json({message:'Invalid credentials'})
        }

    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

exports.logout = (req, res) => {
    res.clearCookie("t")
    res.json({message: 'Signed out successfully'})
}


exports.requireSignin = async (req, res, next) => {
    const{token} = req.cookies
    if(!token){
        return res.status(401).json({message: `You have to be logged in to access this resource`})
    }
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded._id)

    next()
}