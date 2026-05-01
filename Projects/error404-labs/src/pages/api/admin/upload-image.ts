import type { APIRoute } from 'astro'
import jwt from 'jsonwebtoken'
import { neon } from '@neondatabase/serverless'

export const prerender = false

const sql = neon(import.meta.env.DATABASE_URL)

const checkAdmin = async (request: Request) => {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    if (!token) return null
    try {
        const decoded = jwt.verify(token, import.meta.env.JWT_SECRET) as any
        const dbUser = (
            await sql`
            SELECT roles, logined, session_token, session_fingerprint, status
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

// POST: Upload ảnh lên ImageKit, trả về URL đã tối ưu
export const POST: APIRoute = async ({ request }) => {
    const admin = await checkAdmin(request)
    if (!admin) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const privateKey = import.meta.env.IMAGEKIT_PRIVATE_KEY
    const urlEndpoint = import.meta.env.IMAGEKIT_URL_ENDPOINT

    if (!privateKey || !urlEndpoint) {
        return new Response(JSON.stringify({ error: 'ImageKit chưa được cấu hình' }), { status: 500 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File | null
        const fileName = (formData.get('fileName') as string) || `lesson-${Date.now()}.jpg`

        if (!file) {
            return new Response(JSON.stringify({ error: 'Không có file được gửi lên' }), { status: 400 })
        }

        // Giới hạn kích thước: 5MB
        if (file.size > 5 * 1024 * 1024) {
            return new Response(JSON.stringify({ error: 'File quá lớn, tối đa 5MB' }), { status: 400 })
        }

        // Chỉ cho phép ảnh
        if (!file.type.startsWith('image/')) {
            return new Response(JSON.stringify({ error: 'Chỉ chấp nhận file ảnh' }), { status: 400 })
        }

        // Gửi lên ImageKit qua REST API (Basic Auth: privateKey + ":")
        const uploadForm = new FormData()
        uploadForm.append('file', file)
        uploadForm.append('fileName', fileName)
        uploadForm.append('folder', '/lessons')
        uploadForm.append('useUniqueFileName', 'true')

        const credentials = btoa(`${privateKey}:`)
        const ikRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentials}`,
            },
            body: uploadForm,
        })

        if (!ikRes.ok) {
            const errText = await ikRes.text()
            console.error('ImageKit upload error:', errText)
            return new Response(JSON.stringify({ error: 'Upload lên ImageKit thất bại' }), { status: 502 })
        }

        const ikData = await ikRes.json()

        // Trả về URL đã tối ưu qua ImageKit CDN
        return new Response(
            JSON.stringify({
                success: true,
                url: ikData.url,
                fileId: ikData.fileId,
                name: ikData.name,
            }),
            { status: 200 },
        )
    } catch (error) {
        console.error('Upload error:', error)
        return new Response(JSON.stringify({ error: 'Lỗi xử lý upload' }), { status: 500 })
    }
}
