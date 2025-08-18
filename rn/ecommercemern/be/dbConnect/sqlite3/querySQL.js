// Create table users
const querySQLCreateTableUsers = `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    email TEXT,
    password TEXT,
    role TEXT,
    createdAt TEXT,
    updatedAt TEXT
)`;

// Create table products
const querySQLCreateTableProducts = `CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    image TEXT,
    categories TEXT,
    size TEXT,
    color TEXT,
    price TEXT,
    createdAt TEXT,
    updatedAt TEXT
)`;

// Create table order
const querySQLCreateTableOrders = `CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    userId TEXT,
    productId TEXT,
    quantity TEXT,
    amount TEXT,
    address TEXT,
    status TEXT
)`;

// Create table cart
const querySQLCreateTableCarts = `CREATE TABLE IF NOT EXISTS carts (
    id TEXT PRIMARY KEY,
    userId TEXT,
    productId TEXT,
    quantity TEXT
)`;

const excuteQuerySQLCreateTables = async (db) => {
    try {
        await db.prepare(querySQLCreateTableUsers).run();
        await db.prepare(querySQLCreateTableProducts).run();
        await db.prepare(querySQLCreateTableOrders).run();
        await db.prepare(querySQLCreateTableCarts).run();
    } catch (error) {
        console.log("Error: excuteQuerySQL");
    }
};

// Add data test
const querySQLData = {
    create: {
        table: {
            users: `INSERT INTO users (id, username, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            products: `INSERT INTO products (id, title, description, image, categories, size, color, price, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            orders: `INSERT INTO orders (id, userId, productId, quantity, amount, address, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            carts: `INSERT INTO carts (id, userId, productId, quantity) VALUES (?, ?, ?, ?)`,
        },
    },
    read: {
        table: {},
    },
    update: {
        table: {},
    },
    delete: {
        table: {},
    },
};

module.exports = {
    excuteQuerySQLCreateTables,
    querySQLData,
};
