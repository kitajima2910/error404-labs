import * as THREE from 'three';
import { CONFIG } from './config.js';
import { AudioManager } from './audio.js';
import { SceneManager } from './scene.js';

class Game {
    constructor() {
        this.state = 'START_SCREEN';
        this.curLevel = 1;
        this.unlocked = parseInt(localStorage.getItem(CONFIG.LEVELS.STORAGE_KEY)) || 1;
        this.timeLeft = 30;
        this.objects = [];
        this.targetIdx = 0;
        this.timer = null;

        this.audio = new AudioManager();
        this.sceneMan = new SceneManager(document.getElementById('game-canvas'));
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.bindEvents();
        this.renderLevelSelect();
        this.startLevel(this.unlocked);
        this.loop();
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.sceneMan.camera.aspect = window.innerWidth / window.innerHeight;
            this.sceneMan.camera.updateProjectionMatrix();
            this.sceneMan.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('click', () => this.audio.init(), { once: true });
        window.addEventListener('mousedown', (e) => this.onInput(e));
        window.addEventListener('mousemove', (e) => this.onInput(e, true));

        document.getElementById('menu-btn').addEventListener('click', () => this.toggleMenu(true));
        document.getElementById('close-menu-btn').addEventListener('click', () => this.toggleMenu(false));
        document.getElementById('next-btn').addEventListener('click', () => this.nextLevel());
        document.getElementById('retry-btn').addEventListener('click', () => this.startLevel());
        document.getElementById('start-game-btn').addEventListener('click', () => this.startGame());
    }

    startGame() {
        if (this.state !== 'START_SCREEN') return;
        this.state = 'PLAYING';
        document.getElementById('start-overlay').classList.remove('active');
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => this.tick(), 1000);
        this.checkWin();
    }

    startLevel(n = null) {
        if (n) this.curLevel = n;
        this.state = 'START_SCREEN';
        this.toggleMenu(false);
        document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
        document.getElementById('start-overlay').classList.add('active');
        document.getElementById('start-level-title').innerText = `Cấp độ ${this.curLevel}`;
        
        if (this.timer) clearInterval(this.timer);
        this.timeLeft = Math.max(CONFIG.DURATIONS.MIN_TIME, CONFIG.DURATIONS.BASE_TIME - (this.curLevel - 1) * CONFIG.DURATIONS.TIME_DECAY);
        this.updateUI();

        this.objects.forEach(o => this.sceneMan.scene.remove(o));
        this.objects = [];

        const count = Math.min(3 + (this.curLevel - 1), 9);
        const colorLimit = Math.min(2 + Math.floor(this.curLevel / 2), CONFIG.COLORS.length);
        this.targetIdx = Math.floor(Math.random() * colorLimit);

        const geos = [
            new THREE.BoxGeometry(1.5, 1.5, 1.5),
            new THREE.SphereGeometry(0.9, 32, 32),
            new THREE.OctahedronGeometry(1.1),
            new THREE.TorusGeometry(0.7, 0.3, 16, 32),
            new THREE.CylinderGeometry(0.7, 0.7, 1.5, 16)
        ];
        const geo = geos[Math.floor((this.curLevel - 1) / 3) % geos.length];
        const targetColor = CONFIG.COLORS[this.targetIdx].hex;

        document.getElementById('target-color-box').style.backgroundColor = `#${targetColor.toString(16).padStart(6, '0')}`;
        this.sceneMan.setFogColor(targetColor);

        for (let i = 0; i < count; i++) {
            const mat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.05, transmission: 0.5, thickness: 1, ior: 1.5, clearcoat: 1, clearcoatRoughness: 0.1 });
            const obj = new THREE.Mesh(geo, mat);
            obj.castShadow = obj.receiveShadow = true;
            
            let start;
            do {
                start = Math.floor(Math.random() * colorLimit);
            } while (count <= 3 && start === this.targetIdx);
            
            obj.userData = { colorIdx: start, limit: colorLimit };
            obj.material.color.setHex(CONFIG.COLORS[start].hex);

            if (count <= 4) {
                obj.position.x = (i - (count - 1) / 2) * 2.5;
            } else {
                const cols = 3;
                obj.position.x = (i % cols - (cols - 1) / 2) * 2.5;
                obj.position.z = (Math.floor(i / cols) - (Math.ceil(count / cols) - 1) / 2) * 2.5;
            }
            
            obj.position.y = 10 + i * 0.2;
            new TWEEN.Tween(obj.position).to({ y: 0 }, 1000 + i * 100).easing(TWEEN.Easing.Bounce.Out).start();
            this.sceneMan.scene.add(obj);
            this.objects.push(obj);
        }
    }

    tick() {
        if (this.state !== 'PLAYING') return;
        this.timeLeft--;
        this.updateUI();
        if (this.timeLeft <= 0) this.fail();
    }

    onInput(e, isMove = false) {
        if (this.state !== 'PLAYING') return;
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.sceneMan.camera);
        const hits = this.raycaster.intersectObjects(this.objects);

        if (isMove) {
            this.objects.forEach(o => { o.material.emissiveIntensity = 0; });
            if (hits.length) {
                hits[0].object.material.emissive.setHex(0xffffff);
                hits[0].object.material.emissiveIntensity = 0.2;
            }
        } else if (hits.length) {
            this.audio.playSfx('click');
            const o = hits[0].object;
            this.cycleColor(o);
        }
    }

    cycleColor(obj) {
        obj.userData.colorIdx = (obj.userData.colorIdx + 1) % obj.userData.limit;
        const hex = CONFIG.COLORS[obj.userData.colorIdx].hex;
        this.sceneMan.spawnFX(obj.position, hex);
        
        new TWEEN.Tween(obj.scale).to({ x: 1.3, y: 1.3, z: 1.3 }, 80).easing(TWEEN.Easing.Back.Out).start().onComplete(() => {
            new TWEEN.Tween(obj.scale).to({ x: 1, y: 1, z: 1 }, 200).start();
        });
        
        new TWEEN.Tween(obj.material.color).to({ r: (hex >> 16 & 255) / 255, g: (hex >> 8 & 255) / 255, b: (hex & 255) / 255 }, 300).start();
        this.checkWin();
    }

    checkWin() {
        if (this.state !== 'PLAYING') return;
        
        const firstIdx = this.objects[0].userData.colorIdx;
        const allSame = this.objects.every(o => o.userData.colorIdx === firstIdx);
        const matchesTarget = firstIdx === this.targetIdx;

        if (allSame) {
            this.state = 'WIN';
            clearInterval(this.timer);
            
            // If they matched a color other than target, update target to match for visual consistency
            if (!matchesTarget) {
                this.targetIdx = firstIdx;
                const targetColor = CONFIG.COLORS[this.targetIdx].hex;
                document.getElementById('target-color-box').style.backgroundColor = `#${targetColor.toString(16).padStart(6, '0')}`;
                this.sceneMan.setFogColor(targetColor);
            }

            if (this.curLevel < CONFIG.LEVELS.TOTAL) {
                this.unlocked = Math.max(this.unlocked, this.curLevel + 1);
                localStorage.setItem(CONFIG.LEVELS.STORAGE_KEY, this.unlocked);
            }
            this.audio.playSfx('win');
            setTimeout(() => {
                document.getElementById('win-overlay').classList.add('active');
                for (let i = 0; i < 5; i++) setTimeout(() => this.sceneMan.spawnFX(new THREE.Vector3(0, 0, 0), CONFIG.COLORS[this.targetIdx].hex, 2), i * 150);
            }, 600);
        }
    }

    fail() {
        this.state = 'FAIL';
        clearInterval(this.timer);
        this.audio.playSfx('fail');
        document.getElementById('fail-overlay').classList.add('active');
    }

    nextLevel() {
        if (this.curLevel < CONFIG.LEVELS.TOTAL) this.startLevel(this.curLevel + 1);
        else this.toggleMenu(true);
    }

    updateUI() {
        document.getElementById('level-display').innerText = `Cấp độ ${this.curLevel}`;
        const t = document.getElementById('timer-display');
        t.innerText = `${Math.ceil(this.timeLeft)}s`;
        if (this.timeLeft < 5) {
            t.style.transform = 'scale(1.2)';
            setTimeout(() => t.style.transform = 'scale(1)', 100);
        }
    }

    toggleMenu(show) {
        if (show) this.renderLevelSelect();
        document.getElementById('menu-overlay').classList.toggle('active', show);
    }

    renderLevelSelect() {
        const grid = document.getElementById('level-grid');
        grid.innerHTML = '';
        for (let i = 1; i <= CONFIG.LEVELS.TOTAL; i++) {
            const item = document.createElement('div');
            item.className = `level-item ${i <= this.unlocked ? 'unlocked' : 'locked'} ${i === this.curLevel ? 'current' : ''}`;
            item.innerHTML = i <= this.unlocked ? i : '🔒';
            if (i <= this.unlocked) item.onclick = () => this.startLevel(i);
            grid.appendChild(item);
        }
    }

    loop(t) {
        requestAnimationFrame((t) => this.loop(t));
        TWEEN.update(t);
        this.objects.forEach((o, i) => {
            o.rotation.y += 0.01;
            o.rotation.x += 0.005;
            o.position.y = Math.sin(t * 0.001 + i) * 0.15;
        });
        this.sceneMan.update();
        this.sceneMan.renderer.render(this.sceneMan.scene, this.sceneMan.camera);
    }
}

const run = () => { window.gameInstance = new Game(); };
if (window.TWEEN) run(); else window.addEventListener('load', run);
