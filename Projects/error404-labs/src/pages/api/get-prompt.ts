import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';
import { categories } from '../../data/dataPromptsGame.js';

export const prerender = false;

// Load tất cả file prompt tại build time
const promptFiles = import.meta.glob('../../data/prompts/*.txt', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export const GET: APIRoute = async ({ request, url }) => {
    try {
        // Xác thực JWT từ Authorization header
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
        
        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let decodedToken: any;
        try {
            decodedToken = jwt.verify(token, import.meta.env.JWT_SECRET) as any;
            
            // 1. Kiểm tra trạng thái logined và session_token từ DB
            const { neon } = await import('@neondatabase/serverless');
            const sql = neon(import.meta.env.DATABASE_URL);
            const user = (await sql`
                SELECT logined, session_token, session_fingerprint 
                FROM error404labs.members 
                WHERE id = ${decodedToken.id}
            `)[0];
            
            const currentFingerprint = request.headers.get('user-agent') || 'unknown';

            if (
                !user || 
                user.logined !== 1 || 
                user.session_token !== decodedToken.sessionToken ||
                user.session_fingerprint !== currentFingerprint
            ) {
                return new Response(JSON.stringify({ error: 'Session invalid or expired' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        } catch {
            return new Response(JSON.stringify({ error: 'Invalid token' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Lấy item ID từ query param
        const itemId = url.searchParams.get('id');
        if (!itemId || isNaN(Number(itemId))) {
            return new Response(JSON.stringify({ error: 'Invalid ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Tìm item trong categories
        let foundItem: any = null;
        for (const cat of categories) {
            const item = cat.items.find((i: any) => String(i.id) === itemId);
            if (item) {
                foundItem = item;
                break;
            }
        }

        if (!foundItem) {
            return new Response(JSON.stringify({ error: 'Not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // --- IDOR / RBAC Protection ---
        // Mặc định prompt không có `roleRequired` là public cho bất kỳ ai đã đăng nhập.
        // Nếu prompt có `roleRequired`, tài khoản phải có vai trò tương ứng hoặc là `admin`.
        if (foundItem.roleRequired) {
            const userRole = decodedToken.roles || 'member';
            const requiredRoles = Array.isArray(foundItem.roleRequired) 
                ? foundItem.roleRequired 
                : [foundItem.roleRequired];
            
            if (userRole !== 'admin' && !requiredRoles.includes(userRole)) {
                return new Response(JSON.stringify({ error: 'Forbidden: Bạn không có quyền truy cập nội dung này' }), {
                    status: 403,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        // Nếu yêu cầu chỉ lấy tooltip thì trả về luôn prompt_extends
        const isTooltip = url.searchParams.get('type') === 'tooltip';
        if (isTooltip) {
            return new Response(JSON.stringify({ tooltip: foundItem.prompt_extends || null }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Tìm file prompt tương ứng
        const fileKey = Object.keys(promptFiles).find((key) =>
            key.split('/').pop()?.startsWith(`${foundItem.id}-`),
        );
        const fileContent = fileKey ? promptFiles[fileKey] : null;

        // Ghép prompt
        const fullPrompt = fileContent
            ? `${foundItem.prompt_extends}\n\n${fileContent}`
            : foundItem.prompt_extends;

        return new Response(JSON.stringify({ prompt: fullPrompt || null }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Get prompt error:', error);
        return new Response(JSON.stringify({ error: 'Lỗi hệ thống' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
