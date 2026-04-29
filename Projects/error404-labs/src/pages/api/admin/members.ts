import { neon } from '@neondatabase/serverless'
import type { APIRoute } from 'astro'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const prerender = false

const sql = neon(import.meta.env.DATABASE_URL)

// Helpers to verify admin role and permissions
const checkAdmin = async (request: Request) => {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null

    if (!token) return null
    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as any

        // Kiểm tra logined, roles, status, session_token và fingerprint từ DB (Authority)
        const dbUser = (
            await sql`
            SELECT roles, status, logined, session_token, session_fingerprint
            FROM error404labs.members
            WHERE id = ${decoded.id}
        `
        )[0]

        const currentFingerprint = request.headers.get('user-agent') || 'unknown'

        if (
            !dbUser ||
            dbUser.logined !== 1 ||
            dbUser.roles !== 'admin' ||
            dbUser.status !== 'active' ||
            dbUser.session_token !== decoded.sessionToken ||
            dbUser.session_fingerprint !== currentFingerprint
        ) {
            return null
        }

        return decoded
    } catch {
        return null
    }
}

// GET: List members with Search, Sort, Pagination
export const GET: APIRoute = async ({ request, url }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const search = url.searchParams.get('search') || ''
    const role = url.searchParams.get('role') || ''
    const status = url.searchParams.get('status') || ''
    const sortBy = url.searchParams.get('sortBy') || 'id'
    const sortOrder = (url.searchParams.get('sortOrder') || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const limit = parseInt(url.searchParams.get('limit') || '5')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    // Chống SQL Injection bằng whitelist
    const allowedSortColumns = [
        'id',
        'member',
        'display_name',
        'roles',
        'created_at',
        'status',
    ]
    const finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'id'

    try {
        await sql`ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS display_name VARCHAR(100);`
        await sql`ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS prompt_access TEXT[] DEFAULT '{}';`
        await sql`ALTER TABLE error404labs.members ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';`

        const searchQuery = `%${search}%`

        // Sử dụng switch case hoặc logic đơn giản để hỗ trợ ORDER BY an toàn mà không dính lỗi parameter
        let members
        if (sortOrder === 'DESC') {
            switch (finalSortBy) {
                case 'member':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY member DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'display_name':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY display_name DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'roles':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY roles DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'created_at':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'status':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY status DESC LIMIT ${limit} OFFSET ${offset}`
                    break
                default:
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`
            }
        } else {
            switch (finalSortBy) {
                case 'member':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY member ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'display_name':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY display_name ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'roles':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY roles ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'created_at':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY created_at ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                case 'status':
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY status ASC LIMIT ${limit} OFFSET ${offset}`
                    break
                default:
                    members =
                        await sql`SELECT id, member, roles, display_name, prompt_access, created_at, status FROM error404labs.members WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status}) ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`
            }
        }

        const totalResult = await sql`
            SELECT COUNT(*)::int FROM error404labs.members
            WHERE (member ILIKE ${searchQuery} OR display_name ILIKE ${searchQuery}) AND (${role} = '' OR roles = ${role}) AND (${status} = '' OR status = ${status})
        `

        return new Response(
            JSON.stringify({
                members,
                total: totalResult[0].count,
                currentUser: admin.member, // Đồng bộ với decoded.member
            }),
            { status: 200 },
        )
    } catch (error) {
        console.error('API Error:', error)
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// POST: Create member
export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { username, password, roles, display_name } = await request.json()
        if (!username || !password) return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 })

        // Quyền bảo mật: Chỉ pxh2910 mới được tạo Admin
        if (roles === 'admin' && admin.member !== 'pxh2910') {
            return new Response(JSON.stringify({ error: 'Chỉ Super Admin mới được tạo quản trị viên.' }), {
                status: 403,
            })
        }

        const hashed = await bcrypt.hash(password, 10)
        await sql`
            INSERT INTO error404labs.members (member, code, roles, display_name) 
            VALUES (${username}, ${hashed}, ${roles || 'member'}, ${display_name || username})
        `
        return new Response(JSON.stringify({ success: true }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Username already exists or database error' }), { status: 500 })
    }
}

// PUT: Update member
export const PUT: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { id, username, password, roles, display_name } = await request.json()
        if (!id || !username) return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 })

        // Lấy thông tin user đích để check
        const target = (await sql`SELECT member, roles FROM error404labs.members WHERE id = ${id}`)[0]
        if (!target) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })

        // Bảo vệ Super Admin
        if (target.member === 'pxh2910' && admin.member !== 'pxh2910') {
            return new Response(JSON.stringify({ error: 'Không thể chỉnh sửa Super Admin.' }), { status: 403 })
        }

        // Admin thường không được sửa Admin khác
        if (target.roles === 'admin' && admin.member !== 'pxh2910' && target.member !== admin.member) {
            return new Response(JSON.stringify({ error: 'Bạn không có quyền chỉnh sửa Admin khác.' }), { status: 403 })
        }

        // Admin thường không được nâng quyền lên admin
        if (roles === 'admin' && admin.member !== 'pxh2910') {
            // Chỉ cho phép giữ nguyên nếu họ vốn đã là admin (tự sửa mình)
            if (target.roles !== 'admin') {
                return new Response(JSON.stringify({ error: 'Bạn không có quyền cấp quyền Admin.' }), { status: 403 })
            }
        }

        if (password) {
            const hashed = await bcrypt.hash(password, 10)
            await sql`
                UPDATE error404labs.members 
                SET member = ${username}, code = ${hashed}, roles = ${roles || 'member'}, display_name = ${display_name} 
                WHERE id = ${id}
            `
        } else {
            await sql`
                UPDATE error404labs.members 
                SET member = ${username}, roles = ${roles || 'member'}, display_name = ${display_name} 
                WHERE id = ${id}
            `
        }
        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}

// DELETE: Toggle member status (active/inactive)
export const DELETE: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        const { id } = await request.json()
        if (!id) return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 })

        // Lấy thông tin user đích
        const target = (await sql`SELECT member, roles, status FROM error404labs.members WHERE id = ${id}`)[0]
        if (!target) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })

        // Không được tự khóa chính mình
        if (target.member === admin.member) {
            return new Response(JSON.stringify({ error: 'Bạn không thể tự thay đổi trạng thái tài khoản của chính mình.' }), {
                status: 403,
            })
        }

        // Bảo vệ Super Admin
        if (target.member === 'pxh2910') {
            return new Response(JSON.stringify({ error: 'Không thể thay đổi trạng thái Super Admin.' }), { status: 403 })
        }

        // Admin thường không được thay đổi trạng thái Admin khác
        if (target.roles === 'admin' && admin.member !== 'pxh2910') {
            return new Response(JSON.stringify({ error: 'Bạn không có quyền thay đổi trạng thái Admin khác.' }), { status: 403 })
        }

        // Toggle status
        const newStatus = target.status === 'active' ? 'inactive' : 'active'
        await sql`UPDATE error404labs.members SET status = ${newStatus} WHERE id = ${id}`
        return new Response(JSON.stringify({ success: true, newStatus }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    }
}
