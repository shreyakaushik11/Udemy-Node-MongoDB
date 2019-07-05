const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1/task-manager-api', {
    useCreateIndex: true,
    useNewUrlParser: true
})

//creating model

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
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    }
})

const me = new User({
    name : '   Andrew   ',
    email : 'ANDREW@EXAMPLE.COM'
})

//saving the model to the db

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log(error)
})

const Task = mongoose.model('Task', {
    description : {
        type: String
    },
    completed: {
        type : Boolean
    }
})

const task1 = new Task({ 
    description : "clean the house",
    completed : true
})

// task1.save().then(()=>{
//     console.log(task1)
// }).catch((error)=>{
//     console.log(error)
// })
