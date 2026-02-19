import sql from '../../../lib/neon';

export const prerender = false;

export const POST = async ({ request }) => {
    try {
        const { email, password } = await request.json();

        console.log("pxh2910: ", email, password);

        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Thiếu email hoặc mật khẩu' }), { status: 400 });
        }

        if (!sql) {
            return new Response(JSON.stringify({ message: 'Database client not initialized. Check NEON_DATABASE_URL.' }), { status: 500 });
        }

        const users = await sql`
      SELECT id, name, email, points, orders, wishlist, wallet, coupons, tier 
      FROM pet404.pet404_users 
      WHERE email = ${email} AND password = ${password}
    `;

        if (users.length === 0) {
            return new Response(JSON.stringify({ message: 'Email hoặc mật khẩu không đúng' }), { status: 401 });
        }

        return new Response(JSON.stringify(users[0]), { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({
            message: 'Lỗi server',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }), { status: 500 });
    }
};
