import sql from '../../../lib/neon';

export const prerender = false;

export const POST = async ({ request }) => {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ message: 'Thiếu thông tin đăng ký' }), { status: 400 });
        }

        // Check existing user
        const existing = await sql`SELECT id FROM pet404.pet404_users WHERE email = ${email}`;
        if (existing.length > 0) {
            return new Response(JSON.stringify({ message: 'Email đã tồn tại' }), { status: 409 });
        }

        // Insert new user
        const result = await sql`
      INSERT INTO pet404.pet404_users (name, email, password, coupons, tier)
      VALUES (${name}, ${email}, ${password}, 3, 'bronze')
      RETURNING id, name, email, points, orders, wishlist, wallet, coupons, tier
    `;

        return new Response(JSON.stringify(result[0]), { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return new Response(JSON.stringify({ message: 'Lỗi server', error: error.message }), { status: 500 });
    }
};
