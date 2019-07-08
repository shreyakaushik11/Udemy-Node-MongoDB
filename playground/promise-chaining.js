require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5d22d5ee6dda2219d104ce7f', {age : 1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({ age : 1})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

//using async and await


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5d22d5ee6dda2219d104ce7f', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})