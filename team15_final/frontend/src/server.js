// var express = require("express");
// var cors = require("cors");
// var app = express();
// var fs = require("fs");
// var bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");
// const { ObjectId } = require("mongodb");


// app.use(cors());
// app.use(bodyParser.json());

// const port = 8081;
// const host = "localhost";

// // Mongo
// const url = "mongodb://127.0.0.1:27017";
// const dbName = "team15_final";
// const client = new MongoClient(url);
// const db = client.db(dbName);

// app.get("/", (req, res) => {
//   res.send("Hello, this is the root path!");
// });

// app.get("/listWords", async (req, res) => {
//   await client.connect();
//   console.log("Node connected successfully to GET MongoDB");
//   const query = {};
//   const results = await db
//     .collection("words")
//     .find(query)
//     .limit(100)
//     .toArray();
//   console.log(results);
//   res.status(200).send(results);
// });

// app.get("/:id", async (req, res) => {
//     const wordid = Number(req.params.id);
//     console.log("Word to find :", wordid);

//     await client.connect();
//     console.log("Node connected successfully to GET-id MongoDB");
//     const query = {"id": wordid };

//     const results = await db.collection("words")
//     .findOne(query);

//     console.log("Results :", results);
//     if (!results) res.send("Not Found").status(404);
//     else res.send(results).status(200);
// });

// app.post("/addWord", async (req, res) => {
//   try {
//     const { word } = req.body;

//     if (!word) {
//       return res.status(400).send("Bad Request: Missing required field 'word'.");
//     }

//     // Find the current count of words
//     const wordCount = await db.collection("words").countDocuments();

//     const newDocument = {
//       id: wordCount + 1, // Increment the count by one for the new word
//       word: word,
//     };

//     const result = await db.collection("words").insertOne(newDocument);

//     // Fetch the newly added document including _id
//     const addedWord = await db.collection("words").findOne({ _id: result.insertedId });

//     res.status(201).json(addedWord);
//   } catch (error) {
//     console.error('Error adding word:', error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// // good one just words not id
// // app.post("/addWord", async (req, res) => {
// //   try {
// //     const { word } = req.body;

// //     if (!word) {
// //       return res.status(400).send("Bad Request: Missing required field 'word'.");
// //     }

// //     const newDocument = {
// //       "word": word,
// //     };

// //     const result = await db.collection("words").insertOne(newDocument);

// //     // Fetch the newly added document including _id
// //     const addedWord = await db.collection("words").findOne({ _id: result.insertedId });

// //     res.status(201).json(addedWord);
// //   } catch (error) {
// //     console.error('Error adding word:', error);
// //     res.status(500).send("Internal Server Error");
// //   }
// // });



// // app.post("/addWord", async (req, res) => {
// //   await client.connect();
// //   const keys = Object.keys(req.body);
// //   const values = Object.values(req.body);

// //   const word = values[2]; // word
// //   const id = values[1]; // id
// //   console.log(id, word);
  
// //   const newDocument = {
// //     "id":id,
// //     "word":word,
// //   };
// //   const results = await db.collection("words").insertOne(newDocument);
// //   res.status(200);
// //   res.send(results);
// // });
  
// app.delete("/deleteWord", async (req, res) => {
//   await client.connect();
//   // const keys = Object.keys(req.body);
//   const values = Object.values(req.body);

//   const id = values[0]; // id
//   console.log("word to delete :",id);

//   const query = { id: id };

//   const results = await db.collection("words").deleteOne(query);
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
  const results = await db.collection("words").insertOne(newDocument);
  res.status(200);
  res.send(results);
});
  
app.delete("/deleteWord", async (req, res) => {
  await client.connect();
  // const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  const word = values[1]; // word
  console.log("Word to delete :",word);

  const query = { word: word };

  const results = await db.collection("words").deleteOne(query);
  res.status(200);
  res.send(results);
});


app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
