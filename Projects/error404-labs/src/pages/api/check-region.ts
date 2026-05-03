export const prerender = false

export const GET = async ({ request }: { request: Request }) => {
    // x-vercel-id format examples:
    //   "hkg1::txxwr..."        → 2 segments: edge only, no separate compute region
    //   "hkg1::sin1::abc123"    → 3 segments: edge + compute + request ID
    //
    // - segment[0]              = Edge region (nơi nhận request)
    // - segment[1] (nếu có ≥3) = Compute region (nơi Function thực sự chạy)
    // - segment cuối            = Request ID (không phải region)
    const vercelId = request.headers.get('x-vercel-id') ?? ''
    const segments = vercelId.split('::')

    const edge_region = segments[0] || null
    // Chỉ lấy segment[1] làm compute_region khi có ít nhất 3 phần
    // (tức là có cả edge, compute và request ID)
    const compute_region =
        segments.length >= 3 ? segments[1] : (process.env.VERCEL_REGION || edge_region || null)

    return new Response(
        JSON.stringify({
            edge_region,
            compute_region,
            vercel_id: vercelId || null,
            timestamp: new Date().toISOString(),
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    )
}
