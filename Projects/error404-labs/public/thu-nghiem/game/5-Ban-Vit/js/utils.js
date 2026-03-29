/**
 * Utils & Math Library
 */
const M3 = {
    projection: (w, h) => [2 / w, 0, 0, 0, -2 / h, 0, -1, 1, 1],
    identity: () => [1, 0, 0, 0, 1, 0, 0, 0, 1],
    translate: (m, tx, ty) => [
        m[0],
        m[1],
        m[2],
        m[3],
        m[4],
        m[5],
        m[0] * tx + m[3] * ty + m[6],
        m[1] * tx + m[4] * ty + m[7],
        m[2] * tx + m[5] * ty + m[8],
    ],
    rotate: (m, angle) => {
        let s = Math.sin(angle),
            c = Math.cos(angle)
        return [
            m[0] * c + m[3] * s,
            m[1] * c + m[4] * s,
            m[2] * c + m[5] * s,
            m[0] * -s + m[3] * c,
            m[1] * -s + m[4] * c,
            m[2] * -s + m[5] * c,
            m[6],
            m[7],
            m[8],
        ]
    },
    scale: (m, sx, sy) => [
        m[0] * sx,
        m[1] * sx,
        m[2] * sx,
        m[3] * sy,
        m[4] * sy,
        m[5] * sy,
        m[6],
        m[7],
        m[8],
    ],
}
