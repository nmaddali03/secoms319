// var express = require("express");
// var cors = require("cors");
// var app = express();
// var fs = require("fs");
// var bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");

// app.use(cors());
// app.use(bodyParser.json());

// const port = "8081"
// const host = "localhost";

// // Mongo
// const url = "mongodb://127.0.0.1:27017";
// const dbName = "reactdata";
// const client = new MongoClient(url);
// const db = client.db(dbName);

// app.get("/", (req, res) => {
//   res.send("Hello, this is the root path!");
// });

// app.get("/listEasy", async (req, res) => {
//   await client.connect();
//   console.log("Node connected successfully to GET MongoDB");
//   const query = {};
//   const results = await db
//     .collection("easy")
//     .find(query)
//     .limit(100)
//     .toArray();
//   console.log(results);
//   res.status(200).send(results);
// });

// app.get("/:id", async (req, res) => {
//     const easywordid = Number(req.params.id);
//     console.log("Word to find :", easywordid);

//     await client.connect();
//     console.log("Node connected successfully to GET-id MongoDB");
//     const query = {"id": easywordid };

//     const results = await db.collection("easy")
//     .findOne(query);

//     console.log("Results :", results);
//     if (!results) res.send("Not Found").status(404);
//     else res.send(results).status(200);
// });

// app.post("/addEasyWord", async (req, res) => {
//   await client.connect();
//   const keys = Object.keys(req.body);
//   const values = Object.values(req.body);

//   const id = values[0]; // id
//   const word = values[1]; // word
//   console.log(id, word);
  
//   const newDocument = {
//     "id":id,
//     "word":word,
//   };
//   const results = await db.collection("easy").insertOne(newDocument);
//   res.status(200);
//   res.send(results);
// });
  
// app.delete("/deleteEasyWord", async (req, res) => {
//   await client.connect();
//   // const keys = Object.keys(req.body);
//   const values = Object.values(req.body);

//   const id = values[0]; // id
//   console.log("Easy word to delete :",id);

//   const query = { id: id };

//   const results = await db.collection("easy").deleteOne(query);
//   res.status(200);
//   res.send(results);
// });


// app.listen(port, () => {
//   console.log("App listening at http://%s:%s", host, port);
// });

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

// Common route for all difficulties
app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

// Easy difficulty
app.get("/list/easy", async (req, res) => {
  await handleListRequest("easy", res);
});

app.get("/easy/:id", async (req, res) => {
  await handleGetRequest("easy", req, res);
});

app.post("/add/easy", async (req, res) => {
  await handleAddRequest("easy", req, res);
});

app.delete("/delete/easy", async (req, res) => {
  await handleDeleteRequest("easy", req, res);
});

// Medium difficulty (similar routes as easy)
app.get("/list/medium", async (req, res) => {
  await handleListRequest("medium", res);
});

app.get("/medium/:id", async (req, res) => {
  await handleGetRequest("medium", req, res);
});

app.post("/add/medium", async (req, res) => {
  await handleAddRequest("medium", req, res);
});

app.delete("/delete/medium", async (req, res) => {
  await handleDeleteRequest("medium", req, res);
});

// Hard difficulty (similar routes as easy and medium)
app.get("/list/hard", async (req, res) => {
  await handleListRequest("hard", res);
});

app.get("/hard/:id", async (req, res) => {
  await handleGetRequest("hard", req, res);
});

app.post("/add/hard", async (req, res) => {
  await handleAddRequest("hard", req, res);
});

app.delete("/delete/hard", async (req, res) => {
  await handleDeleteRequest("hard", req, res);
});

async function handleListRequest(difficulty, res) {
  await client.connect();
  console.log(`Node connected successfully to GET ${difficulty} MongoDB`);
  const query = {};
  const results = await db.collection(difficulty).find(query).limit(100).toArray();
  console.log(results);
  res.status(200).send(results);
}

async function handleGetRequest(difficulty, req, res) {
  const wordId = Number(req.params.id);
  console.log(`Word to find in ${difficulty} difficulty:`, wordId);

  await client.connect();
  console.log(`Node connected successfully to GET-id ${difficulty} MongoDB`);
  const query = { "id": wordId };

  const results = await db.collection(difficulty).findOne(query);

  console.log("Results:", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
}

async function handleAddRequest(difficulty, req, res) {
  await client.connect();
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  const id = values[0]; // id
  const word = values[1]; // word
  console.log(id, word);

  const newDocument = {
    "id": id,
    "word": word,
  };
  const results = await db.collection(difficulty).insertOne(newDocument);
  res.status(200);
  res.send(results);
}

async function handleDeleteRequest(difficulty, req, res) {
  await client.connect();
  const values = Object.values(req.body);

  const id = values[0]; // id
  console.log(`${difficulty} word to delete:`, id);

  const query = { id: id };

  const results = await db.collection(difficulty).deleteOne(query);
  res.status(200);
  res.send(results);
}

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
