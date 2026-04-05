import { neon } from '@neondatabase/serverless';
import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkRateLimit } from '../../utils/rateLimit';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        // CSRF Protection
        const origin = request.headers.get('origin');
        const allowedOrigins = [
            'https://www.error404-labs.info.vn',
            'https://error404-labs.info.vn',
            'http://localhost:4321',
            'http://127.0.0.1:4321'
        ];
        
        if (!origin || !allowedOrigins.includes(origin)) {
            return new Response(JSON.stringify({ error: 'Forbidden: Invalid Origin (CSRF Protection)' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Rate limiting: 5 lần thử/phút/IP
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || 'unknown';
        const rateCheck = checkRateLimit(clientIp, 5, 60_000);
        if (!rateCheck.allowed) {
            return new Response(JSON.stringify({
                error: `Quá nhiều lần thử. Vui lòng đợi ${rateCheck.retryAfterSec} giây.`
            }), {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'Retry-After': String(rateCheck.retryAfterSec)
                }
            });
        }

        const data = await request.json();
        const { username, code } = data;

        if (!username || !code) {
            return new Response(JSON.stringify({ error: 'Tài khoản và mã không được để trống' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate input length để tránh DoS
        if (username.length > 100 || code.length > 100) {
            return new Response(JSON.stringify({ error: 'Dữ liệu không hợp lệ' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const sql = neon(import.meta.env.DATABASE_URL);
        
        // Lấy user theo username (không so sánh code trong SQL nữa)
        const result = await sql`
            SELECT id, member, code, roles 
            FROM error404labs.members 
            WHERE member = ${username}
        `;

        if (result.length === 0) {
            return new Response(JSON.stringify({ error: 'Tài khoản hoặc mã không chính xác' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const user = result[0];

        // So sánh mật khẩu bằng bcrypt
        const isValid = await bcrypt.compare(code, user.code);

        if (!isValid) {
            return new Response(JSON.stringify({ error: 'Tài khoản hoặc mã không chính xác' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { id: user.id, member: user.member, roles: user.roles },
            import.meta.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Set httpOnly cookie — không thể truy cập từ JavaScript
        cookies.set('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 ngày
        });

        // Chỉ trả về thông tin cần thiết (KHÔNG trả code/roles)
        return new Response(JSON.stringify({ 
            success: true, 
            user: { member: user.member } 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ error: 'Lỗi hệ thống' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
