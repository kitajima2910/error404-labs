const TestCRUDFirebase = (app, db) => {
    // Create
    app.post("/create", (req, res) => {
        const data = req.body;
        const ref = db.ref("data");
        ref.push(data)
            .then(() => res.status(201).send("Data created successfully"))
            .catch((error) => res.status(400).send(error));
    });

    // Read
    app.get("/read/:id", (req, res) => {
        const ref = db.ref("data/" + req.params.id);
        ref.once("value")
            .then((snapshot) => res.status(200).send(snapshot.val()))
            .catch((error) => res.status(400).send(error));
    });

    // Update
    app.put("/update/:id", (req, res) => {
        const data = req.body;
        const ref = db.ref("data/" + req.params.id);
        ref.update(data)
            .then(() => res.status(200).send("Data updated successfully"))
            .catch((error) => res.status(400).send(error));
    });

    // Delete
    app.delete("/delete/:id", (req, res) => {
        const ref = db.ref("data/" + req.params.id);
        ref.remove()
            .then(() => res.status(200).send("Data deleted successfully"))
            .catch((error) => res.status(400).send(error));
    });
};

module.exports = TestCRUDFirebase;
