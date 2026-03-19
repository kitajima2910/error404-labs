/**
 * 3D Snake Game - Powered by Three.js
 * 
 * Features:
 * - 3D scene initialization with lighting
 * - Smooth grid-based movement
 * - Procedural food generation with obstacle avoidance
 * - Automatic camera tracking
 */

// =========================
// SCENE SETUP
// =========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.Fog(0x050505, 10, 60);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 50); // High vantage point initially
const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// =========================
// CONSTANTS
// =========================
const GRID_SIZE = 20;
const UNIT = 2; // Size of one grid cell
let MAP_SIZE = 400; // Map size check

const FOOD_CONFIG = [
    { color: 0xff4444, score: 10, size: 0.4, emissive: 0x330000, prob: 0.7 },
    { color: 0xffd700, score: 50, size: 0.5, emissive: 0x554400, prob: 0.1 },
    { color: 0x00ccff, score: 25, size: 0.45, emissive: 0x002233, prob: 0.2 }
];

const AI_NAMES_ASIAN = ["Hải Đăng", "Minh Anh", "Sakura", "Kenji", "Linh Chi", "Tuan Anh", "Yuki", "Mei", "Ji-woo", "Chen"];
const AI_NAMES_EURO = ["Alex", "Sophia", "Ivan", "Marco", "Elena", "Hans", "Chloe", "Dmitry", "Lars", "Clara"];
const AI_TYPES = { DUMB: 0, NORMAL: 1, SMART: 2 };

function getRandomAIName() {
    const list = Math.random() < 0.5 ? AI_NAMES_ASIAN : AI_NAMES_EURO;
    return list[Math.floor(Math.random() * list.length)];
}

// =========================
// PERFORMANCE OPTIMIZATION (Pre-allocated objects)
// =========================
const _tempVec1 = new THREE.Vector3();
const _tempVec2 = new THREE.Vector3();
const _tempVec3 = new THREE.Vector3();
const _tempBox1 = new THREE.Box3();
const _tempBox2 = new THREE.Box3();
const _tempQuat = new THREE.Quaternion();
const _upVec = new THREE.Vector3(0, 1, 0);
const _fwdVec = new THREE.Vector3(0, 0, 1);
const _collisionBoxSize = new THREE.Vector3(UNIT * 0.2, UNIT * 0.2, UNIT * 0.2);

// Constant Directions (Pre-allocated for AI)
const POSSIBLE_DIRS = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1)
];

// Shared Geometry/Materials for Food
const FOOD_GEOS = {
    small: new THREE.SphereGeometry(UNIT * 0.4, 8, 8),
    med: new THREE.SphereGeometry(UNIT * 0.45, 8, 8),
    large: new THREE.SphereGeometry(UNIT * 0.5, 8, 8)
};
const FOOD_MATS = FOOD_CONFIG.map(c => new THREE.MeshStandardMaterial({ color: c.color, emissive: c.emissive }));
const deathFoodGeo = new THREE.DodecahedronGeometry(UNIT * 0.35, 0);
const deathFoodMats = [
    new THREE.MeshStandardMaterial({ color: 0xff4444, emissive: 0x330000 }),
    new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0x554400 }),
    new THREE.MeshStandardMaterial({ color: 0x00ccff, emissive: 0x002233 })
];


// =========================
// LIGHTS
// =========================
const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(50, 100, 50);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.left = -100;
dirLight.shadow.camera.right = 100;
dirLight.shadow.camera.top = 100;
dirLight.shadow.camera.bottom = -100;
scene.add(dirLight);

// Hemisphere light for better colors
const hemiLight = new THREE.HemisphereLight(0x4488ff, 0x080820, 1.0);
scene.add(hemiLight);


// =========================
// ENVIRONMENT (Ground & Grid)
// =========================

// Ground (Large for infinite feel)
// Ground (Reflective and grid-based)
const groundGeo = new THREE.PlaneGeometry(2000, 2000);
const groundMat = new THREE.MeshStandardMaterial({ 
    color: 0x1a2e1a, // Deep forest green
    roughness: 0.1, 
    metalness: 0.4
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Procedural grid helper
const grid = new THREE.GridHelper(2000, 800, 0x006600, 0x111111);
grid.position.y = 0.02;
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);



// =========================
// DECORATIONS & OBSTACLES
// =========================
function createPineTree(x, z) {
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.5), new THREE.MeshStandardMaterial({ color: 0x4d3227 }));
    trunk.position.y = 0.75;
    group.add(trunk);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x1b4d2e });
    for(let i = 0; i < 3; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(1.2 - i*0.3, 1.5, 8), leafMat);
        leaf.position.y = 1.5 + i*0.8;
        group.add(leaf);
    }
    group.position.set(x, 0, z);
    group.visible = false; // Initially hidden
    scene.add(group);
    
    // Pre-calculate bounding box for static optimization
    group.updateMatrixWorld();
    group.userData.boundingBox = new THREE.Box3().setFromObject(group);
    
    obstacles.push(group);
}

function createRoundTree(x, z) {
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 2), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
    trunk.position.y = 1;
    group.add(trunk);
    const foliage = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), new THREE.MeshStandardMaterial({ color: 0x2e7d32 }));
    foliage.position.y = 2.5;
    group.add(foliage);
    group.position.set(x, 0, z);
    group.visible = false;
    scene.add(group);
    
    group.updateMatrixWorld();
    group.userData.boundingBox = new THREE.Box3().setFromObject(group);
    
    obstacles.push(group);
}

function createBush(x, z) {
    const bush = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), new THREE.MeshStandardMaterial({ color: 0x4b7e32 }));
    bush.position.set(x, 0.3, z);
    bush.visible = false;
    bush.userData = { type: 'bush' }; // Identify as bush for collision immunity
    scene.add(bush);
    
    bush.updateMatrixWorld();
    bush.userData.boundingBox = new THREE.Box3().setFromObject(bush);
    
    obstacles.push(bush);
}

function createRock(x, z) {
    const rockGeo = new THREE.DodecahedronGeometry(0.8 + Math.random() * 0.5, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x757575 });
    const rock = new THREE.Mesh(rockGeo, rockMat);
    rock.position.set(x, 0.4, z);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.castShadow = true;
    rock.visible = false;
    scene.add(rock);
    
    rock.updateMatrixWorld();
    rock.userData.boundingBox = new THREE.Box3().setFromObject(rock);
    
    obstacles.push(rock);
}

function createHouse(x, z) {
    const group = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshStandardMaterial({ color: 0x882222 }));
    base.position.y = 1.5;
    group.add(base);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(3, 2, 4), new THREE.MeshStandardMaterial({ color: 0x882222 }));
    roof.position.y = 4;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);
    group.position.set(x, 0, z);
    group.visible = false;
    group.userData = { type: 'house', collisionSize: new THREE.Vector3(3, 3, 3) };
    scene.add(group);
    
    group.updateMatrixWorld();
    group.userData.boundingBox = new THREE.Box3().setFromCenterAndSize(group.position, group.userData.collisionSize);
    
    obstacles.push(group);
}

function createTallHouse(x, z) {
    const group = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.5, 6, 2.5), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
    base.position.y = 3;
    group.add(base);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.5, 2.8), new THREE.MeshStandardMaterial({ color: 0x224488 }));
    roof.position.y = 6.25;
    group.add(roof);
    group.position.set(x, 0, z);
    group.visible = false;
    group.userData = { type: 'house', collisionSize: new THREE.Vector3(2.5, 6, 2.5) };
    scene.add(group);
    
    group.updateMatrixWorld();
    group.userData.boundingBox = new THREE.Box3().setFromCenterAndSize(group.position, group.userData.collisionSize);
    
    obstacles.push(group);
}

function createWideHouse(x, z) {
    const group = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(5, 2.5, 3), new THREE.MeshStandardMaterial({ color: 0xcbcaca }));
    base.position.y = 1.25;
    group.add(base);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(5.5, 1, 3.5), new THREE.MeshStandardMaterial({ color: 0x444444 }));
    roof.position.y = 3;
    group.add(roof);
    group.position.set(x, 0, z);
    group.visible = false;
    group.userData = { type: 'house', collisionSize: new THREE.Vector3(5, 2.5, 3) };
    scene.add(group);
    
    group.updateMatrixWorld();
    group.userData.boundingBox = new THREE.Box3().setFromCenterAndSize(group.position, group.userData.collisionSize);
    
    obstacles.push(group);
}
// =========================
// GAME STATE
// =========================
let gameStarted = false;
let isGameOver = false;
let playerSnake = null;
const allSnakes = [];
const activeFoods = [];
const obstacles = [];
let playerSelectedColor = '#4CAF50';

// Asset Loading
let snakeHeadModel = null;
const AI_HEAD_GEOS = [
    new THREE.BoxGeometry(UNIT * 0.6, UNIT * 0.6, UNIT * 0.6),
    new THREE.SphereGeometry(UNIT * 0.4, 16, 16),
    new THREE.DodecahedronGeometry(UNIT * 0.5, 0)
];

// Initialize Skin Buttons
function initSkinButtons() {
    document.querySelectorAll('.skin-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            playerSelectedColor = btn.getAttribute('data-color') || btn.dataset.color;
        });
    });
}
initSkinButtons();




// =========================
// VFX & SFX MANAGERS
// =========================
const particles = [];
function createEatParticles(pos, color) {
    const particleCount = 12;
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    for (let i = 0; i < particleCount; i++) {
        const material = new THREE.MeshStandardMaterial({ 
            color: color, 
            emissive: color,
            transparent: true,
            opacity: 1
        });
        const p = new THREE.Mesh(geometry, material);
        p.position.copy(pos);
        
        // Random velocity
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.4,
            Math.random() * 0.4,
            (Math.random() - 0.5) * 0.4
        );
        
        scene.add(p);
        particles.push({ mesh: p, velocity: velocity, life: 1.0 });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.mesh.position.add(p.velocity);
        p.velocity.y -= 0.01; // Gravity
        p.life -= 0.03;
        p.mesh.material.opacity = p.life;
        p.mesh.scale.multiplyScalar(0.96);
        
        if (p.life <= 0) {
            scene.remove(p.mesh);
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
            particles.splice(i, 1);
        }
    }
}

// Static Audio Management
const AudioCont = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let audioEnabled = true; // Default to ON to match UI
let bgmActive = false;
let bgmAudio = new Audio('nhac-nen.mp3'); 
bgmAudio.loop = true;
bgmAudio.volume = 0.3;
bgmAudio.preload = 'auto'; // Stream from source

let lastSoundStartTime = 0;
const MAX_SFX_PER_FRAME = 3;
let sfxCountInWindow = 0;
const SFX_WINDOW_MS = 100;

function playSound(freq, type = 'sine', duration = 0.1, volume = 0.1) {
    if (!audioEnabled) return; 
    
    // Throttling to prevent lag from too many sounds (e.g. mass AI death)
    const now = performance.now();
    if (now - lastSoundStartTime < SFX_WINDOW_MS) {
        if (sfxCountInWindow >= MAX_SFX_PER_FRAME) return;
        sfxCountInWindow++;
    } else {
        lastSoundStartTime = now;
        sfxCountInWindow = 1;
    }

    if (!audioCtx) audioCtx = new AudioCont();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    if (type === 'square' || type === 'sawtooth') {
        osc.frequency.exponentialRampToValueAtTime(freq / 2, audioCtx.currentTime + duration);
    }

    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
    
    // Explicit cleanup to avoid memory/node leaks
    osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
    };
}

function startBGM() {
    if (!audioEnabled || bgmActive || !bgmAudio) return;
    
    bgmAudio.play().then(() => {
        bgmActive = true;
    }).catch(e => {
        console.warn("BGM play deferred until user interaction:", e);
        bgmActive = false;
    });
}

function stopBGM() {
    if (bgmAudio) {
        bgmAudio.pause();
        // Keep current time for resume, or reset if preferred
        // bgmAudio.currentTime = 0; 
    }
    bgmActive = false;
}

function toggleAudio() {
    audioEnabled = !audioEnabled;
    const btn = document.getElementById('sound-toggle');
    if (audioEnabled) {
        btn.innerText = "🔊 Âm thanh: BẬT";
        if (gameStarted) startBGM();
    } else {
        btn.innerText = "🔈 Âm thanh: TẮT";
        stopBGM();
    }
}

const SFX = {
    eat: () => playSound(600, 'sine', 0.1, 0.15),
    die: () => playSound(150, 'sawtooth', 0.5, 0.2),
    spawn: () => playSound(440, 'sine', 0.2, 0.1)
};
let isFoodSpawnPause = false;
let foodSpawnCycleCount = 0;
let lastPeriodicSpawnTime = 0;
let lastCycleEndTime = 0;
let initialSpawnDone = false;

const snakeGeometry = new THREE.BoxGeometry(UNIT * 0.65, UNIT * 0.65, UNIT * 0.65);

// Scores and local storage
let highScore = parseInt(localStorage.getItem('snake3d_high_score')) || 0;
const highScoreUi = document.getElementById('high-score-ui');
if (highScoreUi) highScoreUi.innerText = highScore;

function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snake3d_high_score', highScore);
        document.getElementById('high-score-ui').innerText = highScore;
    }
}

const minimapCanvas = document.getElementById('minimap');
const minimapCtx = minimapCanvas ? minimapCanvas.getContext('2d') : null;
if (minimapCanvas) {
    minimapCanvas.width = 200;
    minimapCanvas.height = 200;
}

function updateMinimap() {
    if (!minimapCtx || !gameStarted) {
        if (minimapCtx) minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
        return;
    }
    const ctx = minimapCtx;
    const cw = minimapCanvas.width;
    const ch = minimapCanvas.height;

    ctx.save(); // Added save

    // Circular Clip
    ctx.beginPath();
    ctx.arc(cw/2, ch/2, cw/2, 0, Math.PI * 2);
    ctx.clip();

    // Clear
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, cw, ch);

    // Grid center lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(cw/2, 0); ctx.lineTo(cw/2, ch);
    ctx.moveTo(0, ch/2); ctx.lineTo(cw, ch/2);
    ctx.stroke();

    const scale = cw / (MAP_SIZE * 2);

    // Draw Foods
    activeFoods.forEach(f => {
        const mx = cw/2 + f.position.x * scale;
        const mz = ch/2 + f.position.z * scale;
        ctx.fillStyle = f.userData.isDeathFood ? '#ffffff' : '#ffcc00';
        ctx.beginPath();
        ctx.arc(mx, mz, 1.5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw Snakes
    allSnakes.forEach(s => {
        if (s.isDead) return;
        ctx.fillStyle = `#${s.headMat.color.getHexString()}`;
        const mx = cw/2 + s.snake[0].x * scale;
        const mz = ch/2 + s.snake[0].z * scale;
        
        // Head
        ctx.beginPath();
        ctx.arc(mx, mz, s.isAI ? 2.5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Body path (simple line)
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mx, mz);
        s.snake.forEach(p => {
            ctx.lineTo(cw/2 + p.x * scale, ch/2 + p.z * scale);
        });
        ctx.stroke();
    });

    ctx.restore(); // Restore the clipping state
}

function findSafeSpawnPos() {
    let rx = 0, rz = 0, safe = false;
    let attempts = 0;
    const tempPos = _tempVec1;
    while(!safe && attempts < 100) {
        attempts++;
        rx = Math.floor((Math.random() - 0.5) * (MAP_SIZE * 1.8) / UNIT) * UNIT;
        rz = Math.floor((Math.random() - 0.5) * (MAP_SIZE * 1.8) / UNIT) * UNIT;
        tempPos.set(rx, UNIT/2, rz);
        // Check distance from other living snakes
        safe = !allSnakes.some(s => {
            if (s.isDead) return false;
            // Far check first for performance
            if (s.snake[0].distanceToSquared(tempPos) > 400) return false; 
            return s.snake.some(p => p.distanceTo(tempPos) < 6);
        });
    }
    return new THREE.Vector3(rx, UNIT/2, rz);
}

function spawnFood(currentTime, forcedCount = null) {
    let naturalFoodCount = activeFoods.filter(f => !f.userData.isDeathFood).length;
    const TARGET_FOOD = 200; 
    
    const countToSpawn = forcedCount !== null ? forcedCount : (TARGET_FOOD - naturalFoodCount);
    let spawned = 0;

    while (spawned < countToSpawn) { 
        spawned++;
        let valid = false;
        let attempts = 0;
        
        const rand = Math.random();
        let config = FOOD_CONFIG[0];
        let cumulative = 0;
        for(const c of FOOD_CONFIG) {
            cumulative += c.prob;
            if(rand < cumulative) { config = c; break; }
        }

        let geo = FOOD_GEOS.med;
        if (config.size < 0.42) geo = FOOD_GEOS.small;
        else if (config.size > 0.48) geo = FOOD_GEOS.large;

        const mesh = new THREE.Mesh(geo, FOOD_MATS[cumulative < 0.75 ? 0 : (cumulative < 0.95 ? 2 : 1)]); // Match config index
        mesh.castShadow = true;
        mesh.userData = { score: config.score, spawnTime: currentTime, isDeathFood: false };
        mesh.visible = gameStarted;
        
        let x, z;
        while (!valid && attempts < 20) {
            attempts++;
            x = (Math.random() - 0.5) * MAP_SIZE;
            z = (Math.random() - 0.5) * MAP_SIZE;
            mesh.position.set(x, UNIT/2, z);
            
            const tooCloseToFood = activeFoods.some(f => f.position.distanceTo(mesh.position) < 4);
            if (tooCloseToFood) continue;

            const snakeCollision = allSnakes.some(s => !s.isDead && s.snake[0].distanceTo(mesh.position) < 5);
            if (snakeCollision) continue;
            
            _tempBox1.setFromObject(mesh);
            const obstacleCollision = obstacles.some(o => {
                if (!o.userData.boundingBox) return false;
                return o.userData.boundingBox.intersectsBox(_tempBox1);
            });
            if (obstacleCollision) continue;

            valid = true;
        }

        if (valid) {
            scene.add(mesh);
            activeFoods.push(mesh);
            if (config.score > 20) {
                const light = new THREE.PointLight(config.color, 1, 4);
                mesh.add(light);
            }
        }
    }

    if (forcedCount === null) {
        initialSpawnDone = true;
        lastPeriodicSpawnTime = currentTime;
    }
}



function getSafeSpawnPosition() {
    let x, z;
    const safeRadius = 50; 
    do {
        x = (Math.random() - 0.5) * (MAP_SIZE * 1.8);
        z = (Math.random() - 0.5) * (MAP_SIZE * 1.8);
    } while (Math.abs(x) < safeRadius && Math.abs(z) < safeRadius);
    return new THREE.Vector3(x, UNIT/2, z);
}

function getDistinctAIColor() {
    // Generate a color that is not too close to the player's color
    let h;
    const pHSL = { h: 0, s: 0, l: 0 };
    new THREE.Color(playerSelectedColor).getHSL(pHSL);

    for (let i = 0; i < 10; i++) {
        h = Math.random();
        if (Math.abs(h - pHSL.h) > 0.15 && Math.abs(h - pHSL.h) < 0.85) break;
    }

    const color = new THREE.Color().setHSL(h, 0.8, 0.5);
    return '#' + color.getHexString();
}

// =========================
// SNAKE CLASS
// =========================
class Snake {
    constructor(isAI = false, startPos = new THREE.Vector3(0, UNIT/2, 0), colorHead = 0x4CAF50, colorBody = 0x2E7D32, name = "Bạn", aiType = AI_TYPES.NORMAL, options = {}) {
        this.isAI = isAI;
        this.name = name;
        this.aiType = aiType;
        this.isTeammate = options.isTeammate || false;
        this.aiDecisionCooldown = 0;
        this.aiFollowTarget = null;
        
        this.bounceTurnTicks = 0; // Cooldown to prevent jittering after bounce
        this.snake = [
            startPos.clone(),
            startPos.clone().add(new THREE.Vector3(-UNIT, 0, 0)),
            startPos.clone().add(new THREE.Vector3(-UNIT * 2, 0, 0))
        ];
        this.snakeParts = []; // Meshes
        this.visualSnakePos = []; 
        
        // Randomize initial direction
        const randomDirIndex = Math.floor(Math.random() * POSSIBLE_DIRS.length);
        this.direction = POSSIBLE_DIRS[randomDirIndex].clone();
        this.nextDirection = this.direction.clone();
        
        this.aiMoveTicks = 0; // Steps since last random turn
        this.score = 0;
        this.isDead = false;
        this.deathTime = null; 
        this.spawnTime = performance.now();
        this.prevHead = startPos.clone(); // For interpolation
        this.headScale = 1.0; 
        
        // Path history for smooth slithering

        this.pathHistory = [];
        this.maxPathHistory = 1000; // Keep enough points for long snakes
        
        this.headMat = new THREE.MeshStandardMaterial({ color: colorHead, roughness: 0.3, metalness: 0.5 });
        this.bodyMat = new THREE.MeshStandardMaterial({ color: colorBody, roughness: 0.3, metalness: 0.5 });
        
        // Dynamic PointLight for player head
        if (!this.isAI) {
            this.light = new THREE.PointLight(colorHead, 2, 8);
            this.light.position.y = 1;
            this.light.visible = gameStarted;
            scene.add(this.light);
        }

        this.init();
    }



    init() {
        this.snake.forEach((pos, i) => {
            const mesh = this.createSegmentMesh(i);
            mesh.position.copy(pos);
            mesh.visible = gameStarted;
            scene.add(mesh);
            this.snakeParts.push(mesh);
            this.visualSnakePos.push(pos.clone());
        });
        
        // Initialize path history with starting positions
        for (let i = 0; i < 50; i++) {
            this.pathHistory.push(this.snake[0].clone());
        }
    }

    replaceHeadMesh() {
        if (this.isAI || this.isDead || this.snakeParts.length === 0) return;
        
        const oldHead = this.snakeParts[0];
        const newHead = this.createSegmentMesh(0);
        
        // Copy state from old head
        newHead.position.copy(oldHead.position);
        newHead.rotation.copy(oldHead.rotation);
        
        scene.remove(oldHead);
        scene.add(newHead);
        this.snakeParts[0] = newHead;
    }



    grow(n = 1) {
        for (let i = 0; i < n; i++) {
            // Push same tail pos, updateVisuals will handle the path following
            this.snake.push(this.snake[this.snake.length - 1].clone());
        }
    }


    createSegmentMesh(index) {
        if (index === 0) {
            let head;
            if (this.isAI) {
                // AI bots use random primitive shapes
                const randIdx = Math.floor(Math.random() * AI_HEAD_GEOS.length);
                head = new THREE.Mesh(AI_HEAD_GEOS[randIdx], this.headMat);
            } else {
                // Player uses GLB (with cube fallback)
                if (snakeHeadModel) {
                    head = snakeHeadModel.clone();
                    head.traverse(child => {
                        if (child.isMesh && child.material) {
                            child.material = child.material.clone();
                            child.material.color.set(this.headMat.color);
                        }
                    });
                } else {
                    // Fallback to cube
                    head = new THREE.Mesh(snakeGeometry, this.headMat);
                }
            }
            head.castShadow = true;
            head.renderOrder = 10; // Ensure head renders over body
            if (head.material) head.material.depthTest = true; 
            return head;
        } else {
            const bodyGeo = new THREE.SphereGeometry(UNIT * 0.45, 16, 16);

            const mesh = new THREE.Mesh(bodyGeo, this.bodyMat);
            mesh.castShadow = true;
            return mesh;
        }
    }


    updateAI() {
        if (this.isDead || !this.isAI) return;

        // Occasional random turn to avoid hitting walls constantly (simplified)
        if (Math.random() < 0.02) { // 2% chance per frame to turn
            const validDirs = POSSIBLE_DIRS.filter(d => {
                // Prevent reversing direction (180 degree turn)
                _tempVec1.copy(d).add(this.direction);
                return _tempVec1.lengthSq() > 0.1; 
            });
            this.nextDirection.copy(validDirs[Math.floor(Math.random() * validDirs.length)]);
        }
    }

    step() {
        if (this.isDead) return;

        this.prevHead.copy(this.snake[0]); // Save current as previous before update
        this.direction.copy(this.nextDirection);
        const newHead = this.snake[0].clone().add(this.direction.clone().multiplyScalar(UNIT));

        // 1. Food Collision FIRST (prioritize eating)
        let ate = false;
        const foodDistLimit = 1.2; // Increased from 0.9 for better reliability, especially death food
        for (let i = activeFoods.length - 1; i >= 0; i--) {
            const f = activeFoods[i];
            // Collision with head
            if (newHead.distanceTo(f.position) < foodDistLimit) {
                this.score += f.userData.score;
                if (!this.isAI) {
                    document.getElementById('score').innerText = this.score;
                    updateHighScore(this.score);
                }
                scene.remove(f);
                activeFoods.splice(i, 1);
                ate = true;
                
                // VFX & SFX
                this.headScale = 1.6; // Scale pop
                createEatParticles(f.position, f.material.color);
                SFX.eat();
                break;
            }
        }

        // 2. Collision Check (Obstacles + Other Snakes)
        if (Math.abs(newHead.x) > MAP_SIZE || Math.abs(newHead.z) > MAP_SIZE) {
            this.die();
            return;
        }

        _tempBox1.setFromCenterAndSize(newHead, _collisionBoxSize);
        
        const hitObstacle = obstacles.some(o => {
            if (o.userData.type === 'bush' || !o.userData.boundingBox) return false; 
            _tempBox2.copy(o.userData.boundingBox);
            _tempBox2.expandByScalar(-0.05); 
            return _tempBox2.intersectsBox(_tempBox1);
        });

        let victim = null;

        // Optimized combined check: Check all snakes for head/body collisions
        for (const other of allSnakes) {
            if (other.isDead) continue;
            
            const otherHead = other.snake[0];
            const distSq = newHead.distanceToSquared(otherHead);

            // Skip distance check if very far (Performance boost)
            if (distSq > 900) continue; 

            // 1. Check head-to-head collision
            if (other !== this && distSq < 3.24) { // 1.8^2
                victim = other;
                break;
            }

            // 2. Check head-to-body collision
            const bodyHitIndex = other.snake.findIndex((p, i) => {
                if (other === this) return false; 
                if (!ate && other === this && i === this.snake.length - 1) return false;
                return p.distanceToSquared(newHead) < 2.25; // 1.5^2
            });

            if (bodyHitIndex !== -1) {
                victim = other;
                break;
            }
        }

        const isSpawning = !this.isAI && (performance.now() - this.spawnTime) < 2000;
        if (!isSpawning && (hitObstacle || victim)) {
            if (victim) {
                const sameColor = this.headMat.color.equals(victim.headMat.color);
                
                if (sameColor) {
                    // Prevent same color from eating each other - they just pass through if head-on
                    // OR they die if they hit the body. Let's make them ignore each other's body too as requested.
                    // "Prevent snakes of the same color from eating each other"
                    // If we return here, we ignore the collision
                    return; 
                }

                // Equal length: Bounce away
                if (this.snake.length === victim.snake.length) {
                    this.prevHead.copy(newHead); // Visual bounce: lerp back from hit point
                    
                    // Improved bounce: Pick a random 90-degree turn and lock it for 2 ticks
                    const possibleTurns = this.direction.x !== 0 ? 
                        [new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1)] :
                        [new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0)];
                    
                    this.nextDirection.copy(possibleTurns[Math.floor(Math.random() * possibleTurns.length)]);
                    this.bounceTurnTicks = 2; // Lock this direction to clear collision area
                    return; // Skip the unshift (stay at current pos)
                }

                // Agar.io style: Bigger one eats smaller one
                if (this.score > victim.score) {
                    this.grow(Math.floor(victim.score / 10) + 1);
                    if (!this.isAI) updateHighScore(this.score);
                    victim.die();
                    return; // We survive
                } else {
                    // We are smaller, we die
                    this.die();
                    return;
                }
            }
            // If it was an obstacle or we lose the fight
            this.die();
            SFX.die();
            return;
        }

        this.snake.unshift(newHead);

        if (ate) {
            spawnFood(performance.now());
            // Add visual pos for the new segment
            this.visualSnakePos.push(this.snake[this.snake.length - 1].clone());
        } else {
            this.snake.pop();
        }
    }


    updateVisuals(t) {
        if (this.isDead) return;

        // Ensure we have meshes for all segments
        while (this.snake.length > this.snakeParts.length) {
            const mesh = this.createSegmentMesh(this.snakeParts.length);
            scene.add(mesh);
            this.snakeParts.push(mesh);
            this.visualSnakePos.push(this.snake[0].clone());
        }

        // 1. HEAD INTERPOLATION (Logic grid to visual)
        if (!this.visualSnakePos[0]) this.visualSnakePos[0] = this.snake[0].clone();
        
        // Use moveProgress (t) for smooth interpolation
        this.visualSnakePos[0].lerpVectors(this.prevHead, this.snake[0], t);
        
        // Record path history (only when head moves significantly)
        if (this.pathHistory.length === 0 || this.pathHistory[0].distanceTo(this.visualSnakePos[0]) > 0.1) {
            this.pathHistory.unshift(this.visualSnakePos[0].clone());
            if (this.pathHistory.length > this.maxPathHistory) this.pathHistory.pop();
        }

        // 2. BODY SEGMENT PLACEMENT (Following the path)
        const time = performance.now() * 0.005;
        const slitherAmp = 0.35; // How much it shakes
        const slitherFreq = 0.5; // How fast it ripples through body
        
        // Distance between visual segments on the path
        const segmentSpacing = 1.6; // Slightly less than UNIT for overlap

        this.snakeParts.forEach((mesh, i) => {
            if (i === 0) {
                // Head placement
                mesh.position.copy(this.visualSnakePos[0]);
                
                // Scale Pop Animation
                if (this.headScale > 1.0) {
                    this.headScale -= 0.05;
                } else {
                    this.headScale = 1.0;
                }
                mesh.scale.set(this.headScale, this.headScale, this.headScale);
                
                // Head rotation
                if (this.direction.x === 1) mesh.rotation.y = -Math.PI/2;
                else if (this.direction.x === -1) mesh.rotation.y = Math.PI/2;
                else if (this.direction.z === 1) mesh.rotation.y = Math.PI;
                else if (this.direction.z === -1) mesh.rotation.y = 0;
                
                // Gentle head bobbing
                mesh.rotation.z = Math.sin(time * 2) * 0.1;
                mesh.rotation.x = Math.sin(time * 3) * 0.05;
                
                return;
            }

            // Find position in path history for this segment
            const pathIndex = Math.min(Math.floor(i * segmentSpacing * 5), this.pathHistory.length - 1);
            _tempVec1.copy(this.pathHistory[pathIndex]);
            
            // Apply slithering offset (sideways)
            const slitherOffset = Math.sin(time * 5 - i * slitherFreq) * slitherAmp;
            
            // Calculate side vector for slithering
            const prevPathPos = this.pathHistory[Math.max(0, pathIndex - 1)];
            const nextPathPos = this.pathHistory[Math.min(this.pathHistory.length - 1, pathIndex + 1)];
            
            // Re-use _tempVec2 for tangent, _tempVec3 for side
            _tempVec2.copy(nextPathPos).sub(prevPathPos).normalize();
            _tempVec3.crossVectors(_tempVec2, _upVec).normalize();
            
            _tempVec1.add(_tempVec3.multiplyScalar(slitherOffset));
            
            // Move segment to path position
            mesh.position.copy(_tempVec1);
            this.visualSnakePos[i] = _tempVec1.clone(); 

            // Body rotation to face movement direction
            if (_tempVec2.lengthSq() > 0.01) {
                _tempQuat.setFromUnitVectors(_fwdVec, _tempVec2);
                mesh.quaternion.slerp(_tempQuat, 0.2);
            }

            // Tapering scale
            const scaleDown = Math.max(0.4, 1.0 - (i / this.snakeParts.length) * 0.4);
            mesh.scale.set(scaleDown, scaleDown, scaleDown);
        });

        // Update light position
        if (this.light && this.snakeParts[0]) {
            this.light.position.copy(this.snakeParts[0].position);
            this.light.position.y += 1.5;
        }
    }



    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.deathTime = performance.now();

        if (!this.isAI) {
            // Player death: Show Game Over and stop the world
            isGameOver = true;
            document.getElementById('final-score').innerText = this.score;
            document.getElementById('game-over').style.display = 'block';
        }


        // Turn to food (Persistent)
        this.snake.forEach(pos => {
            const mat = deathFoodMats[Math.floor(Math.random() * deathFoodMats.length)];
            const f = new THREE.Mesh(deathFoodGeo, mat);
            f.position.copy(pos);
            f.userData = { 
                score: 10, 
                isDeathFood: true,
                spawnTime: performance.now() 
            };
            scene.add(f);
            activeFoods.push(f);
        });


        // Cleanup meshes
        this.snakeParts.forEach(m => scene.remove(m));
        if (this.light) scene.remove(this.light);
    }
}


function respawnPlayer() {
    isGameOver = false;
    // Hide UI
    document.getElementById('game-over').style.display = 'none';

    // Replace the player snake object
    const spawnPos = findSafeSpawnPos();
    const playerColorHex = parseInt(playerSelectedColor.replace('#', '0x'));
    // Darker version for body
    const colorH = new THREE.Color(playerColorHex);
    const colorB = colorH.clone().multiplyScalar(0.6);
    const pName = document.getElementById('player-name').value.trim() || "You";

    const newPlayer = new Snake(false, spawnPos, colorH, colorB, pName);
    const idx = allSnakes.indexOf(playerSnake);
    if (idx !== -1) allSnakes[idx] = newPlayer;
    playerSnake = newPlayer;
    
    document.getElementById('score').innerText = "0";
}




let initStarted = false;
async function initGame() {
    if (initStarted) return;
    initStarted = true;
    
    // 1. POPULATE WORLD USING JITTERED GRID FOR EVEN DISTRIBUTION
    const GRID_DIVS = 20; // Divide map into 20x20 grid
    const cellWidth = (MAP_SIZE * 2) / GRID_DIVS;
    const itemsPerCell = 1; // Average 1 item per cell for even coverage

    function populateChunk() {
        for (let gx = 0; gx < GRID_DIVS; gx++) {
            for (let gz = 0; gz < GRID_DIVS; gz++) {
                // Base coordinates for this cell
                const baseX = -MAP_SIZE + gx * cellWidth;
                const baseZ = -MAP_SIZE + gz * cellWidth;

                // Add random jitter within cell
                const tx = baseX + Math.random() * cellWidth;
                const tz = baseZ + Math.random() * cellWidth;

                // Skip center area for spawn (Expanded safety zone)
                if (Math.abs(tx) < 40 && Math.abs(tz) < 40) continue;

                const type = Math.random();
                if (type < 0.2) createPineTree(tx, tz);
                else if (type < 0.4) createRoundTree(tx, tz);
                else if (type < 0.6) createBush(tx, tz);
                else if (type < 0.8) createRock(tx, tz);
                else if (type < 0.9) createHouse(tx, tz);
                else if (type < 0.95) createTallHouse(tx, tz);
                else createWideHouse(tx, tz);
            }
        }
        // World done, start AI population
        spawnAIChunk();
    }

    const playerColorHex = parseInt(playerSelectedColor.replace('#', '0x'));
    const colorH = new THREE.Color(playerColorHex);
    const colorB = colorH.clone().multiplyScalar(0.6);
    const pName = document.getElementById('player-name').value.trim() || "You";

    playerSnake = new Snake(false, new THREE.Vector3(0, UNIT/2, 0), colorH, colorB, pName);
    allSnakes.push(playerSnake);
    
    // 2. SPAWN AI IN CHUNKS
    const totalAI = 100;
    const aiChunkSize = 10;
    let aiCreated = 0;

    function spawnAIChunk() {
        if (aiCreated < totalAI) {
            const count = Math.min(aiChunkSize, totalAI - aiCreated);
            for (let i = 0; i < count; i++) {
                const colorH = new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
                const colorB = colorH.clone().multiplyScalar(0.6);
                
                // Keep safe spawn position for stability
                const spawnPos = getSafeSpawnPosition();
                const name = getRandomAIName();
                const aiType = Math.floor(Math.random() * 3); 
                allSnakes.push(new Snake(true, spawnPos, colorH, colorB, name, aiType));
            }
            aiCreated += count;
            requestAnimationFrame(spawnAIChunk);
        } else {
            // All AI spawned, spawn initial food and start loop
            spawnFood(0);
            animate(0);
        }
    }

    // Start the process
    populateChunk();
}


function updateLeaderboard() {
    const list = document.getElementById('leader-list');
    if (!list) return;

    const sorted = [...allSnakes].sort((a, b) => b.score - a.score);
    list.innerHTML = sorted.map((s, i) => `
        <div class="leader-item ${!s.isAI ? 'me' : ''}">
            <span>${i + 1}. ${s.name} ${s.isDead ? '(X)' : ''}</span>
            <span>${s.score}</span>
        </div>
    `).join('');
}

// =========================
// CONTROLS
// =========================
function triggerStart() {
    console.log("triggerStart triggered");
    if (gameStarted) return;
    
    // Capture final identity choices
    const pName = document.getElementById('player-name').value.trim() || "You";
    const playerColorHex = parseInt(playerSelectedColor.replace('#', '0x'));
    const colorH = new THREE.Color(playerColorHex);
    const colorB = colorH.clone().multiplyScalar(0.6);

    if (playerSnake) {
        playerSnake.name = pName;
        playerSnake.headMat.color.copy(colorH);
        playerSnake.bodyMat.color.copy(colorB);
        if (playerSnake.light) playerSnake.light.color.copy(colorH);
    }

    gameStarted = true;
    
    // Show all snakes and food
    allSnakes.forEach(s => {
        s.snakeParts.forEach(p => p.visible = true);
        if (s.light) s.light.visible = true;
    });
    activeFoods.forEach(f => f.visible = true);
    obstacles.forEach(o => o.visible = true);
    document.getElementById('start-screen').style.display = 'none';
    SFX.spawn();
    startBGM(); // Start music on game start
}

// Start button click listener - ATTACH IMMEDIATELY (script is at end of body)
const startBtn = document.getElementById('start-btn');
if (startBtn) {
    startBtn.addEventListener('click', (e) => {
        console.log("Start button was CLICKED");
        triggerStart();
    });
}

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    // Start game
    if (!gameStarted && (e.code === 'Space' || e.code === 'Enter')) {
        triggerStart();
        return;
    }

    // Handles for Game Over state
    if (playerSnake && playerSnake.isDead) {
        if (e.code === 'Space' || e.code === 'Enter') {
            respawnPlayer();
        } else if (e.code === 'Escape') {
            window.location.reload();
        }
        return;
    }

    if (!playerSnake || playerSnake.isDead) return;
    if ((key === 'w' || e.key === 'ArrowUp') && playerSnake.direction.z !== 1) playerSnake.nextDirection.set(0, 0, -1);
    else if ((key === 's' || e.key === 'ArrowDown') && playerSnake.direction.z !== -1) playerSnake.nextDirection.set(0, 0, 1);
    else if ((key === 'a' || e.key === 'ArrowLeft') && playerSnake.direction.x !== 1) playerSnake.nextDirection.set(-1, 0, 0);
    else if ((key === 'd' || e.key === 'ArrowRight') && playerSnake.direction.x !== -1) playerSnake.nextDirection.set(1, 0, 0);
});

// Sound Toggle
document.getElementById('sound-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAudio();
});


// =========================
// GAME LOOP
// =========================
let lastUpdateTime = 0;
const MOVE_INTERVAL = 220;
const cameraTarget = new THREE.Vector3();
const VISIBILITY_DIST = 60; 

function updateGame(time) {
    // 1. NON-SIMULATION UPDATES (Camera/UI)
    updateCamera(time);
    
    if (isGameOver) return;


    if (gameStarted && time - lastUpdateTime > MOVE_INTERVAL) {
        allSnakes.forEach((s, idx) => {
            if (!s.isDead) { // Only update living snakes
                s.updateAI();
                s.step();
            } else if (s.isAI && s.deathTime && s.isDead) {
                // AI Respawn logic
                if (performance.now() - s.deathTime > 5000) { // 5 second delay
                    const spawnPos = findSafeSpawnPos();
                    const aiType = Math.floor(Math.random() * 3);
                    allSnakes[idx] = new Snake(true, spawnPos, s.colorHead, s.colorBody, getRandomAIName(), aiType);
                }
            }
        });
        // Cycle throttling for UI
        const moveTick = Math.floor(time / MOVE_INTERVAL);
        if (moveTick % 3 === 0) updateLeaderboard();
        if (moveTick % 2 === 0) updateMinimap();

        lastUpdateTime = time;
    }

    // Calculate move progress (0 to 1) for interpolation
    const moveProgress = Math.min(1.0, (time - lastUpdateTime) / MOVE_INTERVAL);
    allSnakes.forEach(s => {
        // Simple culling: don't update visuals if very far from camera focus
        if (s.snake[0].distanceToSquared(cameraTarget) < 10000) { 
            s.updateVisuals(moveProgress);
        }
    });

    // Food Anims
    activeFoods.forEach(f => {
        f.position.y = UNIT/2 + Math.sin(time * 0.005) * 0.2;
        f.rotation.y += 0.02;
        // Pulse scale
        const s = 1 + Math.sin(time * 0.01) * 0.1;
        f.scale.set(s, s, s);
    });

    // Optimized cyclic food spawn: 
    // Cycle: Spawn in batches of 15 every 2 seconds. After each cycle, pause 10s.
    if (gameStarted) {
        if (isFoodSpawnPause) {
            if (time - lastCycleEndTime > 10000) {
                isFoodSpawnPause = false;
                foodSpawnCycleCount = 0;
                lastPeriodicSpawnTime = time; 
            }
        } else {
            if (time - lastPeriodicSpawnTime > 2000) {
                spawnFood(time, 15);
                foodSpawnCycleCount++;
                lastPeriodicSpawnTime = time;
                
                // End cycle after e.g. 5 batches (10 seconds of spawning total)
                if (foodSpawnCycleCount >= 5) {
                    isFoodSpawnPause = true;
                    lastCycleEndTime = time;
                }
            }
        }
    }

    // Optimization: Hide off-screen obstacles
    obstacles.forEach(o => {
        const dist = o.position.distanceTo(cameraTarget);
        o.visible = dist < VISIBILITY_DIST;
    });
}


function updateCamera(time) {
    // Camera follow
    let focusTarget = null;
    if (playerSnake && !playerSnake.isDead) {
        focusTarget = playerSnake.visualSnakePos[0];
        // Ground follows player
        ground.position.set(playerSnake.snake[0].x, 0, playerSnake.snake[0].z);
    } else {
        // Player is dead, follow the leader
        const sorted = [...allSnakes].filter(s => !s.isDead).sort((a, b) => b.score - a.score);
        if (sorted.length > 0) {
            focusTarget = sorted[0].visualSnakePos[0];
            ground.position.set(sorted[0].snake[0].x, 0, sorted[0].snake[0].z);
        }
    }

    if (focusTarget) {
        cameraTarget.lerp(focusTarget, 0.1);
        _tempVec1.set(cameraTarget.x, 22, cameraTarget.z + 18);
        camera.position.lerp(_tempVec1, 0.05);
        camera.lookAt(cameraTarget);
    }
}

// Animation Loop
let animateStarted = false;
let lastFrameTime = 0;
const FPS_LIMIT = 60;
const FRAME_MIN_TIME = (1000 / FPS_LIMIT);

function animate() {
    if (animateStarted) return;
    animateStarted = true;
    
    function loop(now) {
        requestAnimationFrame(loop);
        
        // FPS Limit check
        if (now - lastFrameTime < FRAME_MIN_TIME) return;
        lastFrameTime = now;
        
        if (gameStarted && !isGameOver) {
            updateGame(now);
        }
        
        updateParticles();
        renderer.render(scene, camera);
    }
    loop(performance.now());
}

// Ensure initGame is called once
initGame();
