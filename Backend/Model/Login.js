const mongoose = require('mongoose')

// const Schema = mongoose.Schema

const Login = mongoose.Schema({
    role:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('LoginData',Login)