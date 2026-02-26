import { Pool } from '@neondatabase/serverless';

// Initialize pool outside of the request handler to reuse connections
// during warm starts, enabling Connection Pooling to withstand high traffic.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default async function handler(req, res) {
    // 1. Cấu hình CORS
    const allowedOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'http://localhost:2910',
        'https://www.error404-labs.info.vn'
    ];
    const origin = req.headers.origin;

    // Strict CORS: Block if origin is present but NOT in allowedOrigins
    if (origin && !allowedOrigins.includes(origin)) {
        return res.status(403).send(`<div class='alert alert-error'>Truy cập bị từ chối do chính sách bảo mật CORS!</div>`);
    }

    // Set CORS headers for allowed origins
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, hx-current-url, hx-request, hx-target');

    // Xử lý preflight request của trình duyệt (thường trình duyệt sẽ hỏi đường API trước khi gửi đi POST bằng OPTIONS method)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).send(`<div class='alert alert-error'>Method Not Allowed</div>`);
    }

    // HTMX sends form-encoded data, which Vercel parses into req.body
    const email = req.body?.email;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(200).send(`
            <div class="flex flex-col gap-4">
                <div class="alert alert-error shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Email không hợp lệ!</span>
                </div>
                <button onclick="window.location.reload()" class="btn btn-outline btn-error w-full mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                    Thử lại
                </button>
            </div>
        `);
    }

    try {
        // Ensure table exists (best practice for first run, normally done in migrations)
        await pool.query(`
      CREATE TABLE IF NOT EXISTS app2.waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Try to insert the email into the waitlist table
        await pool.query('INSERT INTO app2.waitlist (email) VALUES ($1)', [email]);

        // Query to count the total number of emails in the table
        const countResult = await pool.query('SELECT COUNT(*) FROM app2.waitlist');
        const total = countResult.rows[0].count;

        // Return success response to replace HTMX target
        return res.status(200).send(`
            <div class="flex flex-col gap-4">
                <div class="alert alert-success shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Chúc mừng! Bạn là người thứ <strong>${total}</strong> tham gia hàng đợi.</span>
                </div>
                <button onclick="window.location.reload()" class="btn btn-outline btn-primary w-full mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                    Quay lại form
                </button>
            </div>
        `);
    } catch (error) {
        // Check for unique constraint violation (error code '23505' in PostgreSQL)
        if (error.code === '23505') {
            return res.status(200).send(`
                <div class="flex flex-col gap-4">
                    <div class="alert alert-error shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Email này đã có trong danh sách!</span>
                    </div>
                    <button onclick="window.location.reload()" class="btn btn-outline btn-error w-full mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                        Thử email khác
                    </button>
                </div>
            `);
        }

        console.error('Database Error:', error);
        return res.status(500).send(`
            <div class="flex flex-col gap-4">
                <div class="alert alert-error shadow-lg">
                    <span>Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!</span>
                </div>
                <button onclick="window.location.reload()" class="btn btn-outline btn-error w-full mt-2">Thử lại</button>
            </div>
        `);
    }
}
