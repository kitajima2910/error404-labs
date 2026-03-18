/**
 * Game Rắn Săn Mồi 3D - Sử dụng Three.js
 * 
 * Tính năng:
 * - Khởi tạo cảnh 3D với ánh sáng
 * - Di chuyển mượt mà giữa các ô lưới
 * - Tạo thức ăn ngẫu nhiên tránh chướng ngại vật
 * - Camera tự động bám theo đầu rắn
 */

// =========================
// SCENE SETUP
// =========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.Fog(0x050505, 10, 60);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// =========================
// LIGHTS
// =========================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
scene.add(dirLight);

// =========================
// ENVIRONMENT (Ground & Maze)
// =========================
const GRID_SIZE = 20;
const UNIT = 2; // Size of one grid cell

// Ground (Large for infinite feel)
const groundGeo = new THREE.PlaneGeometry(1000, 1000);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// =========================
// DECORATIONS & OBSTACLES
// =========================
const obstacles = [];

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
    obstacles.push(group);
}

function createBush(x, z) {
    const bush = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), new THREE.MeshStandardMaterial({ color: 0x4b7e32 }));
    bush.position.set(x, 0.3, z);
    bush.visible = false;
    scene.add(bush);
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
    obstacles.push(rock);
}

function createHouse(x, z) {
    const group = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshStandardMaterial({ color: 0xdddddd }));
    base.position.y = 1.5;
    group.add(base);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(3, 2, 4), new THREE.MeshStandardMaterial({ color: 0x882222 }));
    roof.position.y = 4;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);
    group.position.set(x, 0, z);
    group.visible = false;
    group.userData = { type: 'house' };
    scene.add(group);
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
    group.userData = { type: 'house' };
    scene.add(group);
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
    group.userData = { type: 'house' };
    scene.add(group);
    obstacles.push(group);
}

// Populate the world (More objects, larger area, more variety)
for (let i = 0; i < 400; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 10 + Math.random() * 180; 
    const tx = Math.floor((Math.cos(angle) * radius) / UNIT) * UNIT;
    const tz = Math.floor((Math.sin(angle) * radius) / UNIT) * UNIT;
    
    if (Math.abs(tx) < 8 && Math.abs(tz) < 8) continue;

    const type = Math.random();
    if (type < 0.2) createPineTree(tx, tz);
    else if (type < 0.4) createRoundTree(tx, tz);
    else if (type < 0.6) createRock(tx, tz);
    else if (type < 0.75) createBush(tx, tz);
    else if (type < 0.85) createHouse(tx, tz);
    else if (type < 0.93) createTallHouse(tx, tz);
    else createWideHouse(tx, tz);
}

// =========================
// GLOBAL GAME STATE
// =========================
let isGameOver = false;
let gameStarted = false;
const activeFoods = [];
const allSnakes = [];
let playerSnake;

const snakeGeometry = new THREE.BoxGeometry(UNIT * 0.65, UNIT * 0.65, UNIT * 0.65);

const FOOD_CONFIG = [
    { color: 0xff4444, score: 10, size: 0.4, emissive: 0x330000, prob: 0.7 },  // Đỏ - Thường
    { color: 0xffd700, score: 50, size: 0.5, emissive: 0x554400, prob: 0.1 },  // Vàng - Hiếm
    { color: 0x00ccff, score: 25, size: 0.45, emissive: 0x002233, prob: 0.2 }  // Xanh - Đặc biệt
];

function spawnFood(currentTime) {
    while (activeFoods.length < 3) {
        let valid = false;
        let attempts = 0;
        
        const rand = Math.random();
        let config = FOOD_CONFIG[0];
        let cumulative = 0;
        for(const c of FOOD_CONFIG) {
            cumulative += c.prob;
            if(rand < cumulative) {
                config = c;
                break;
            }
        }

        const foodGeo = new THREE.SphereGeometry(UNIT * config.size, 16, 16);
        const foodMat = new THREE.MeshStandardMaterial({ color: config.color, emissive: config.emissive });
        const mesh = new THREE.Mesh(foodGeo, foodMat);
        mesh.castShadow = true;
        mesh.userData = { 
            score: config.score,
            spawnTime: currentTime 
        };

        const snakePos = playerSnake ? playerSnake.snake[0] : new THREE.Vector3(0, UNIT/2, 0);
        while (!valid && attempts < 100) {
            attempts++;
            const angle = Math.random() * Math.PI * 2;
            const dist = 10 + Math.random() * 25;
            const fx = Math.floor((snakePos.x + Math.cos(angle) * dist) / UNIT) * UNIT;
            const fz = Math.floor((snakePos.z + Math.sin(angle) * dist) / UNIT) * UNIT;
            
            mesh.position.set(fx, UNIT / 2, fz);
            mesh.updateMatrixWorld();

            const snakeCollision = allSnakes.some(s => s.snake.some(p => p.distanceTo(mesh.position) < 0.8));
            const foodBox = new THREE.Box3().setFromObject(mesh);
            const obstacleCollision = obstacles.some(o => {
                if (!o.visible) return false;
                return new THREE.Box3().setFromObject(o).intersectsBox(foodBox);
            });

            if (!obstacleCollision && !snakeCollision) valid = true;
        }

        if (valid) {
            scene.add(mesh);
            activeFoods.push(mesh);
        } else {
            break; 
        }
    }
}

// =========================
// SNAKE CLASS
// =========================
class Snake {
    constructor(isAI = false, startPos = new THREE.Vector3(0, UNIT/2, 0), colorHead = 0x4CAF50, colorBody = 0x2E7D32, name = "Bạn") {
        this.isAI = isAI;
        this.name = name;
        this.snake = [
            startPos.clone(),
            startPos.clone().add(new THREE.Vector3(-UNIT, 0, 0)),
            startPos.clone().add(new THREE.Vector3(-UNIT * 2, 0, 0))
        ];
        this.snakeParts = []; // Meshes
        this.visualSnakePos = []; 
        this.direction = new THREE.Vector3(1, 0, 0);
        this.nextDirection = new THREE.Vector3(1, 0, 0);
        this.score = 0;
        this.isDead = false;
        
        this.headMat = new THREE.MeshStandardMaterial({ color: colorHead });
        this.bodyMat = new THREE.MeshStandardMaterial({ color: colorBody });

        this.init();
    }

    init() {
        this.snake.forEach((pos, i) => {
            const mesh = this.createSegmentMesh(i);
            mesh.position.copy(pos);
            scene.add(mesh);
            this.snakeParts.push(mesh);
            this.visualSnakePos.push(pos.clone());
        });
    }

    createSegmentMesh(index) {
        if (index === 0) {
            // Head with eyes
            const headGroup = new THREE.Group();
            const head = new THREE.Mesh(snakeGeometry, this.headMat);
            head.castShadow = true;
            headGroup.add(head);

            const eyeGeo = new THREE.SphereGeometry(UNIT * 0.1, 8, 8);
            const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const pupilMat = new THREE.MeshStandardMaterial({ color: 0x000000 });

            // Left Eye
            const lEye = new THREE.Mesh(eyeGeo, eyeMat);
            lEye.position.set(UNIT * 0.25, UNIT * 0.2, UNIT * 0.35);
            headGroup.add(lEye);

            // Right Eye
            const rEye = new THREE.Mesh(eyeGeo, eyeMat);
            rEye.position.set(-UNIT * 0.25, UNIT * 0.2, UNIT * 0.35);
            headGroup.add(rEye);

            return headGroup;
        } else {
            const mesh = new THREE.Mesh(snakeGeometry, this.bodyMat);
            mesh.castShadow = true;
            return mesh;
        }
    }

    updateAI() {
        if (!this.isAI || isGameOver || this.isDead) return;

        const possibleDirs = [
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, -1)
        ];

        // Filter out opposites (can't turn 180)
        const validDirs = possibleDirs.filter(d => !d.clone().add(this.direction).equals(new THREE.Vector3(0,0,0)));

        // 1. UNIQUE TARGETING
        let target = null;
        if (activeFoods.length > 0) {
            const myIndex = allSnakes.indexOf(this);
            const foodIndex = (myIndex - 1) % activeFoods.length; // -1 because player is 0
            target = activeFoods[foodIndex >= 0 ? foodIndex : 0].position;
        }

        // 2. SCORE DIRECTIONS
        const scoredDirs = validDirs.map(d => {
            let score = 0;
            const nextPos = this.snake[0].clone().add(d.clone().multiplyScalar(UNIT));
            
            // Distance to food
            if (target) {
                const dist = nextPos.distanceTo(target);
                score -= dist; // Lower distance = higher score
            }

            // AVOIDANCE (1-step and 2-step lookhead)
            const checkCollision = (pos) => {
                const box = new THREE.Box3().setFromCenterAndSize(pos, new THREE.Vector3(UNIT * 0.7, UNIT * 0.7, UNIT * 0.7));
                const hitWall = obstacles.some(o => o.visible && new THREE.Box3().setFromObject(o).expandByScalar(-0.3).intersectsBox(box));
                const hitSnake = allSnakes.some(s => !s.isDead && s.snake.some(p => p.distanceTo(pos) < 0.8));
                return hitWall || hitSnake;
            };

            if (checkCollision(nextPos)) score -= 1000;
            
            // 2-step lookahead
            const secondPos = nextPos.clone().add(d.clone().multiplyScalar(UNIT));
            if (checkCollision(secondPos)) score -= 500;

            // AGGRESSION: Try to cut off others
            allSnakes.forEach(other => {
                if (other !== this && !other.isDead) {
                    const otherHead = other.snake[0];
                    const otherNext = otherHead.clone().add(other.direction.clone().multiplyScalar(UNIT));
                    if (nextPos.distanceTo(otherNext) < 1.5) {
                        score += 300; // Encourage cutting off
                    }
                }
            });

            // WANDERING BIAS (to avoid robotic straight lines)
            if (!target) {
                if (d.equals(this.direction)) score += 5; // Preference for forward
                else if (Math.random() < 0.2) score += 2; // Occasional turns
            }

            return { dir: d, score };
        });

        // 3. PICK BEST
        scoredDirs.sort((a, b) => b.score - a.score);
        this.nextDirection.copy(scoredDirs[0].dir);
    }

    step() {
        if (this.isDead) return;

        this.direction.copy(this.nextDirection);
        const newHead = this.snake[0].clone().add(this.direction.clone().multiplyScalar(UNIT));

        // Collision Check (Obstacles + Other Snakes)
        const headBox = new THREE.Box3().setFromCenterAndSize(newHead, new THREE.Vector3(UNIT * 0.5, UNIT * 0.5, UNIT * 0.5));
        
        const hitObstacle = obstacles.some(o => {
            if (!o.visible) return false; 
            const box = new THREE.Box3().setFromObject(o);
            const shrink = (o.userData && o.userData.type === 'house') ? -0.8 : -0.3;
            box.expandByScalar(shrink); 
            return box.intersectsBox(headBox);
        });

        // Hit self or other snakes
        const hitBody = allSnakes.some(other => {
            if (other.isDead) return false; // Skip dead snakes!
            return other.snake.some((p, i) => {
                if (other === this && i === 0) return false;
                return p.distanceTo(newHead) < 0.8;
            });
        });

        // Head-to-head check (if two heads meet in same cell)
        const hitHead = allSnakes.some((other, idx) => {
            if (other === this || other.isDead) return false;
            // Check if our new head is same as their current head OR their next predicted head
            const otherHead = other.snake[0];
            const otherNext = otherHead.clone().add(other.direction.clone().multiplyScalar(UNIT));
            return newHead.distanceTo(otherHead) < 0.8 || newHead.distanceTo(otherNext) < 0.8;
        });

        if (hitObstacle || hitBody || hitHead) {
            this.die();
            return;
        }

        this.snake.unshift(newHead);

        // Food Collision
        let ate = false;
        for (let i = activeFoods.length - 1; i >= 0; i--) {
            const f = activeFoods[i];
            if (newHead.distanceTo(f.position) < 0.8) {
                this.score += f.userData.score;
                if (!this.isAI) document.getElementById('score').innerText = this.score;
                scene.remove(f);
                activeFoods.splice(i, 1);
                ate = true;
                break;
            }
        }

        if (ate) {
            spawnFood(performance.now());
            // Add visual pos for the new segment
            this.visualSnakePos.push(this.snake[this.snake.length - 1].clone());
        } else {
            this.snake.pop();
        }
    }

    updateVisuals() {
        if (this.isDead) return;

        if (this.snake.length > this.snakeParts.length) {
            const mesh = this.createSegmentMesh(this.snakeParts.length);
            scene.add(mesh);
            this.snakeParts.push(mesh);
        }

        this.snake.forEach((pos, i) => {
            if (!this.visualSnakePos[i]) this.visualSnakePos[i] = pos.clone();
            this.visualSnakePos[i].lerp(pos, 0.25);
            if (this.snakeParts[i]) {
                const mesh = this.snakeParts[i];
                mesh.position.copy(this.visualSnakePos[i]);
                
                // Rotations for head
                if (i === 0) {
                    if (this.direction.x === 1) mesh.rotation.y = -Math.PI/2;
                    if (this.direction.x === -1) mesh.rotation.y = Math.PI/2;
                    if (this.direction.z === 1) mesh.rotation.y = Math.PI;
                    if (this.direction.z === -1) mesh.rotation.y = 0;
                }

                // Pointed Tail logic
                if (i === this.snake.length - 1) {
                    mesh.scale.set(0.4, 0.4, 0.4);
                } else {
                    mesh.scale.set(1, 1, 1);
                }
            }
        });
    }

    die() {
        this.isDead = true;
        if (!this.isAI) {
            isGameOver = true;
            document.getElementById('final-score').innerText = this.score;
            document.getElementById('game-over').style.display = 'block';
        }

        // Turn to food
        this.snake.forEach(pos => {
            const foodGeo = new THREE.SphereGeometry(UNIT * 0.4, 16, 16);
            const foodMat = new THREE.MeshStandardMaterial({ color: 0xff4444, emissive: 0x330000 });
            const mesh = new THREE.Mesh(foodGeo, foodMat);
            mesh.position.copy(pos);
            mesh.userData = { score: 10, spawnTime: performance.now() };
            scene.add(mesh);
            activeFoods.push(mesh);
        });

        // Cleanup meshes
        this.snakeParts.forEach(m => scene.remove(m));
    }
}

function initGame() {
    playerSnake = new Snake(false, new THREE.Vector3(0, UNIT/2, 0), 0x4CAF50, 0x2E7D32, "Bạn");
    allSnakes.push(playerSnake);
    
    // Add 8 AI
    const aiColors = [
        { h: 0xd32f2f, b: 0xb71c1c, n: "Rắn Đỏ" },
        { h: 0x1976d2, b: 0x0d47a1, n: "Rắn Xanh" },
        { h: 0xffa000, b: 0xff6f00, n: "Rắn Vàng" },
        { h: 0x7b1fa2, b: 0x4a148c, n: "Rắn Tím" },
        { h: 0x0097a7, b: 0x006064, n: "Rắn Lục" },
        { h: 0xf44336, b: 0x880e4f, n: "Rắn Hồng" },
        { h: 0x607d8b, b: 0x263238, n: "Rắn Xám" },
        { h: 0x795548, b: 0x3e2723, n: "Rắn Nâu" }
    ];

    aiColors.forEach((c, idx) => {
        const x = (Math.random() - 0.5) * 120;
        const z = (Math.random() - 0.5) * 120;
        allSnakes.push(new Snake(true, new THREE.Vector3(x, UNIT/2, z), c.h, c.b, c.n));
    });
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
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    
    if (!gameStarted && (e.code === 'Space' || e.code === 'Enter')) {
        gameStarted = true;
        document.getElementById('start-screen').style.display = 'none';
        return;
    }

    if (!playerSnake) return;
    if ((key === 'w' || e.key === 'ArrowUp') && playerSnake.direction.z !== 1) playerSnake.nextDirection.set(0, 0, -1);
    if ((key === 's' || e.key === 'ArrowDown') && playerSnake.direction.z !== -1) playerSnake.nextDirection.set(0, 0, 1);
    if ((key === 'a' || e.key === 'ArrowLeft') && playerSnake.direction.x !== 1) playerSnake.nextDirection.set(-1, 0, 0);
    if ((key === 'd' || e.key === 'ArrowRight') && playerSnake.direction.x !== -1) playerSnake.nextDirection.set(1, 0, 0);
});

// =========================
// GAME LOOP
// =========================
let lastUpdateTime = 0;
const MOVE_INTERVAL = 220;
const cameraTarget = new THREE.Vector3();
const VISIBILITY_DIST = 60; 

function update(time) {
    if (isGameOver) return;

    if (gameStarted && time - lastUpdateTime > MOVE_INTERVAL) {
        allSnakes.forEach(s => {
            if (!s.isDead) { // Only update living snakes
                s.updateAI();
                s.step();
            }
        });
        updateLeaderboard();
        lastUpdateTime = time;
    }

    allSnakes.forEach(s => s.updateVisuals());

    // Food Expiration
    for (let i = activeFoods.length - 1; i >= 0; i--) {
        const f = activeFoods[i];
        if (time - f.userData.spawnTime > 5000) {
            scene.remove(f);
            activeFoods.splice(i, 1);
            spawnFood(time);
        }
    }

    // Camera follow
    if (playerSnake && !playerSnake.isDead) {
        cameraTarget.lerp(playerSnake.visualSnakePos[0], 0.1);
        const targetCamPos = new THREE.Vector3(cameraTarget.x, 22, cameraTarget.z + 18);
        camera.position.lerp(targetCamPos, 0.05);
        camera.lookAt(cameraTarget);
        
        // Ground follows player
        ground.position.set(playerSnake.snake[0].x, 0, playerSnake.snake[0].z);
    }

    obstacles.forEach(o => {
        const dist = o.position.distanceTo(cameraTarget);
        o.visible = dist < VISIBILITY_DIST;
    });
}

function animate(time) {
    requestAnimationFrame(animate);
    update(time);
    renderer.render(scene, camera);
}

// Start
initGame();
spawnFood(0);
animate(0);

// Responsive window
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
