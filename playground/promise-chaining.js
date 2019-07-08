require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5d22d5ee6dda2219d104ce7f', {age : 1}).then((user)=>{
    console.log(user)
    return User.countDocuments({ age : 1})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})