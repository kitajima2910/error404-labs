const express = require("express");
const bodyParser = require("body-parser");

// const rnecommercemern = require("./dbConnect/firebase/firebaseConfig");

const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true });

// const cors = require("cros");

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// const corsOptions = {
//     origin: `http://localhost:${PORT}`,
//     credentials: true, //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// Test CRUD Firebase
// const TestCRUDFirebase = require("./controllers/testcrudfirebase.controller");
// TestCRUDFirebase(app, rnecommercemern);

// Auth
// const Auth = require("./controllers/auth.controller");
// Auth(app, rnecommercemern);

// Users
const Users = require("./controllers/users.controller");
const users = new Users(app);
users.run();

// Auths
const Auths = require("./controllers/auths.controller");
const auths = new Auths(app);
auths.run();

// Utils
const Utils = require("./controllers/utils.controller");
const utils = new Utils(app);
utils.run();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
