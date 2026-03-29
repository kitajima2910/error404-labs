/**
 * Main Game Loop & Input Handling
 */
let lastTime = performance.now()

function handleShoot() {
    if (STATE.phase !== 'PLAYING') return
    AudioSys.init()
    if (STATE.ammo <= 0) {
        AudioSys.playEmpty()
        return
    }
    STATE.ammo--
    STATE.flashAlpha = 1.0
    AudioSys.playPew()

    let hitAnything = false

    // Kiểm tra va chạm với máy bay
    if (STATE.plane.active && !STATE.plane.dead) {
        let dx = STATE.plane.x - STATE.mouseX,
            dy = STATE.plane.y - STATE.mouseY
        if (Math.abs(dx) < 60 && Math.abs(dy) < 30) {
            hitAnything = true
            STATE.plane.dead = true
            STATE.plane.fallTime = 0
            STATE.score = Math.max(0, STATE.score - 100)
            STATE.timeLeft = Math.max(0, STATE.timeLeft - 10)
            AudioSys.playHitDecoy()
            spawnParticles(STATE.plane.x, STATE.plane.y, 30, true)
            updateHUD()
        }
    }

    // Kiểm tra va chạm với bóng bay
    if (!hitAnything) {
        STATE.balloons.forEach((b) => {
            if (!b.dead) {
                let dx = b.x - STATE.mouseX,
                    dy = b.y - STATE.mouseY
                if (Math.abs(dx) < 30 && Math.abs(dy) < 40) {
                    hitAnything = true
                    b.dead = true
                    b.fallTime = 0
                    STATE.score += 50
                    AudioSys.playHitReal()
                    spawnParticles(b.x, b.y, 20, false)
                    updateHUD()
                }
            }
        })
    }
 
    // Kiểm tra va chạm với ngôi sao
    if (!hitAnything) {
        STATE.stars.forEach((s) => {
            if (!s.dead) {
                let dx = s.x - STATE.mouseX,
                    dy = s.y - STATE.mouseY
                if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
                    hitAnything = true
                    s.dead = true
                    STATE.timeLeft += 20
                    if (Math.random() < 0.1) {
                        STATE.lives = Math.min(CONFIG.MAX_LIVES, STATE.lives + 1)
                    }
                    AudioSys.playHitReal()
                    spawnParticles(s.x, s.y, 15, false)
                    updateHUD()
                }
            }
        })
    }
 
    if (!hitAnything) {
        for (let i = targets.length - 1; i >= 0; i--) {
            let t = targets[i]
            if (t.active && !t.fleeing && !t.dead) {
                let dx = t.x - STATE.mouseX,
                    dy = t.y - STATE.mouseY
                if (Math.sqrt(dx * dx + dy * dy) < CONFIG.HITBOX_RADIUS) {
                    hitAnything = true
                    if (t.type === 0) {
                        AudioSys.playHitReal()
                        STATE.score += 100 * STATE.combo
                        STATE.combo++
                        spawnParticles(t.x, t.y, 25, true)
                        if (STATE.bloodAssetLoaded) spawnParticles(t.x, t.y, 1, true, true)
                        t.dead = true
                        t.vy = 600
                    } else {
                        AudioSys.playHitDecoy()
                        STATE.combo = 1
                        STATE.lives--
                        STATE.shakeMagnitude = 15
                        spawnParticles(t.x, t.y, 25, true)
                        t.dead = true
                        t.vy = 600
                        t.vx *= 0.5
                        if (STATE.lives <= 0) {
                            endTurn()
                            return
                        }
                    }
                    break
                }
            }
        }
    }

    if (!hitAnything) {
        STATE.combo = 1
        targets.forEach((t) => {
            if (t.active && t.type === 0 && !t.dead) {
                t.fleeing = true
                t.vx *= 1.8
            }
        })
    }
    updateHUD()
}

function startGame() {
    AudioSys.init()
    STATE.p1Score = 0
    STATE.p2Score = 0
    STATE.currentPlayer = 1
    startTurn()
}
function startTurn() {
    if (STATE.phase === 'PLAYING') return
    STATE.phase = 'PLAYING'
    STATE.score = 0
    STATE.lives = CONFIG.MAX_LIVES
    STATE.ammo = CONFIG.MAX_AMMO
    STATE.combo = 1
    STATE.level = 1
    STATE.timeLeft = CONFIG.SESSION_DURATION
    STATE.globalTime = 0
    targets.forEach((t) => (t.active = false))
    particles.forEach((p) => (p.active = false))
    UI.hudPlayer.innerText = `Người chơi ${STATE.currentPlayer}`
    UI.screens.start.classList.add('hidden')
    UI.screens.transition.classList.add('hidden')
    UI.screens.gameOver.classList.add('hidden')
    UI.hud.classList.remove('hidden')
    updateHUD()
    AudioSys.startBGM()
    canvas.style.cursor = 'none'
}function endTurn() {
    if (STATE.phase !== 'PLAYING') return
    const currentScore = STATE.score
    if (STATE.currentPlayer === 1) {
        STATE.p1Score = currentScore
        STATE.phase = 'TRANSITION'
        AudioSys.stopBGM()
        if (CONFIG.GAME_MODE_2P) {
            STATE.currentPlayer = 2
            UI.screens.transition.classList.remove('hidden')
            UI.hud.classList.add('hidden')
        } else showGameOver()
    } else {
        STATE.p2Score = currentScore
        STATE.phase = 'TRANSITION'
        AudioSys.stopBGM()
        showGameOver()
    }
}
function showGameOver() {
    STATE.phase = 'GAMEOVER'
    document.getElementById('go-score-p1').innerText = STATE.p1Score
    document.getElementById('go-score-p2').innerText = STATE.p2Score
    let winnerTxt = CONFIG.GAME_MODE_2P
        ? STATE.p1Score > STATE.p2Score
            ? 'P1 THẮNG!'
            : STATE.p2Score > STATE.p1Score
              ? 'P2 THẮNG!'
              : 'HÒA!'
        : `ĐIỂM: ${STATE.p1Score}`
    document.getElementById('go-winner').innerText = winnerTxt
    UI.screens.gameOver.classList.remove('hidden')
    UI.hud.classList.add('hidden')
    canvas.style.cursor = 'default'
    if (STATE.p1Score !== STATE.p2Score || !CONFIG.GAME_MODE_2P) spawnFireworks()
}

function render() {
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
        initGeometries()
    }
    let now = performance.now(),
        dt = Math.min((now - lastTime) / 1000, 0.1)
    lastTime = now

    if (STATE.phase === 'PLAYING' || STATE.phase === 'GAMEOVER') {
        STATE.globalTime += dt
        if (STATE.phase === 'PLAYING') {
            STATE.timeLeft -= dt
            STATE.timeSinceLastReload += dt
            if (STATE.timeSinceLastReload >= CONFIG.RELOAD_TIME && STATE.ammo < CONFIG.MAX_AMMO) {
                STATE.ammo++
                STATE.timeSinceLastReload = 0
                updateHUD()
            }
        }
        AudioSys.updateBGM()
        STATE.level = 1 + Math.floor(STATE.globalTime / 20)
        STATE.timeSinceLastSpawn += dt
        if (STATE.timeSinceLastSpawn >= Math.max(0.3, CONFIG.SPAWN_RATE_BASE - STATE.level * 0.1)) {
            STATE.timeSinceLastSpawn = 0
            let t = targets.find((t) => !t.active)
            if (t) t.spawn(Math.random() < 0.5 ? 1 : 0, STATE.level)
        }
        targets.forEach((t) => {
            if (t.active) t.update(dt)
        })
        particles.forEach((p) => {
            if (p.active) p.update(dt)
        })

        if (STATE.shakeMagnitude > 0) STATE.shakeMagnitude -= dt * 70
        if (STATE.flashAlpha > 0) {
            STATE.flashAlpha -= dt * 5
            UI.flashOverlay.style.opacity = Math.max(0, STATE.flashAlpha)
        }

        STATE.clouds.forEach((c) => {
            c.x += c.speed * dt
            if (c.x > canvas.width + 150) c.x = -150
        })

        if (!STATE.plane.active) {
            STATE.plane.cooldown -= dt
            if (STATE.plane.cooldown <= 0) {
                STATE.plane.active = true
                STATE.plane.dead = false
                STATE.plane.vx = Math.random() > 0.5 ? 180 : -180
                STATE.plane.vy = 0
                STATE.plane.x = STATE.plane.vx > 0 ? -200 : canvas.width + 200
                STATE.plane.y = 50 + Math.random() * 150
                STATE.plane.time = 0
            }
        } else {
            if (STATE.plane.dead) {
                STATE.plane.fallTime += dt
                STATE.plane.vy += 800 * dt
                STATE.plane.vx *= 0.99
            }
            STATE.plane.x += STATE.plane.vx * dt
            STATE.plane.y += STATE.plane.vy * dt
            STATE.plane.time += dt
            if (
                (STATE.plane.vx > 0 && STATE.plane.x > canvas.width + 200) ||
                (STATE.plane.vx < 0 && STATE.plane.x < -200) ||
                STATE.plane.y > canvas.height + 100
            ) {
                STATE.plane.active = false
                STATE.plane.cooldown = 5 + Math.random() * 10
            }
        }

        if (Math.random() < 0.01 && STATE.balloons.length < 5) {
            STATE.balloons.push({
                x: 50 + Math.random() * (canvas.width - 100),
                y: canvas.height + 50,
                vy: 40 + Math.random() * 40,
                color: [Math.random(), Math.random(), Math.random()],
            })
        }
        STATE.balloons.forEach((b, i) => {
            if (b.dead) {
                b.fallTime += dt
                b.y += 400 * dt
            } else {
                b.y -= b.vy * dt
                b.x += Math.sin(STATE.globalTime + b.y * 0.1) * 20 * dt
            }
            if (b.y < -150 || b.y > canvas.height + 150) STATE.balloons.splice(i, 1)
        })

        if (Math.random() < 0.005 && STATE.stars.filter((s) => !s.dead).length < 2) {
            STATE.stars.push({
                x: 50 + Math.random() * (canvas.width - 100),
                y: 50 + Math.random() * (canvas.height * 0.4),
                rot: 0,
                dead: false,
            })
        }

        updateHUD()
        if (STATE.phase === 'PLAYING') {
            if (STATE.lives <= 0 || STATE.timeLeft <= 0) endTurn()
        } else {
            if (Math.random() < 0.04) spawnFireworks()
        }
    } else if (STATE.phase === 'TRANSITION') {
        particles.forEach((p) => {
            if (p.active) p.update(dt)
        })
        targets.forEach((t) => {
            if (t.active) t.update(dt)
        })
    }

    gl.clearColor(0.05, 0.05, 0.05, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    let proj = M3.projection(canvas.width, canvas.height)
    if (STATE.shakeMagnitude > 0)
        proj = M3.translate(
            proj,
            (Math.random() - 0.5) * STATE.shakeMagnitude,
            (Math.random() - 0.5) * STATE.shakeMagnitude,
        )

    gl.uniformMatrix3fv(uMatrixLoc, false, M3.identity())
    gl.uniform1i(uUseTextureLoc, 0)
    gl.drawArrays(gl.TRIANGLES, OFFSETS.SKY_START, OFFSETS.SKY_COUNT)

    // Vẽ Mặt trời
    let sunMat = M3.translate(proj, canvas.width * 0.8, 100)
    gl.uniformMatrix3fv(uMatrixLoc, false, sunMat)
    gl.drawArrays(gl.TRIANGLES, OFFSETS.SUN_START, OFFSETS.SUN_COUNT)

    // Vẽ Dãy núi với hiệu ứng di chuyển chậm và nhấp nhô
    let mountScroll = (STATE.globalTime * 30) % 2000
    let bobbing = Math.sin(STATE.globalTime * 0.45) * 15
    let mountMat = M3.translate(proj, -mountScroll, canvas.height * 0.75 + bobbing)
    gl.uniformMatrix3fv(uMatrixLoc, false, mountMat)
    gl.drawArrays(gl.TRIANGLES, OFFSETS.MOUNTAINS_START, OFFSETS.MOUNTAINS_COUNT)
    // Vẽ lần 2 để nối đuôi
    let mountMat2 = M3.translate(proj, -mountScroll + 2000, canvas.height * 0.75 + bobbing)
    gl.uniformMatrix3fv(uMatrixLoc, false, mountMat2)
    gl.drawArrays(gl.TRIANGLES, OFFSETS.MOUNTAINS_START, OFFSETS.MOUNTAINS_COUNT)

    STATE.clouds.forEach((c) => {
        let m = M3.translate(proj, c.x, c.y)
        m = M3.scale(m, c.scale, c.scale)
        if (c.type === 1 && STATE.cloudType1AssetLoaded) {
            let frame = Math.floor(STATE.globalTime * 1.5 + c.variant) % CLOUD_TYPE1_ASSETS.length
            gl.bindTexture(gl.TEXTURE_2D, STATE.cloudType1Textures[frame])
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.uniform2f(uUvScaleLoc, 1, 1)
            gl.uniform1i(uUseTextureLoc, 1)
            gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
            gl.uniform1i(uUseTextureLoc, 0)
        } else if (c.type === 2 && STATE.cloudType2AssetLoaded) {
            let frame = Math.floor(STATE.globalTime * 1.2 + c.variant) % CLOUD_TYPE2_ASSETS.length
            gl.bindTexture(gl.TEXTURE_2D, STATE.cloudType2Textures[frame])
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.uniform2f(uUvScaleLoc, 1, 1)
            gl.uniform1i(uUseTextureLoc, 1)
            gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
            gl.uniform1i(uUseTextureLoc, 0)
        } else {
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.drawArrays(
                gl.TRIANGLES,
                c.type === 1 ? OFFSETS.CLOUD1_START : OFFSETS.CLOUD2_START,
                c.type === 1 ? OFFSETS.CLOUD1_COUNT : OFFSETS.CLOUD2_COUNT,
            )
        }
    })

    if (STATE.plane.active) {
        let m = M3.translate(proj, STATE.plane.x, STATE.plane.y)
        if (STATE.plane.dead) {
            m = M3.rotate(m, STATE.plane.vx > 0 ? Math.PI / 4 : -Math.PI / 4)
            if (STATE.planeFallAssetLoaded) {
                let frame = Math.floor(STATE.plane.fallTime * 12) % PLANE_FALL_ASSETS.length
                gl.bindTexture(gl.TEXTURE_2D, STATE.planeFallTextures[frame])
            } else if (STATE.planeAssetLoaded) {
                let frame = Math.floor(STATE.plane.time * 12) % PLANE_ASSETS.length
                gl.bindTexture(gl.TEXTURE_2D, STATE.planeTextures[frame])
            }
        } else if (STATE.planeAssetLoaded) {
            let frame = Math.floor(STATE.plane.time * 12) % PLANE_ASSETS.length
            gl.bindTexture(gl.TEXTURE_2D, STATE.planeTextures[frame])
        }
        if (STATE.planeAssetLoaded || (STATE.plane.dead && STATE.planeFallAssetLoaded)) {
            if (STATE.plane.vx < 0) m = M3.scale(m, -1.2, 1.2)
            else m = M3.scale(m, 1.2, 1.2)
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.uniform2f(uUvScaleLoc, 1, 1)
            gl.uniform1i(uUseTextureLoc, 1)
            gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
            gl.uniform1i(uUseTextureLoc, 0)
        } else {
            if (STATE.plane.vx < 0) m = M3.scale(m, -0.6, 0.6)
            else m = M3.scale(m, 0.6, 0.6)
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.drawArrays(gl.TRIANGLES, OFFSETS.PLANE_START, OFFSETS.PLANE_COUNT)
        }
    }

    STATE.balloons.forEach((b) => {
        if (STATE.balloonAssetLoaded) {
            let frame = 0,
                textures = STATE.balloonTextures
            if (b.dead && STATE.balloonFallAssetLoaded) {
                frame = Math.floor(b.fallTime * 12) % 8
                textures = STATE.balloonFallTextures
            } else {
                frame = Math.floor(STATE.globalTime * 6 + b.x * 0.05) % 8
            }

            let windX = !b.dead && (frame === 2 || frame === 3) ? 15 : 0
            let m = M3.translate(proj, b.x + windX, b.y)

            gl.bindTexture(gl.TEXTURE_2D, textures[frame])
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.uniform2f(uUvScaleLoc, 1, 1)
            gl.uniform1i(uUseTextureLoc, 1)
            gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
            gl.uniform1i(uUseTextureLoc, 0)
        } else {
            let m = M3.translate(proj, b.x, b.y)
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.drawArrays(gl.TRIANGLES, OFFSETS.BALLOON_START, OFFSETS.BALLOON_COUNT)
        }
    })

    STATE.stars.forEach((s, idx) => {
        if (!s.dead) {
            s.rot += dt * 3
            let m = M3.translate(proj, s.x, s.y)
            if (STATE.starAssetLoaded) {
                let frame = Math.floor(STATE.globalTime * 12 + idx) % STAR_ASSETS.length
                gl.bindTexture(gl.TEXTURE_2D, STATE.starTextures[frame])
                m = M3.scale(m, 0.7, 0.7)
                gl.uniformMatrix3fv(uMatrixLoc, false, m)
                gl.uniform2f(uUvScaleLoc, 1, 1)
                gl.uniform1i(uUseTextureLoc, 1)
                gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
                gl.uniform1i(uUseTextureLoc, 0)
            } else {
                let scaleX = Math.cos(s.rot)
                m = M3.scale(m, scaleX * 0.7, 0.7)
                gl.uniformMatrix3fv(uMatrixLoc, false, m)
                gl.drawArrays(gl.TRIANGLES, OFFSETS.STAR_START, OFFSETS.STAR_COUNT)
            }
        } else {
            STATE.stars.splice(idx, 1)
        }
    })

    targets.forEach((t) => {
        if (!t.active) return
        let matrix = M3.translate(proj, t.x, t.y),
            bMatrix = M3.scale(matrix, t.dir, 1)
        if (t.type === 0) {
            if (t.dead) {
                if (STATE.duckShotAssetLoaded) {
                    let frame = Math.floor(t.shotTime * 12) % DUCK_SHOT_ASSETS.length
                    gl.bindTexture(gl.TEXTURE_2D, STATE.duckShotTextures[frame])
                    gl.uniformMatrix3fv(uMatrixLoc, false, bMatrix)
                    gl.uniform2f(uUvScaleLoc, 1, 1)
                    gl.uniform1i(uUseTextureLoc, 1)
                    gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
                    gl.uniform1i(uUseTextureLoc, 0)
                } else {
                    gl.uniformMatrix3fv(uMatrixLoc, false, bMatrix)
                    gl.drawArrays(gl.TRIANGLES, OFFSETS.FALLBACK_BODY_START, OFFSETS.FALLBACK_BODY_COUNT)
                }
            } else if (STATE.duckAssetLoaded) {
                let frame = Math.floor(t.time * 14) % DUCK_ASSETS.length
                gl.bindTexture(gl.TEXTURE_2D, STATE.duckTextures[frame])
                gl.uniformMatrix3fv(uMatrixLoc, false, bMatrix)
                gl.uniform2f(uUvScaleLoc, 1, 1)
                gl.uniform1i(uUseTextureLoc, 1)
                gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
                gl.uniform1i(uUseTextureLoc, 0)
            } else {
                gl.uniformMatrix3fv(uMatrixLoc, false, bMatrix)
                gl.drawArrays(gl.TRIANGLES, OFFSETS.FALLBACK_BODY_START, OFFSETS.FALLBACK_BODY_COUNT)
                let wMatrix = M3.rotate(bMatrix, Math.sin(t.time * 15))
                gl.uniformMatrix3fv(uMatrixLoc, false, wMatrix)
                gl.drawArrays(gl.TRIANGLES, OFFSETS.FALLBACK_WING_START, OFFSETS.FALLBACK_WING_COUNT)
            }
        } else {
            if (t.dead) {
                if (STATE.decoyAssetLoaded) {
                    let frame = Math.floor(t.time * 10) % DECOY_ASSETS.length
                    gl.bindTexture(gl.TEXTURE_2D, STATE.decoyTextures[frame])
                    gl.uniformMatrix3fv(uMatrixLoc, false, M3.rotate(bMatrix, Math.PI))
                    gl.uniform1i(uUseTextureLoc, 1)
                    gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
                    gl.uniform1i(uUseTextureLoc, 0)
                } else {
                    gl.uniformMatrix3fv(uMatrixLoc, false, M3.rotate(bMatrix, Math.PI))
                    gl.drawArrays(gl.TRIANGLES, OFFSETS.DECOY_BODY_START, OFFSETS.DECOY_BODY_COUNT)
                }
            } else if (STATE.decoyAssetLoaded) {
                let frame = Math.floor(t.time * 10) % DECOY_ASSETS.length
                gl.bindTexture(gl.TEXTURE_2D, STATE.decoyTextures[frame])
                gl.uniformMatrix3fv(uMatrixLoc, false, bMatrix)
                gl.uniform1i(uUseTextureLoc, 1)
                gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
                gl.uniform1i(uUseTextureLoc, 0)
            } else {
                gl.uniformMatrix3fv(uMatrixLoc, false, bMatrix)
                gl.drawArrays(gl.TRIANGLES, OFFSETS.DECOY_BODY_START, OFFSETS.DECOY_BODY_COUNT)
            }
        }
    })

    particles.forEach((p) => {
        if (!p.active) return
        if (p.isBlood && STATE.bloodAssetLoaded) {
            let frame = Math.floor((1.0 - p.life) * 16) % BLOOD_ASSETS.length
            gl.bindTexture(gl.TEXTURE_2D, STATE.bloodTextures[frame])
            let m = M3.translate(proj, p.x, p.y)
            m = M3.scale(m, 1.5, 1.5)
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.uniform1i(uUseTextureLoc, 1)
            gl.drawArrays(gl.TRIANGLES, OFFSETS.SPRITE_QUAD_START, OFFSETS.SPRITE_QUAD_COUNT)
            gl.uniform1i(uUseTextureLoc, 0)
        } else {
            let m = M3.scale(M3.rotate(M3.translate(proj, p.x, p.y), p.rot), p.life, p.life)
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.uniform1i(uUseTextureLoc, 0)
            if (p.customColor) {
                gl.disableVertexAttribArray(aColorLoc)
                gl.vertexAttrib3f(aColorLoc, p.customColor[0], p.customColor[1], p.customColor[2])
                gl.drawArrays(gl.TRIANGLES, OFFSETS.PARTICLE_START, OFFSETS.PARTICLE_COUNT)
                gl.enableVertexAttribArray(aColorLoc)
            } else {
                gl.drawArrays(gl.TRIANGLES, p.isRed ? OFFSETS.BLOOD_DEMO_START : OFFSETS.PARTICLE_START, p.isRed ? OFFSETS.BLOOD_DEMO_COUNT : OFFSETS.PARTICLE_COUNT)
            }
        }
    })

    if (STATE.grassAssetLoaded) {
        gl.uniform1i(uUseTextureLoc, 1)
        gl.uniform2f(uUvScaleLoc, 1, 1)
        STATE.grassPositions.forEach((gp) => {
            gl.bindTexture(gl.TEXTURE_2D, STATE.grassTextures[gp.type])
            let wind = Math.sin(STATE.globalTime * 2.2 + gp.x * 0.01) * 10
            let m = M3.translate(proj, gp.x + wind, canvas.height + 20)
            m = M3.scale(m, gp.scale, gp.scale)
            gl.uniformMatrix3fv(uMatrixLoc, false, m)
            gl.drawArrays(gl.TRIANGLES, OFFSETS.GRASS_SPRITE_START, OFFSETS.GRASS_SPRITE_COUNT)
        })
        gl.uniform1i(uUseTextureLoc, 0)
    } else {
        gl.uniformMatrix3fv(uMatrixLoc, false, M3.translate(proj, 0, canvas.height))
        gl.drawArrays(gl.TRIANGLES, OFFSETS.GRASS_START, OFFSETS.GRASS_COUNT)
    }

    requestAnimationFrame(render)
}

window.addEventListener('mousemove', (e) => {
    STATE.isTouch = false
    const rect = canvas.getBoundingClientRect()
    STATE.mouseX = e.clientX - rect.left
    STATE.mouseY = e.clientY - rect.top
    UI.crosshair.style.display = 'block'
    UI.crosshair.style.left = STATE.mouseX + 'px'
    UI.crosshair.style.top = STATE.mouseY + 'px'
})
window.addEventListener('mousedown', (e) => {
    if (e.target === canvas) handleShoot()
})
window.addEventListener(
    'touchstart',
    (e) => {
        STATE.isTouch = true
        UI.crosshair.style.display = 'none'
        if (e.target === canvas && e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect()
            STATE.mouseX = e.touches[0].clientX - rect.left
            STATE.mouseY = e.touches[0].clientY - rect.top
            handleShoot()
        }
    },
    { passive: false },
)

initGeometries()
initAssets()
requestAnimationFrame(render)
