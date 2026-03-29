/**
 * WebGL Engine & Geometry
 */
const canvas = document.getElementById('gameCanvas')
const gl = canvas.getContext('webgl', { antialias: false, alpha: false })

const VS_SOURCE = `
    attribute vec2 a_position;
    attribute vec3 a_color;
    attribute vec2 a_texcoord;
    uniform mat3 u_matrix;
    uniform vec2 u_uv_offset;
    uniform vec2 u_uv_scale;
    varying vec3 v_color;
    varying vec2 v_texcoord;
    void main() {
        vec3 pos = u_matrix * vec3(a_position, 1.0);
        gl_Position = vec4(pos.xy, 0.0, 1.0);
        v_color = a_color;
        v_texcoord = (a_texcoord * u_uv_scale) + u_uv_offset;
    }
`
const FS_SOURCE = `
    precision mediump float;
    varying vec3 v_color;
    varying vec2 v_texcoord;
    uniform sampler2D u_texture;
    uniform bool u_use_texture;
    void main() {
        if (u_use_texture) {
            vec4 texColor = texture2D(u_texture, v_texcoord);
            if (texColor.a < 0.1) discard;
            gl_FragColor = texColor;
        } else {
            gl_FragColor = vec4(v_color, 1.0);
        }
    }
`

function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    return shader
}

const program = gl.createProgram()
gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VS_SOURCE))
gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE))
gl.linkProgram(program)
gl.useProgram(program)

const aPositionLoc = gl.getAttribLocation(program, 'a_position')
const aColorLoc = gl.getAttribLocation(program, 'a_color')
const aTexcoordLoc = gl.getAttribLocation(program, 'a_texcoord')
const uMatrixLoc = gl.getUniformLocation(program, 'u_matrix')
const uUvOffsetLoc = gl.getUniformLocation(program, 'u_uv_offset')
const uUvScaleLoc = gl.getUniformLocation(program, 'u_uv_scale')
const uUseTextureLoc = gl.getUniformLocation(program, 'u_use_texture')

const vData = []
const OFFSETS = {}

function pushTri(x1, y1, x2, y2, x3, y3, r, g, b, u1 = 0, v1 = 0, u2 = 0, v2 = 0, u3 = 0, v3 = 0) {
    vData.push(x1, y1, r, g, b, u1, v1, x2, y2, r, g, b, u2, v2, x3, y3, r, g, b, u3, v3)
}
function pushQuad(x, y, w, h, r, g, b) {
    pushTri(x, y, x + w, y, x, y + h, r, g, b)
    pushTri(x + w, y, x + w, y + h, x, y + h, r, g, b)
}
function pushTexQuad(x, y, w, h) {
    pushTri(x, y, x + w, y, x, y + h, 1, 1, 1, 0, 0, 1, 0, 0, 1)
    pushTri(x + w, y, x + w, y + h, x, y + h, 1, 1, 1, 1, 0, 1, 1, 0, 1)
}
function pushOval(cx, cy, rx, ry, segments, r, g, b) {
    for (let i = 0; i < segments; i++) {
        let a1 = (i / segments) * Math.PI * 2,
            a2 = ((i + 1) / segments) * Math.PI * 2
        pushTri(cx, cy, cx + Math.cos(a1) * rx, cy + Math.sin(a1) * ry, cx + Math.cos(a2) * rx, cy + Math.sin(a2) * ry, r, g, b)
    }
}

function initGeometries() {
    vData.length = 0
    OFFSETS.SKY_START = vData.length / 7
    // Bầu trời dải màu dọc từ xanh đậm xuống xanh sáng
    pushTri(-1, 1, 1, 1, -1, -1, 0.2, 0.4, 0.8) // Trên đậm
    pushTri(1, 1, 1, -1, -1, -1, 0.5, 0.7, 1.0) // Dưới sáng
    OFFSETS.SKY_COUNT = vData.length / 7 - OFFSETS.SKY_START

    OFFSETS.SUN_START = vData.length / 7
    pushOval(0, 0, 100, 100, 32, 1.0, 1.0, 0.8) // Mặt trời rực rỡ
    OFFSETS.SUN_COUNT = vData.length / 7 - OFFSETS.SUN_START

    OFFSETS.MOUNTAINS_START = vData.length / 7
    // Dãy núi phía xa tạo chiều sâu
    for (let i = -2000; i < 2000; i += 400) {
        let h = 150 + Math.random() * 250
        pushTri(i, 0, i + 800, 0, i + 400, -h, 0.15, 0.25, 0.4)
    }
    OFFSETS.MOUNTAINS_COUNT = vData.length / 7 - OFFSETS.MOUNTAINS_START

    OFFSETS.SPRITE_QUAD_START = vData.length / 7
    pushTexQuad(-40, -40, 80, 80)
    OFFSETS.SPRITE_QUAD_COUNT = vData.length / 7 - OFFSETS.SPRITE_QUAD_START

    OFFSETS.GRASS_SPRITE_START = vData.length / 7
    pushTexQuad(-50, -100, 100, 100)
    OFFSETS.GRASS_SPRITE_COUNT = vData.length / 7 - OFFSETS.GRASS_SPRITE_START

    OFFSETS.FALLBACK_BODY_START = vData.length / 7
    pushOval(0, 0, 35, 25, 16, 0.2, 0.6, 0.2)
    pushTri(30, -5, 45, 0, 30, 5, 0.9, 0.8, 0.1)
    OFFSETS.FALLBACK_BODY_COUNT = vData.length / 7 - OFFSETS.FALLBACK_BODY_START

    OFFSETS.FALLBACK_WING_START = vData.length / 7
    pushTri(-10, 0, 10, 0, 0, -30, 0.3, 0.2, 0.1)
    OFFSETS.FALLBACK_WING_COUNT = vData.length / 7 - OFFSETS.FALLBACK_WING_START

    OFFSETS.DECOY_BODY_START = vData.length / 7
    pushQuad(-25, -15, 50, 30, 0.6, 0.5, 0.3)
    OFFSETS.DECOY_BODY_COUNT = vData.length / 7 - OFFSETS.DECOY_BODY_START

    OFFSETS.PARTICLE_START = vData.length / 7
    pushOval(0, 0, 5, 5, 12, 1, 1, 1)
    OFFSETS.PARTICLE_COUNT = vData.length / 7 - OFFSETS.PARTICLE_START

    OFFSETS.BLOOD_DEMO_START = vData.length / 7
    pushQuad(-5, -5, 10, 10, 0.8, 0, 0)
    OFFSETS.BLOOD_DEMO_COUNT = vData.length / 7 - OFFSETS.BLOOD_DEMO_START

    OFFSETS.GRASS_START = vData.length / 7
    for (let i = -2000; i < 2000; i += 60) {
        let h = 80 + Math.random() * 60
        pushTri(i, 0, i + 40, 0, i + 20, -h, 0.1, 0.4 + Math.random() * 0.2, 0.1)
    }
    OFFSETS.GRASS_COUNT = vData.length / 7 - OFFSETS.GRASS_START

    OFFSETS.CLOUD1_START = vData.length / 7
    pushOval(0, 0, 40, 30, 16, 0.9, 0.9, 0.9)
    pushOval(25, 5, 30, 25, 16, 0.9, 0.9, 0.9)
    pushOval(-25, 5, 30, 25, 16, 0.9, 0.9, 0.9)
    OFFSETS.CLOUD1_COUNT = vData.length / 7 - OFFSETS.CLOUD1_START

    OFFSETS.CLOUD2_START = vData.length / 7
    pushOval(0, 0, 60, 20, 16, 0.95, 0.95, 1.0)
    pushOval(30, 2, 40, 15, 16, 0.95, 0.95, 1.0)
    pushOval(-30, 2, 40, 15, 16, 0.95, 0.95, 1.0)
    OFFSETS.CLOUD2_COUNT = vData.length / 7 - OFFSETS.CLOUD2_START

    OFFSETS.PLANE_START = vData.length / 7
    pushQuad(-50, -10, 100, 20, 0.7, 0.7, 0.7)
    pushTri(0, -10, 20, -10, 5, -40, 0.4, 0.4, 0.4)
    pushTri(0, 10, 20, 10, 5, 40, 0.4, 0.4, 0.4)
    pushTri(-50, -10, -50, 10, -70, -30, 0.8, 0.2, 0.2)
    OFFSETS.PLANE_COUNT = vData.length / 7 - OFFSETS.PLANE_START

    OFFSETS.BALLOON_START = vData.length / 7
    pushOval(0, 0, 20, 25, 16, 1.0, 0.3, 0.3)
    pushTri(-2, 25, 2, 25, 0, 30, 1.0, 0.3, 0.3)
    OFFSETS.BALLOON_COUNT = vData.length / 7 - OFFSETS.BALLOON_START

    OFFSETS.STAR_START = vData.length / 7
    const outerR = 30,
        innerR = 12
    for (let i = 0; i < 5; i++) {
        let a1 = (i / 5) * Math.PI * 2 - Math.PI / 2
        let a2 = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2
        let a3 = ((i + 1) / 5) * Math.PI * 2 - Math.PI / 2
        pushTri(0, 0, Math.cos(a1) * outerR, Math.sin(a1) * outerR, Math.cos(a2) * innerR, Math.sin(a2) * innerR, 1.0, 0.9, 0.2)
        pushTri(0, 0, Math.cos(a2) * innerR, Math.sin(a2) * innerR, Math.cos(a3) * outerR, Math.sin(a3) * outerR, 1.0, 0.9, 0.2)
    }
    OFFSETS.STAR_COUNT = vData.length / 7 - OFFSETS.STAR_START

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vData), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(aPositionLoc)
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 28, 0)
    gl.enableVertexAttribArray(aColorLoc)
    gl.vertexAttribPointer(aColorLoc, 3, gl.FLOAT, false, 28, 8)
    gl.enableVertexAttribArray(aTexcoordLoc)
    gl.vertexAttribPointer(aTexcoordLoc, 2, gl.FLOAT, false, 28, 20)

    STATE.grassPositions = []
    for (let i = -100; i < 2500; i += 70 + Math.random() * 50) {
        STATE.grassPositions.push({
            x: i,
            type: Math.floor(Math.random() * 15), // Assuming 15 grass assets
            scale: 0.8 + Math.random() * 0.5,
            offset: Math.random() * 10,
        })
    }

    STATE.clouds = []
    for (let i = 0; i < 6; i++) {
        STATE.clouds.push({
            x: Math.random() * canvas.width,
            y: 50 + Math.random() * 200,
            type: Math.random() > 0.5 ? 1 : 2,
            speed: 10 + Math.random() * 20,
            scale: 0.5 + Math.random() * 1.5,
            variant: Math.floor(Math.random() * 10),
        })
    }
}
