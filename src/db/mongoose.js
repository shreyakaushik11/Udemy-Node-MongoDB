const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/task-manager-api', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

//creating model


// const me = new User({
//     name : '   Andrew   ',
//     email : 'ANDREW@EXAMPLE.COM',
//     password : '123andrew  '
// })

//saving the model to the db

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })



// const task1 = new Task({ 
//     description : "   clean the house    ",
// })

// task1.save().then(()=>{
//     console.log(task1)
// }).catch((error)=>{
//     console.log(error)
// })
