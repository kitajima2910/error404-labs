const db = require("../dbConnect/neon/Postgres");
const { verifyPassword } = require("./../utils/password.util");

class AuthsService {
    // Login
    login = async (user) => {
        return db.transaction(async (db) => {
            const userExists = await db.query(
                `SELECT * FROM users WHERE username = $1 OR email = $2`,
                [user.username, user.email]
            );

            if (userExists.rows[0]) {
                const passwordMatch = await verifyPassword(
                    user.password,
                    userExists.rows[0].password
                );
                if (passwordMatch) {
                    return userExists.rows[0];
                } else {
                    return null;
                }
            }
        });
    };
}

module.exports = AuthsService;
