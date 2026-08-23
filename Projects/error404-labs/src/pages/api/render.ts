import type { APIRoute } from 'astro'

export const prerender = false

const allowedOrigins = [
    'https://www.error404-labs.info.vn',
    'https://error404-labs.info.vn',
    'http://localhost:4321',
    'http://127.0.0.1:4321',
]

export const GET: APIRoute = async () => {
    return new Response('<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body></body></html>', {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
}

export const POST: APIRoute = async ({ request }) => {
    const origin = request.headers.get('origin')
    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const formData = await request.formData()
    const html = String(formData.get('html') || '')
    const css = String(formData.get('css') || '')
    const js = String(formData.get('js') || '')

    if (html.length > 100000 || css.length > 50000 || js.length > 100000) {
        return new Response(JSON.stringify({ error: 'Data too large' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const fullHtml =
        '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; form-action \'none\';"></head><body>' +
        html +
        '<style>' +
        css +
        '</style><script>' +
        js +
        '<\/script></body></html>'

    return new Response(fullHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
}
