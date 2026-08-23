import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
    const isDev = import.meta.env.DEV;
    try {
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const dbUrl = import.meta.env.DATABASE_URL;
        const jwtSecret = import.meta.env.JWT_SECRET;

        if (!dbUrl || !jwtSecret) {
            throw new Error('Missing environment variables');
        }

        const decoded = jwt.verify(token, jwtSecret) as {
            id: number;
            member: string;
            roles: string;
            sessionToken: string;
        };

        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(dbUrl);
        const user = (await sql`
            SELECT prompt_access, logined, session_token, session_fingerprint, status
            FROM error404labs.members
            WHERE id = ${decoded.id}
        `)[0];

        const currentFingerprint = request.headers.get('user-agent') || 'unknown';
        if (
            !user ||
            user.logined !== 1 ||
            user.status !== 'active' ||
            user.session_token !== decoded.sessionToken ||
            user.session_fingerprint !== currentFingerprint
        ) {
            return new Response(JSON.stringify({ error: 'Session invalid or expired' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const gameName = url.searchParams.get('gameName');
        const permissionId = url.searchParams.get('permissionId');
        if (!gameName || !permissionId) {
            return new Response(JSON.stringify({ error: 'Missing gameName or permissionId' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(gameName)) {
            return new Response(JSON.stringify({ error: 'Tên game không hợp lệ' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check permission
        const hasAccess = decoded.roles === 'admin' || user.prompt_access?.includes(permissionId);
        if (!hasAccess) {
            return new Response(JSON.stringify({ content: 'Cần có quyền cho phép hãy liên hệ Admin' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Read file
        const filePath = join(process.cwd(), 'src', 'data', 'game-roadmap', `${gameName}.txt`);
        let content = 'Đang tải...';
        if (existsSync(filePath)) {
            content = readFileSync(filePath, 'utf-8').trim();
            if (!content) content = 'Đang tải...';
        }

        return new Response(JSON.stringify({ content }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Get game prompt error:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            details: isDev ? error.message : undefined
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
