// probeersel, gevolgd via website mongodb

import { MongoClient } from "mongodb";
import credentials from "../Credentials.js";

app.use(bodyParser.json());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

const uri = `mongodb+srv://${credentials.username}:${credentials.password}@web2.qwg6m.mongodb.net/?retryWrites=true&w=majority&appName=Web2`;
let mongoClient;
let db;

export async function connect(uri) {
  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    db = client.db("wdmNinaBreedstraetDatabase");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function executeStudentCrudOperations() {
  try {
    mongoClient = await connect(uri);
    application.get();
  } finally {
    await mongoClient.close();
  }
}