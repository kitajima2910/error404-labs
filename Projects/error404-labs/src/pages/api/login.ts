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

        const isDev = import.meta.env.DEV;
        const dbUrl = import.meta.env.DATABASE_URL;
        const jwtSecret = import.meta.env.JWT_SECRET;
        
        // Debug: Log missing env variables (only on local)
        if (isDev && (!dbUrl || !jwtSecret)) {
             console.warn('[DEV] Missing environment variables:', { 
                DATABASE_URL: dbUrl ? 'Present' : 'MISSING', 
                JWT_SECRET: jwtSecret ? 'Present' : 'MISSING' 
            });
            return new Response(JSON.stringify({ 
                error: 'Thiếu biến môi trường cục bộ (.env)',
                details: { 
                    db: !!dbUrl, 
                    jwt: !!jwtSecret,
                    message: 'Hãy tạo file .env với DATABASE_URL và JWT_SECRET' 
                }
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const sql = neon(dbUrl);
        
        // Ensure columns exist (Migration) - Cho phép lỗi ở local nếu DB chưa sẵn sàng
        try {
            await sql`ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS points INT DEFAULT 0;`;
            await sql`ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS last_login_at DATE DEFAULT NULL;`;
            await sql`ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS display_name VARCHAR(255);`;
        } catch (mErr) {
            console.error('Migration failed:', mErr);
            if (!isDev) throw mErr;
        }

        // Lấy user theo username (không so sánh code trong SQL nữa)
        const result = await sql`
            SELECT id, member, display_name, code, roles, points, last_login_at, created_at
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

        // Daily login points logic (GMT+7 - Vietnam Timezone)
        const vnDate = new Date(new Date().getTime() + (7 * 60 * 60 * 1000));
        const today = vnDate.toISOString().split('T')[0];

        let currentPoints = user.points || 0;
        let pointsAdded = 0;

        // Kiểm tra trực tiếp từ DB xem hôm nay đã nhận điểm chưa
        const loginCheck = await sql`
            SELECT id FROM error404labs.members 
            WHERE id = ${user.id} AND last_login_at = ${today}
        `;

        if (loginCheck.length === 0) {
            pointsAdded = 10;
            currentPoints += pointsAdded;
            await sql`
                UPDATE error404labs.members 
                SET points = points + ${pointsAdded}, last_login_at = ${today} 
                WHERE id = ${user.id}
            `;
            console.log(`[Points] Awarded to ${user.member} for ${today}`);
        } else {
            console.log(`[Points] Already claimed by ${user.member} for ${today}`);
        }

        // Tạo JWT token (include points and created_at in payload or just return them)
        const token = jwt.sign(
            { id: user.id, member: user.member, roles: user.roles },
            jwtSecret,
            { expiresIn: '7d' }
        );

        const isLocal = request.url.includes('localhost') || request.url.includes('127.0.0.1');
        const isSecure = request.url.startsWith('https');

        // Set httpOnly cookie
        cookies.set('auth_token', token, {
            httpOnly: true,
            secure: isSecure && !isLocal, 
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 ngày
        });

        // Thêm cookie không httpOnly để nhận diện trạng thái login nhanh ở UI
        cookies.set('auth_active', 'true', {
            httpOnly: false,
            secure: isSecure && !isLocal,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

        // Chỉ trả về thông tin cần thiết (KHÔNG trả code)
        return new Response(JSON.stringify({ 
            success: true, 
            user: { 
                member: user.member, 
                display_name: user.display_name || user.member,
                roles: user.roles,
                points: currentPoints,
                created_at: user.created_at,
                pointsAdded
            } 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({ 
            error: 'Lỗi hệ thống',
            details: import.meta.env.DEV ? error.message : undefined
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
