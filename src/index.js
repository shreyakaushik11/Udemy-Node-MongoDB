const express = require('express')
const app = express()
const port = process.env.PORT || 3000 //to setup on heroku
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const router = express.Router()
app.use(router)

app.use(express.json()) //parse json to object

app.post('/users', (req, res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e) //send the status code
        // res.send(e)
    })
})

//read users

app.get('/users', (req, res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//read a single user

app.get('/users/:id', (req, res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//read tasks

app.get('/tasks', (req, res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

//read a task

app.get('/tasks/:id', (req, res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.post('/tasks', (req, res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.patch('/users/:id', (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send()
    }
    const _id = req.params.id
    User.findByIdAndUpdate(_id, req.body, {new : true, runValidators: true}).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.patch('/tasks/:id', (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send()
    }
    const _id = req.params.id
    Task.findByIdAndUpdate(_id, req.body, {new : true, runValidators: true}).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.delete('/users/:id', (req, res)=>{
    const _id = req.params.id
    User.findByIdAndDelete(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.delete('/tasks/:id', (req, res)=>{
    const _id = req.params.id
    Task.findByIdAndDelete(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port "+port)
})