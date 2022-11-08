const express = require('express');
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000


// user :UserDb
// pass : F2Swtr9ZR2gB1FlA

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.USER_PASSWORD}@cluster0.sk6nr80.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
    try {
        const wildCollection = client.db('wildWebData').collection('wild-collections')

        app.get('/products', async(req, res) => {
            const result = await wildCollection.find({}).limit(3).toArray()
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