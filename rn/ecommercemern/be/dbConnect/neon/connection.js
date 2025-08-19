const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true });

const { Client } = require("pg");

const client = new Client({
    connectionString: process.env.DATABASE_URL_NEON,
});

const connection = async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error("❌ Lỗi khi tạo connection:", error.message);
    }
};

const disconnect = async () => {
    try {
        await client.end();
    } catch (error) {
        console.error(error.message);
    }
};

connection();

module.exports = client;
