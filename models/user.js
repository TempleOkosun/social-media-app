const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

// virtual field
// userSchema.virtual('password')
//     .set(function(password){
//         this._password = password
//         this.salt = uuidv1()
//         this.hashed_password = this.encryptPassword(password)
//     })
//
//
//
// // method


const userModel = mongoose.model('User', userSchema)
module.exports = userModel