const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.urvwn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const toolCollection = client.db("drills-world").collection("tools");
    const reviewCollection = client.db("drills-world").collection("reviews");

    app.get("/tool", async (req, res) => {
      const query = {};
      const cursor = toolCollection.find(query);
      const tools = await cursor.toArray();
      res.send(tools);
    });

    app.get("/review", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello New drills world");
});

app.listen(port, () => {
  console.log(`Drill World App listening on port ${port}`);
});
