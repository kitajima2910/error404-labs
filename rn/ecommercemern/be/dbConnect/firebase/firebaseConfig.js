const dotenv = require("dotenv");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

dotenv.config({ path: ".env.local", override: true });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL_FIREBASE,
});

const db = admin.database();
module.exports = db;
