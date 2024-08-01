const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profilepic : {
        type : String,
        defalut : ""
    },
    followers  : {
        type : [String],
        defalut : []
    },
    following  : {
        type : [String],
        defalut : []
    },
    address : {
        type : String,
        defalut: ""
    },
    bio  :{
        type : String,
        default : ""
    },
    token : {
        type : String,
        required : false,
        default : ""
    }
}, { timestamps : true})

const UserSchema = new mongoose.model('user', userSchema)

module.exports = UserSchema