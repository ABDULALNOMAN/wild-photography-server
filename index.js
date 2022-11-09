const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.USER_PASSWORD}@cluster0.sk6nr80.mongodb.net/?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
    try {
        const wildCollection = client.db('traver').collection('tourist-services')
        const userReviews = client.db('wildData').collection('reviewItem')

        app.get('/products', async(req, res) => {
            const result = await wildCollection.find({}).limit(3).toArray()
            res.send(result)
        })
        app.get('/services', async(req, res) => {
            const result = await wildCollection.find({}).toArray()
            res.send(result)
        })
        app.get('/services/:id', async(req, res) => {
            const id = req.params
            const query = { _id: ObjectId(id) }
            const result = await wildCollection.findOne(query)
            res.send(result)
        })
        app.post('/reviews', async(req, res) => {
            const query = req.body
            const result = await userReviews.insertOne(query)
            res.send(result)
        })
        app.get('/getreviews', async(req, res) => {
            const result = await userReviews.find({}).toArray()
            res.send(result)
        })
        app.delete('/deletedata',async(req,res)=>{
            const id = req.query.delete
            const query ={_id:ObjectId(id)}
            const result = await userReviews.deleteOne(query)
            res.send(result)
        })
    }
    finally {
        
    }
}
run().catch(error=>console.log(error))



app.get('/', (req, res) => {
    res.send('hello world')
})
app.listen(port, () => {
    console.log('hello world')
})