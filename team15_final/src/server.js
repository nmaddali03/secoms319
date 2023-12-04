var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

const port = "8081"
const host = "localhost";

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "team15_final";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

app.get("/listWords", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("words")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200).send(results);
});

app.get("/:id", async (req, res) => {
    const wordid = Number(req.params.id);
    console.log("Word to find :", wordid);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": wordid };

    const results = await db.collection("words")
    .findOne(query);

    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.post("/addWord", async (req, res) => {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  const id = values[0]; // id
  const word = values[1]; // word
  console.log(id, word);
  
  const newDocument = {
    "id":id,
    "word":word,
  };
  const results = await db.collection("word").insertOne(newDocument);
  res.status(200);
  res.send(results);
});
  
app.delete("/deleteWord", async (req, res) => {
  await client.connect();
  // const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  const id = values[0]; // id
  console.log("word to delete :",id);

  const query = { id: id };

  const results = await db.collection("word").deleteOne(query);
  res.status(200);
  res.send(results);
});


app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

