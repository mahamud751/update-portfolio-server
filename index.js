const express = require('express')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()



const port = process.env.PORT || 5000



app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3x7mu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect()
        const database = client.db('portfolio')
        const projectsCollection = database.collection('projects')
        const programsCollection = database.collection('programs')
    


   
        app.get('/projects', async (req, res) => {
            const cursor = projectsCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await projectsCollection.findOne(query)
            res.json(result)
        })
        app.get('/programs', async (req, res) => {
            const cursor = programsCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })

    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello Bikers!')
})

app.listen(port, () => {
    console.log(`bike:${port}`)
})
