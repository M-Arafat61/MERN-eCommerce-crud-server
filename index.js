const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.keem5yu.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const apparelCollection = client.db("fashionDB").collection("apparel");

    const brandCollection = client.db("fashionDB").collection("Brands");

    // getting products from db
    app.get("/nike-products", async (req, res) => {
      const cursor = apparelCollection.find({ brand: "Nike" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/adidas-products", async (req, res) => {
      const cursor = apparelCollection.find({ brand: "Adidas" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/gucci-products", async (req, res) => {
      const cursor = apparelCollection.find({ brand: "Gucci" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/hermes-products", async (req, res) => {
      const cursor = apparelCollection.find({ brand: "Hermes" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/tiffany-products", async (req, res) => {
      const cursor = apparelCollection.find({ brand: "Tiffany & Co." });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/zara-products", async (req, res) => {
      const cursor = apparelCollection.find({ brand: "Zara" });
      const result = await cursor.toArray();
      res.send(result);
    });

    //insert products data to db
    app.post("/addProducts", async (req, res) => {
      const newProducts = req.body;
      const result = await apparelCollection.insertOne(newProducts);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("EEE server");
});

app.listen(port, () => {
  console.log(`EEE Server is running on port: ${port}`);
});
