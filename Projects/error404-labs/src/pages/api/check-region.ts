export const prerender = false

export const GET = async ({ request }: { request: Request }) => {
    // x-vercel-id format: "hkg1::sin1::abc123"
    // - segment[0] = Edge region (nơi nhận request)
    // - segment[1] = Execution region (nơi Function thực sự chạy) ← cần lấy cái này
    const vercelId = request.headers.get('x-vercel-id') ?? ''
    const segments = vercelId.split('::')
    const regionFromHeader = segments.length >= 2 ? segments[1] : (segments[0] || null)

    // process.env được đọc tại runtime, không bị đóng gói lúc build
    const region = process.env.VERCEL_REGION || regionFromHeader || 'unknown'

    return new Response(
        JSON.stringify({
            region,
            vercel_id: vercelId || null,
            timestamp: new Date().toISOString(),
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    )
}
