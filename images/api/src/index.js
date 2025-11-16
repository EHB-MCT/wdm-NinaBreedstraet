const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

app.use(bodyParser.json());

const credentials = require("../Credentials.js");
const password = process.env.PASSWORD;
const username = process.env.USERNAME;

const uri = `mongodb+srv://${username}:${password}@web2.qwg6m.mongodb.net/?retryWrites=true&w=majority&appName=Web2`;
const client = new MongoClient(uri);

app.use("/static", express.static(path.join(__dirname, "public")));

async function run() {
  try {
    const database = client.db("canapé");
    const people = database.collection("people");
    const objects = database.collection("objects");

    const query = [
      {
        title: "lalala",
        armPosition: "576543456",
      },
    ];

    const result = await people.insertMany(query);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
