// crud operations
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
 //to connect to db
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const id = new ObjectID() //new is optional
console.log(id)
console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1/27018'
const databaseName = 'task-manager' 
MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
    if(error){
        return console.log("Unable to connect to database")
    }
    
    const db = client.db(databaseName)

    //Inserting one document in collection
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 26
    // }, (error, result)=>{
    //     if(error){
    //         return console.log("Unable to insert user")
    //     }
    //     console.log(result.ops) //ops give array
    // }
    // )

    //Inserting many documents in collection

    // db.collection('users').insertMany([{
    //     name: 'Monica',
    //     age: 29
    // },
    // {
    //     name: 'Rachel',
    //     age: 30
    // }], (error, result)=>{
    //     if(error){
    //         return console.log("Unable to insert documents")
    //     }
    //     console.log(result.ops) //ops give array
    // })

//     db.collection('tasks').insertMany([{
//         description: 'wash clothes',
//         completed: false
//     },
//     {
//         description: 'work 8 hours',
//         completed: false
//     }, 
//     {
//         description: 'bring medicine',
//         completed: true
// }
// ], (error, result)=>{
//     if(error){
//         return console.log("Unable to insert documents")
//     }
//     console.log(result.ops)
// })


//finding in document
    db.collection('users').findOne({name: 'Monica'}, (error, userDetails)=>{
        if(error){
            return console.log("Unable to fetch")
        }
        console.log(userDetails)
    })

    db.collection('users').findOne({_id: new ObjectID("5d1f12b83c5d9e15c5c10953")}, (error, userDetails)=>{
        if(error){
            return console.log("Unable to fetch")
        }
        console.log(userDetails)
    })

    db.collection('users').find({age:25}).toArray((error, user)=>{
        console.log(user)
    })

    //count the fields
    db.collection('users').find({age:25}).count((error, count)=>{
        console.log(count)
    })

    db.collection('tasks').findOne({_id: new ObjectID("5d1f0cac42998e12817caee6")}, (error, taskDetails)=>{
        if(error){
            return console.log("Unable to fetch data")
        }
        console.log(taskDetails)
    })
    
    db.collection('tasks').find({completed: false}).toArray((error, taskDetails)=>{
        console.log(taskDetails)
    })
    
    //update document using promises

    db.collection('users').updateOne({
        _id: new ObjectID("5d1efea5adc2c84d00d5b5fe")
    },
    {
        $set: {
            name : 'Mike'
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    //update tasks which are incomplete
    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    //delete documents which have age 25

    db.collection('users').deleteMany({
        age: 25
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    //delete a task

    db.collection('tasks').deleteOne({
        description : "work 8 hours"
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})