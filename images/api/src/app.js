const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
//const credentials = require("./Credentials.js");

app.use(bodyParser.json());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
const password = process.env.PASSWORD;
const username = process.env.USERNAME;

const uri = `mongodb+srv://${username}:${password}@web2.qwg6m.mongodb.net/?retryWrites=true&w=majority&appName=Web2`;

const client = new MongoClient(uri);
const db = client.db("wdmNinaBreedstraetDatabase");
const peopleCollection = db.collection("people");
const usersCollection = db.collection("objects");
client
  .connect()
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

//people
app.get("/people", (req, res) => {
  const database = client.db("wdmNinaBreedstraetDatabase");
  const people = database.collection("people");

  people
    .find({})
    .toArray()
    .then((allPersons) => {
      res.status(200).json(allPersons);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Kan geen verbinding maken met de database." });
    });
});

app.post("/people", async (req, res) => {
  console.log("Full body received:", req.body);
  try {
    const data = req.body;

    const newPerson = { data };
    const result = await peopleCollection.insertOne(newPerson);

    console.log("Person:", result);

    res.status(201).json({
      message: "Persoon toegevoegd!",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//objects
app.get("/users", (req, res) => {
  const database = client.db("wdmNinaBreedstraetDatabase");
  const people = database.collection("objects");

  people
    .find({})
    .toArray()
    .then((allObjects) => {
      res.status(200).json(allObjects);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Kan geen verbinding maken met de database." });
    });
});

app.post("/users", async (req, res) => {
  console.log("Full body received:", req.body);
  try {
    const data = req.body;

    const newUser = { data };
    const result = await usersCollection.insertOne(newUser);

    console.log("Person:", result);

    res.status(201).json({
      message: "Object toegevoegd!",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, (err) => {
  if (!err) {
    console.log("running on port " + 3000);
  } else {
    console.error(err);
  }
});
