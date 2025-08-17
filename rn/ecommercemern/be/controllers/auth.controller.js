const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true });

const User = require("./../models/user.model");

const BASE_API = process.env.BASE_API;
const TABLE_NAME = "users";

const REGISTER = `${BASE_API}/auth/register`;
const LOGIN = `${BASE_API}/auth/login`;

const Auth = (app, db) => {
    // Register
    app.post(REGISTER, (req, res) => {
        const data = req.body;
        const user = new User(data.username, data.email, data.password);
        const ref = db.ref(TABLE_NAME);
        ref.push(user)
            .then(() =>
                res.status(200).send({
                    message: "User registered successfully",
                    user,
                })
            )
            .catch((error) => res.status(500).send(error));
    });

    // Login
    app.post(LOGIN, (req, res) => {});
};

module.exports = Auth;
