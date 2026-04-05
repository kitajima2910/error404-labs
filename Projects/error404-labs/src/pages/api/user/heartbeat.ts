import { neon } from '@neondatabase/serverless';
import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const prerender = false;

const sql = neon(import.meta.env.DATABASE_URL);

export const POST: APIRoute = async ({ cookies }) => {
    const token = cookies.get('auth_token')?.value;
    if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as any;
        const userId = decoded.id;

        // Ensure columns exist (Migration)
        await sql`ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS online_seconds_today INT DEFAULT 0;`;
        await sql`ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS last_heartbeat_at TIMESTAMP DEFAULT NULL;`;

        // Lấy thông tin hiện tại (GMT+7)
        const vnNow = new Date(new Date().getTime() + (7 * 60 * 60 * 1000));
        const today = vnNow.toISOString().split('T')[0];

        const user = (await sql`SELECT points, online_seconds_today, last_heartbeat_at, last_login_at FROM error404labs.members WHERE id = ${userId}`)[0];
        
        if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

        // Kiểm tra nếu là ngày mới thì reset giây online
        const lastLoginAt = user.last_login_at ? (typeof user.last_login_at === 'string' ? user.last_login_at : user.last_login_at.toISOString().split('T')[0]) : null;
        let onlineSeconds = user.online_seconds_today || 0;
        
        if (lastLoginAt !== today) {
            onlineSeconds = 0; // Reset cho ngày mới
        }

        // Tính toán khoảng cách ping (chống treo máy ảo hoặc spam tool)
        const nowUnix = Date.now();
        const lastPingUnix = user.last_heartbeat_at ? new Date(user.last_heartbeat_at).getTime() : 0;
        const diffSeconds = Math.floor((nowUnix - lastPingUnix) / 1000);

        // Chỉ cộng nếu ping trong khoảng 30s - 120s
        if (diffSeconds >= 30 && diffSeconds <= 120) {
            const oldMinutes = Math.floor(onlineSeconds / 60);
            onlineSeconds += diffSeconds;
            const newMinutes = Math.floor(onlineSeconds / 60);

            let pointsToAdd = 0;
            if (newMinutes > oldMinutes && newMinutes <= 100) { // Giới hạn tích lũy điểm online 100 phút (~1000 điểm)/ngày
                pointsToAdd = 10; // Tặng 10 điểm mỗi phút
            }

            await sql`
                UPDATE error404labs.members 
                SET online_seconds_today = ${onlineSeconds}, 
                    last_heartbeat_at = NOW(),
                    points = points + ${pointsToAdd}
                WHERE id = ${userId}
            `;

            return new Response(JSON.stringify({ 
                success: true, 
                online_seconds: onlineSeconds,
                points_added: pointsToAdd 
            }), { status: 200 });
        }

        // Nếu là lần đầu hoặc ping không hợp lệ (mới reload trang)
        await sql`UPDATE error404labs.members SET last_heartbeat_at = NOW() WHERE id = ${userId}`;
        
        return new Response(JSON.stringify({ 
            success: true, 
            online_seconds: onlineSeconds,
            message: 'Heartbeat initialized' 
        }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({ error: 'Heartbeat failed' }), { status: 401 });
    }
};
