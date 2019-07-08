require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5d22d6ecdbc6731ad6e02b34').then((task)=>{
//     console.log(task)
//     return Task.where({'completed': false}).countDocuments()

// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed : false})
    return count
}

deleteTaskAndCount('5d22f0983241742fdb38ddba').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})