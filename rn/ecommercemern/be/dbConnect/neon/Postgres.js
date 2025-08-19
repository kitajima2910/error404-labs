const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL_NEON,
    ssl: {
        rejectUnauthorized: false, // Cần thiết nếu dùng Neon với SSL
    },
    // Các tùy chọn pool (có thể điều chỉnh theo nhu cầu)
    max: 20, // Số lượng kết nối tối đa trong pool
    min: 2, // Số lượng kết nối tối thiểu (luôn giữ sẵn)
    idleTimeoutMillis: 30000, // Đóng kết nối nếu không dùng sau 30 giây
    connectionTimeoutMillis: 5000, // Thời gian chờ kết nối (5 giây)
});

// Bắt lỗi khi pool gặp sự cố
pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
