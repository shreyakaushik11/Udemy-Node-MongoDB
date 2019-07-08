const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name : {
        type : String,
        trim : true,
        required : true // validating
    },
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value<0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    email : {
        type : String,
        required: true,
        lowercase : true,
        trim : true, //sanitizing
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 7,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password cannot contain 'password' ")
            }        
    }
}
}
)

module.exports = User