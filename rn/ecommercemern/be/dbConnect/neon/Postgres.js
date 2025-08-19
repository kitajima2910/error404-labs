const { Pool } = require("pg");

const dotenv = require("dotenv");
dotenv.config({ path: ".env.local", override: true }); // Nếu bạn dùng .env (tùy chọn)

// Kiểm tra DATABASE_URL_NEON có tồn tại không
if (!process.env.DATABASE_URL_NEON) {
    console.error("❌ Missing DATABASE_URL_NEON in environment variables");
    process.exit(1);
}

// Cấu hình SSL: chỉ bật nếu cần (Neon, Heroku, v.v.)
const sslConfig =
    process.env.NODE_ENV === "production"
        ? {
              rejectUnauthorized: false, // Neon, Heroku yêu cầu điều này
          }
        : false; // Local không cần SSL

const pool = new Pool({
    connectionString: process.env.DATABASE_URL_NEON,
    ssl: sslConfig,
    // Cấu hình pool
    max: parseInt(process.env.DB_MAX_CONNECTIONS) || 20, // Tối đa 20 kết nối
    min: parseInt(process.env.DB_MIN_CONNECTIONS) || 2, // Giữ tối thiểu 2
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT) || 30_000, // 30s
    connectionTimeoutMillis: parseInt(process.env.DB_CONN_TIMEOUT) || 5_000, // 5s
});

// Optional: Log khi kết nối thành công
pool.on("connect", (client) => {
    // console.log("✅ New client connected to database");
});

// Bắt lỗi nghiêm trọng trên kết nối idle
pool.on("error", (err, client) => {
    console.error("🚨 Unexpected error on idle client:", err);
    // Không nên exit ngay trong production, có thể thử recover
    // process.exit(-1); // Bỏ dòng này nếu bạn dùng PM2 hoặc container (restart tự động)
});

// Export: chỉ export query là đủ cho phần lớn trường hợp
module.exports = {
    query: (text, params) => pool.query(text, params),

    // Nếu sau này cần dùng transaction, bạn có thể export thêm:
    getClient: () => pool.connect(), // để dùng với BEGIN/COMMIT
    end: () => pool.end(), // để đóng pool khi tắt server

    // Hàm helper: tự động quản lý kết nối và release
    transaction: async (callback) => {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const result = await callback(client);
            await client.query("COMMIT");
            return result;
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release(); // ✅ Đảm bảo luôn release
        }
    },
};
