import * as THREE from 'three';
import { rand } from './utils/helpers.js';
import { SUN_DROP_INTERVAL } from './constants.js';

export class SunManager {
  constructor(scene, audio) {
    this.scene = scene;
    this.audio = audio;
    this.sun = 150;
    this.suns = [];
    this.sunTimer = 0;
    this.nextDrop = SUN_DROP_INTERVAL;
  }

  setSun(amount) {
    this.sun = amount;
    this._updateUI();
  }

  addSun(amount) {
    this.sun += amount;
    this._updateUI();
  }

  spend(amount) {
    if (this.sun < amount) return false;
    this.sun -= amount;
    this._updateUI();
    return true;
  }

  canAfford(amount) {
    return this.sun >= amount;
  }

  getSun() {
    return this.sun;
  }

  _updateUI() {
    const el = document.getElementById('sun-amount');
    if (el) el.textContent = Math.floor(this.sun);
  }

  dropSunAt(worldX, worldZ, amount = 25) {
    const pos = new THREE.Vector3(worldX, 0.5, worldZ);
    const targetY = 0.3;

    const g = new THREE.SphereGeometry(0.2, 8);
    const m = new THREE.MeshStandardMaterial({
      color: 0xffdd44, emissive: 0xffaa00, emissiveIntensity: 0.3
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.copy(pos);
    mesh.position.y = 4;
    mesh.castShadow = true;
    this.scene.add(mesh);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.22, 0.28, 16),
      new THREE.MeshBasicMaterial({ color: 0xffdd44, transparent: true, opacity: 0.6, side: THREE.DoubleSide })
    );
    ring.position.copy(pos);
    ring.position.y = 0.05;
    ring.rotation.x = -Math.PI / 2;
    this.scene.add(ring);

    this.suns.push({
      mesh, ring, pos: pos.clone(), targetY,
      amount, life: 8, state: 'falling',
      velY: 0, bobTime: rand(0, Math.PI * 2),
      scale: 0
    });
  }

  dropSun(amount = 25) {
    const x = rand(-4, 4);
    const z = rand(-3, 3);
    this.dropSunAt(x, z, amount);
  }

  collectSun(sunObj) {
    const idx = this.suns.indexOf(sunObj);
    if (idx === -1) return;
    this.scene.remove(sunObj.mesh);
    this.scene.remove(sunObj.ring);
    sunObj.mesh.geometry.dispose();
    sunObj.mesh.material.dispose();
    sunObj.ring.geometry.dispose();
    sunObj.ring.material.dispose();
    this.suns.splice(idx, 1);
    this.addSun(sunObj.amount);
    this.audio.playSunCollect();
  }

  update(dt) {
    this.sunTimer += dt;
    if (this.sunTimer >= this.nextDrop) {
      this.sunTimer = 0;
      this.nextDrop = SUN_DROP_INTERVAL + rand(-2, 2);
      this.dropSun();
    }

    for (let i = this.suns.length - 1; i >= 0; i--) {
      const s = this.suns[i];
      s.life -= dt;

      if (s.state === 'falling') {
        s.velY += -9.8 * dt;
        s.mesh.position.y += s.velY * dt;
        if (s.mesh.position.y <= s.targetY) {
          s.mesh.position.y = s.targetY;
          s.velY = 0;
          s.state = 'idle';
        }
        s.scale = Math.min(1, s.scale + dt * 8);
        s.mesh.scale.setScalar(s.scale);
        s.ring.scale.setScalar(s.scale);
      }

      if (s.state === 'idle') {
        s.bobTime += dt * 2;
        s.mesh.position.y = s.targetY + Math.sin(s.bobTime) * 0.08;
        s.ring.material.opacity = 0.3 + Math.sin(s.bobTime) * 0.15;
        s.ring.scale.setScalar(0.8 + Math.sin(s.bobTime + 1) * 0.15);
      }

      if (s.life <= 0 && s.state === 'idle') {
        this.collectSun(s);
      }
    }
  }

  hitTest(x, y) {
    for (const s of this.suns) {
      const dx = s.mesh.position.x - x;
      const dz = s.mesh.position.z - y;
      if (dx * dx + dz * dz < 0.6 * 0.6) return s;
    }
    return null;
  }

  clear() {
    this.suns.forEach(s => {
      this.scene.remove(s.mesh);
      this.scene.remove(s.ring);
      s.mesh.geometry.dispose();
      s.mesh.material.dispose();
      s.ring.geometry.dispose();
      s.ring.material.dispose();
    });
    this.suns = [];
  }
}
