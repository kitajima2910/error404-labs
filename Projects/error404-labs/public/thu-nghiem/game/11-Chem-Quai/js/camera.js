// CAMERA
class Camera {
    constructor() {
        this.x = 0
        this.y = 0
        this.zoom = 1
        this.targetZoom = 1
        this.shakeT = 0
        this.shakeI = 0
    }
    shake(i, d) {
        this.shakeI = i
        this.shakeT = d
    }
    update(dt, t) {
        const tx = t.x - CONFIG.canvasWidth / 2,
            ty = CONFIG.floorY - CONFIG.canvasHeight / 1.5
        this.x = Utils.lerp(this.x, tx, 10 * dt)
        this.y = Utils.lerp(this.y, ty, 10 * dt)
        this.zoom = Utils.lerp(this.zoom, this.targetZoom, 15 * dt)
        if (this.shakeT > 0) this.shakeT -= dt
    }
    apply(ctx) {
        ctx.translate(CONFIG.canvasWidth / 2, CONFIG.canvasHeight / 2)
        ctx.scale(this.zoom, this.zoom)
        let sx = 0,
            sy = 0
        if (this.shakeT > 0) {
            sx = (Math.random() - 0.5) * this.shakeI
            sy = (Math.random() - 0.5) * this.shakeI
        }
        ctx.translate(
            Math.round(-CONFIG.canvasWidth / 2 - this.x + sx),
            Math.round(-CONFIG.canvasHeight / 2 - this.y + sy),
        )
    }
}
