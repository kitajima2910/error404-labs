import { Pool } from '@neondatabase/serverless';

// Initialize pool outside of the request handler to reuse connections
// during warm starts, enabling Connection Pooling to withstand high traffic.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send(`<div class='alert alert-error'>Method Not Allowed</div>`);
    }

    // HTMX sends form-encoded data, which Vercel parses into req.body
    const email = req.body?.email;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).send(`<div class='alert alert-error'>Email không hợp lệ!</div>`);
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
        return res.status(200).send(`<div class='alert alert-success'>Chúc mừng! Bạn là người thứ ${total} tham gia hàng đợi.</div>`);
    } catch (error) {
        // Check for unique constraint violation (error code '23505' in PostgreSQL)
        if (error.code === '23505') {
            return res.status(409).send(`<div class='alert alert-error'>Email này đã có trong danh sách!</div>`);
        }

        console.error('Database Error:', error);
        return res.status(500).send(`<div class='alert alert-error'>Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!</div>`);
    }
}
