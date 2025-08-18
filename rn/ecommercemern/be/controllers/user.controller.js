const User = require("../models/users.model");
const UsersService = require("./../services/users.service");

class Users {
    constructor(app) {
        this.app = app;
    }

    // Create
    create = () => {
        this.app.post("/users/create", async (req, res) => {
            try {
                const data = req.body;

                const user = new User();
                user.username = data.username;
                user.email = data.email;
                user.password = data.password;

                const usersService = new UsersService();

                const resultUserExists = await usersService.exists(user);
                if (resultUserExists.length) {
                    return res.status(400).send("User already exists");
                }

                const resultUser = await usersService.create(user);

                res.status(200).send({
                    message: "User created successfully",
                    user: resultUser,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });
    };

    // Read
    readAll = () => {
        this.app.get("/users/readAll", async (req, res) => {
            try {
                const userService = new UsersService();
                const resultUsers = await userService.readAll();
                res.status(200).send({
                    message: "Users read successfully",
                    users: resultUsers,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });
    };

    // Read id
    readId = () => {
        this.app.get("/users/readId/:id", async (req, res) => {
            try {
                const id = req.params.id;

                const userService = new UsersService();
                const resultUser = await userService.readId(id);

                res.status(200).send({
                    message: "User read successfully",
                    user: resultUser,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });
    };

    // Update
    update = () => {
        this.app.put("/users/update", async (req, res) => {
            try {
                const data = req.body;

                const user = new User();
                user.id = data.id;
                user.username = data.username;
                user.email = data.email;
                user.role = data.role;
                user.deleted = data.deleted;

                const userService = new UsersService();
                const resultUser = await userService.update(user);

                res.status(200).send({
                    message: "User updated successfully",
                    user: resultUser,
                });
            } catch (error) {
                res.status(500).send(error);
            }
        });
    };

    run = () => {
        this.create();
        this.readAll();
        this.readId();
        this.update();
    };
}

module.exports = Users;
