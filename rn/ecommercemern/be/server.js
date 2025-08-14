const express = require("express");
const bodyParser = require("body-parser");

const rnecommercemern = require("./dbConnect/firebase/firebaseConfig");

const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true });

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Test CRUD Firebase
const TestCRUDFirebase = require("./controllers/testcrudfirebase");
TestCRUDFirebase(app, rnecommercemern);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
