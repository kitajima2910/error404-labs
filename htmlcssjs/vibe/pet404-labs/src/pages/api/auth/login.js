import sql from '../../../lib/neon';

export const POST = async ({ request }) => {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Thiếu email hoặc mật khẩu' }), { status: 400 });
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
        return new Response(JSON.stringify({ message: 'Lỗi server', error: error.message }), { status: 500 });
    }
};
