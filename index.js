const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require('mongodb');



// middleware 
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://new-user:Aq5fJNl0ngmTBip7@cluster0.vtmwivk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {


    const usercollection = client.db("NewusersDB").collection("users");
      
   app.post('/users', async(req, res) => {
    const user = req.body;
    console.log('new  user  :',user);
    const result = await usercollection.insertOne(user);
    res.send(result);

   })

   



    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})