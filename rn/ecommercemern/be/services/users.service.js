const { hashPassword } = require("./../utils/password.util");
const db = require("../dbConnect/neon/Postgres");

class UsersService {
    create = async (user) => {
        return db.transaction(async (db) => {
            const userCreated = await db.query(
                `
                    INSERT INTO users (id, username, email, password, role, deleted, createdAt, updatedAt) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                    RETURNING *
                `,
                [
                    new Date().getTime(),
                    user.username,
                    user.email,
                    await hashPassword(user.password),
                    user.role || "Member",
                    "no",
                    new Date().toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                    }),
                    new Date().toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                    }),
                ]
            );
            return userCreated.rows[0];
        });
    };

    readAll = async () => {
        return db.transaction(async (db) => {
            const usersAll = await db.query("SELECT * FROM users");
            return usersAll.rows;
        });
    };

    readId = async (id) => {
        return db.transaction(async (db) => {
            const user = await db.query(`SELECT * FROM users WHERE id = $1`, [
                id,
            ]);
            return user.rows;
        });
    };

    update = async (user) => {
        return db.transaction(async (db) => {
            const userUpdated = await db.query(
                `
                    UPDATE users 
                    SET 
                        username = COALESCE($1, username), 
                        email = COALESCE($2, email), 
                        role = COALESCE($3, role), 
                        deleted = COALESCE($4, deleted),
                        updatedAt = $5
                    WHERE id = $6
                    RETURNING *
                `,
                [
                    user.username,
                    user.email,
                    user.role,
                    user.deleted,
                    new Date().toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                    }),
                    user.id,
                ]
            );
            return userUpdated.rows;
        });
    };

    exists = async (user) => {
        return db.transaction(async (db) => {
            const userExists = await db.query(
                `   SELECT * FROM users 
                    WHERE email = $1 OR username = $2
                    LIMIT 1
                `,
                [user.email, user.username]
            );
            return userExists.rows;
        });
    };
}

module.exports = UsersService;
