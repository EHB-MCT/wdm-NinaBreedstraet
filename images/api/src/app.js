const express = require("express");
const app = express();
// const port = 3000;
const path = require("path");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const credentials = require("./Credentials.js");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
const localpassword = credentials.password;
const localusername = credentials.username;

const uri = `mongodb+srv://${localusername}:${localpassword}@web2.qwg6m.mongodb.net/?retryWrites=true&w=majority&appName=Web2`;

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

app.get("/people/:uid", async (req, res) => {
  try {
    const userId = req.params.uid;
    const database = client.db("wdmNinaBreedstraetDatabase");
    const people = database.collection("people");

    const mensen = await people.find({ "data.uid": userId }).toArray();

    if (!mensen || mensen.length === 0) {
      return res.status(404).json({ error: "Gebruiker niet gevonden" });
    }

    res.status(200).json(mensen);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
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

app.get("/uids", async (req, res) => {
  try {
    const database = client.db("wdmNinaBreedstraetDatabase");
    const people = database.collection("people");
    const uids = await people.distinct("data.uid");
    res.json(uids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//users
app.get("/users", (req, res) => {
  const database = client.db("wdmNinaBreedstraetDatabase");
  const users = database.collection("objects");

  users
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

app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Ongeldige user id" });
    }

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: "Gebruiker niet gevonden" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users", async (req, res) => {
  console.log("Full body received:", req.body);
  try {
    const data = req.body;

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
    };

    const result = await usersCollection.insertOne(newUser);

    console.log("User inserted:", result);

    res.status(201).json(newUser);
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
