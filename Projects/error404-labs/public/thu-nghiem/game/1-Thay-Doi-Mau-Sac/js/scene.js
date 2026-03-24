import * as THREE from 'three';

export class SceneManager {
    constructor(canvas) {
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0f172a, 0.05);
        
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 12);
        this.camera.lookAt(0, 0, 0);

        this.initLights();
        this.initParticles();
        this.initFloor();
    }

    initLights() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.2);
        const main = new THREE.DirectionalLight(0xffffff, 1.5);
        main.position.set(5, 10, 5);
        main.castShadow = true;
        const rim = new THREE.PointLight(0x6366f1, 2, 20);
        rim.position.set(-5, 5, -5);
        this.scene.add(ambient, main, rim);
    }

    initFloor() {
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.ShadowMaterial({ opacity: 0.1 }));
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -3;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    initParticles() {
        const dustGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(1500);
        for (let i = 0; i < 1500; i++) positions[i] = (Math.random() - 0.5) * 40;
        dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ size: 0.05, color: 0x6366f1, transparent: true, opacity: 0.4 }));
        this.scene.add(this.dust);
        this.fxParticles = [];
    }

    spawnFX(pos, color, scale = 1) {
        const geo = new THREE.SphereGeometry(0.05, 4, 4);
        const mat = new THREE.MeshBasicMaterial({ color, transparent: true });
        for (let i = 0; i < 20; i++) {
            const p = new THREE.Mesh(geo, mat.clone());
            p.position.copy(pos);
            const angle = Math.random() * Math.PI * 2;
            const speed = (0.05 + Math.random() * 0.15) * scale;
            p.userData = { vel: new THREE.Vector3(Math.cos(angle) * speed, (Math.random() - 0.2) * speed, Math.sin(angle) * speed), life: 1 };
            this.scene.add(p);
            this.fxParticles.push(p);
        }
    }

    update() {
        this.dust.rotation.y += 0.0005;
        for (let i = this.fxParticles.length - 1; i >= 0; i--) {
            const p = this.fxParticles[i];
            p.position.add(p.userData.vel);
            p.userData.vel.y -= 0.002;
            p.userData.life -= 0.02;
            p.material.opacity = p.userData.life;
            p.scale.setScalar(p.userData.life);
            if (p.userData.life <= 0) {
                this.scene.remove(p);
                this.fxParticles.splice(i, 1);
            }
        }
    }

    async setFogColor(color) {
        new TWEEN.Tween(this.scene.fog.color).to({
            r: (color >> 16 & 255) / 255 * 0.1,
            g: (color >> 8 & 255) / 255 * 0.1,
            b: (color & 255) / 255 * 0.1
        }, 1000).start();
    }
}
