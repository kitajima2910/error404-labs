import { neon } from '@neondatabase/serverless';
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { username, code } = data;

        if (!username || !code) {
            return new Response(JSON.stringify({ error: 'Tài khoản và mã không được để trống' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const sql = neon(import.meta.env.DATABASE_URL);
        
        // Truy vấn dữ liệu người dùng
        const result = await sql`
            SELECT id, member, roles 
            FROM error404labs.members 
            WHERE member = ${username} AND code = ${code}
        `;

        if (result.length > 0) {
            // Đăng nhập thành công
            return new Response(JSON.stringify({ 
                success: true, 
                user: result[0] 
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            // Đăng nhập thất bại
            return new Response(JSON.stringify({ 
                error: 'Tài khoản hoặc mã không chính xác' 
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || 'Lỗi hệ thống' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
