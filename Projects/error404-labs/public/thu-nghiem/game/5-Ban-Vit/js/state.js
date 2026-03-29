/**
 * Game Configuration & State
 */
const CONFIG = {
    MAX_AMMO: 10,
    RELOAD_TIME: 1.0,
    MAX_LIVES: 3,
    MAX_TARGETS: 25,
    MAX_PARTICLES: 400,
    SPAWN_RATE_BASE: 0.8,
    SESSION_DURATION: 120,
    GAME_MODE_2P: true,
    HITBOX_RADIUS: 50,
}

const STATE = {
    phase: 'MENU',
    currentPlayer: 1,
    p1Score: 0,
    p2Score: 0,
    score: 0,
    lives: 3,
    ammo: 10,
    combo: 1,
    level: 1,
    timeLeft: 120,
    timeSinceLastSpawn: 0,
    timeSinceLastReload: 0,
    globalTime: 0,
    mouseX: -100,
    mouseY: -100,
    isTouch: false,
    shakeMagnitude: 0,
    flashAlpha: 0,

    duckAssetLoaded: false,
    duckTextures: [],
    decoyAssetLoaded: false,
    decoyTextures: [],
    grassAssetLoaded: false,
    grassTextures: [],
    grassPositions: [],
    bloodAssetLoaded: false,
    bloodTextures: [],
    duckShotAssetLoaded: false,
    duckShotTextures: [],

    // Plane assets
    planeAssetLoaded: false,
    planeTextures: [],
    planeFallAssetLoaded: false,
    planeFallTextures: [],

    // Cloud assets
    cloudType1AssetLoaded: false,
    cloudType1Textures: [],
    cloudType2AssetLoaded: false,
    cloudType2Textures: [],

    audioCtx: null,
    bgmNextTime: 0,
    bgmIndex: 0,
    bgmTempo: 0.3,
    bgmBuffer: null,
    bgmSource: null,

    // Demo entities
    plane: {
        x: -200,
        y: 100,
        vx: 150,
        vy: 0,
        active: false,
        dead: false,
        cooldown: 5,
        time: 0,
        fallTime: 0,
    },
    balloons: [],
    stars: [],
    balloonAssetLoaded: false,
    balloonTextures: [],
    balloonFallAssetLoaded: false,
    balloonFallTextures: [],
    starAssetLoaded: false,
    starTextures: [],
    clouds: [],
}
