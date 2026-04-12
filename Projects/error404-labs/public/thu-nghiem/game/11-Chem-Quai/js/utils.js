// UTILS
const Utils = {
    lerp: (a, b, t) => a + (b - a) * t,
    clamp: (val, min, max) => Math.max(min, Math.min(max, val)),
    rectIntersect: (r1, r2) => !(r2.x > r1.x + r1.w || r2.x + r2.w < r1.x || r2.y > r1.y + r1.h || r2.y + r2.h < r1.y),
    seededRandom: (seed) => {
        let x = Math.sin(seed) * 10000
        return x - Math.floor(x)
    },
}
