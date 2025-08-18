const client = require("../dbConnect/neon/connection");
const { hashPassword } = require("./../utils/password.util");

class UsersService {
    create = async (user) => {
        try {
            await client.query("BEGIN");
            const userCreated = await client.query(
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
            await client.query("COMMIT");
            return userCreated.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("❌ Lỗi khi tạo user:", error.message);
        }
    };

    readAll = async () => {
        try {
            await client.query("BEGIN");
            const usersAll = await client.query("SELECT * FROM users");
            await client.query("COMMIT");
            return usersAll.rows;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("❌ Lỗi khi lấy tất cả user", error.message);
        }
    };

    readId = async (id) => {
        try {
            await client.query("BEGIN");
            const user = await client.query(
                `SELECT * FROM users WHERE id = $1`,
                [id]
            );
            await client.query("COMMIT");
            return user.rows;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("❌ Lỗi khi lấy user", error.message);
        }
    };

    update = async (user) => {
        try {
            await client.query("BEGIN");
            const userUpdated = await client.query(
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
            await client.query("COMMIT");
            return userUpdated.rows;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("❌ Lỗi khi update user", error.message);
        }
    };

    exists = async (user) => {
        try {
            await client.query("BEGIN");
            const userExists = await client.query(
                `   SELECT * FROM users 
                    WHERE email = $1 OR username = $2
                    LIMIT 1
                `,
                [user.email, user.username]
            );
            await client.query("COMMIT");
            return userExists.rows;
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("❌ Lỗi khi lấy user", error.message);
        }
    };
}

module.exports = UsersService;
