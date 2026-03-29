/**
 * UI Element Mapping
 */
const UI = {
    crosshair: document.getElementById('crosshair'),
    hud: document.getElementById('hud'),
    hudPlayer: document.getElementById('hud-player'),
    hudScore: document.getElementById('hud-score'),
    hudCombo: document.getElementById('hud-combo'),
    hudLives: document.getElementById('hud-lives'),
    hudAmmo: document.getElementById('hud-ammo'),
    hudTimer: document.getElementById('hud-timer'),
    flashOverlay: document.getElementById('flash-overlay'),
    screens: {
        start: document.getElementById('start-screen'),
        transition: document.getElementById('transition-screen'),
        gameOver: document.getElementById('game-over-screen'),
    },
}

function updateHUD() {
    UI.hudScore.innerText = `Điểm: ${STATE.score}`
    UI.hudCombo.innerText = `Combo: x${STATE.combo}`
    UI.hudLives.innerText = `Mạng: ${STATE.lives}`
    UI.hudAmmo.innerText = `Đạn: ${STATE.ammo}/${CONFIG.MAX_AMMO}`
    UI.hudTimer.innerText = `Thời gian: ${Math.ceil(STATE.timeLeft)}s`
    if (STATE.timeLeft < 10) UI.hudTimer.classList.add('warning')
    else UI.hudTimer.classList.remove('warning')
}

function resetGame() {
    UI.screens.gameOver.classList.add('hidden')
    UI.screens.start.classList.remove('hidden')
}
