const db = require("../dbConnect/neon/Postgres");
const { verifyPassword } = require("./../utils/password.util");

const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true });

const jwt = require("jsonwebtoken");

class AuthsService {
    // Login
    login = async (user) => {
        return db.transaction(async (db) => {
            const userExists = await db.query(
                `SELECT * FROM users WHERE username = $1 OR email = $2`,
                [user.username, user.email]
            );

            if (userExists.rows.length === 0) {
                return null;
            }

            const matched = await verifyPassword(
                user.password,
                userExists.rows[0].password
            );

            if (!matched) {
                return null;
            }

            const token = jwt.sign(
                {
                    id: userExists.rows[0].id,
                    username: userExists.rows[0].username,
                    email: userExists.rows[0].email,
                    role: userExists.rows[0].role,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                }
            );

            return {
                user: userExists.rows[0],
                token: `Bearer ${token}`,
            };
        });
    };
}

module.exports = AuthsService;
