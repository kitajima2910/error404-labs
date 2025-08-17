const Database = require("better-sqlite3");

const db = new Database("pxh2910.db3");

try {
    // Tạo bảng nếu chưa có
    db.prepare(
        `CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT,
            email TEXT,
            password TEXT,
            role TEXT,
            createdAt TEXT,
            updatedAt TEXT
        )`
    ).run();

    // Insert
    const insertStmt = db.prepare(
        "INSERT INTO users (id, username, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    insertStmt.run(
        Math.floor(new Date().getTime()),
        "admin",
        "admin@pxh2910",
        "12345678",
        "admin",
        new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
    );

    console.log("Inserted OK");

    // Select
    const selectStmt = db.prepare("SELECT * FROM users");
    const users = selectStmt.all();
    console.log(users);

    // Update
    const updateStmt = db.prepare(
        "UPDATE users SET username = ?, email = ?, password = ?, role = ?, createdAt = ?, updatedAt = ? WHERE id = ?"
    );
    updateStmt.run(
        "pxh2910",
        "pxh2910@pxh2910.pxh2910",
        "123456",
        "Admin",
        new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        "1755448138290.0"
    );
    console.log("Updated OK");

    // Delete
    const deleteStmt = db.prepare("DELETE FROM users WHERE id = ?");
    deleteStmt.run("1755448054394.0");
    console.log("Deleted OK");
} catch (error) {
    console.log(error);
}

module.exports = db;
