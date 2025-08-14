const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true });

const BASE_API = process.env.BASE_API;
const TABLE_NAME = "dataPXH2910";

const CREATE = `${BASE_API}/create`;
const READ = `${BASE_API}/read/:id`;
const UPDATE = `${BASE_API}/update/:id`;
const DELETE = `${BASE_API}/delete/:id`;

const TestCRUDFirebase = (app, db) => {
    // Create
    app.post(CREATE, (req, res) => {
        const data = req.body;
        const ref = db.ref(TABLE_NAME);
        ref.push(data)
            .then(() => res.status(201).send("Data created successfully"))
            .catch((error) => res.status(400).send(error));
    });

    // Read
    app.get(READ, (req, res) => {
        const ref = db.ref(`${TABLE_NAME}/${req.params.id}`);
        ref.once("value")
            .then((snapshot) => res.status(200).send(snapshot.val()))
            .catch((error) => res.status(400).send(error));
    });

    // Update
    app.put(UPDATE, (req, res) => {
        const data = req.body;
        const ref = db.ref(`${TABLE_NAME}/${req.params.id}`);
        ref.update(data)
            .then(() => res.status(200).send("Data updated successfully"))
            .catch((error) => res.status(400).send(error));
    });

    // Delete
    app.delete(DELETE, (req, res) => {
        const ref = db.ref(`${TABLE_NAME}/${req.params.id}`);
        ref.remove()
            .then(() => res.status(200).send("Data deleted successfully"))
            .catch((error) => res.status(400).send(error));
    });
};

module.exports = TestCRUDFirebase;
