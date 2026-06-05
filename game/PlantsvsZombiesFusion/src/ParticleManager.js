import * as THREE from 'three';
import { rand } from './utils/helpers.js';

export class ParticleManager {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this._starGeom = new THREE.SphereGeometry(0.5, 4);
    this._ringGeom = new THREE.RingGeometry(0.1, 0.2, 16);
  }

  _makeParticle(color, size, pos, vel, life, gravity = 0, emissiveIntensity = 0.5) {
    const g = new THREE.SphereGeometry(size * 0.5, 6);
    const m = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity,
      transparent: true, opacity: 1
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.copy(pos);
    mesh.castShadow = true;
    this.scene.add(mesh);
    this.particles.push({ mesh, vel, life, maxLife: life, gravity, rotSpeed: rand(-3, 3) });
    return mesh;
  }

  _makeSpark(color, pos, life = 0.3) {
    const g = new THREE.BoxGeometry(0.03, 0.003, 0.003);
    const m = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2 });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.copy(pos);
    this.scene.add(mesh);
    this.particles.push({ mesh, vel: new THREE.Vector3(rand(-2, 2), rand(1, 3), rand(-2, 2)), life, maxLife: life, gravity: -5, rotSpeed: rand(-10, 10) });
    return mesh;
  }

  burst(color, pos, count = 8, speed = 2, size = 0.12, life = 0.6) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rand(-0.2, 0.2);
      const v = new THREE.Vector3(
        Math.cos(angle) * rand(speed * 0.5, speed),
        rand(1, 2.5),
        Math.sin(angle) * rand(speed * 0.5, speed)
      );
      this._makeParticle(color, size, pos.clone(), v, life * rand(0.7, 1.3), -3, 0.8);
    }
  }

  starBurst(color, pos, count = 12, speed = 3, life = 0.6) {
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const v = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * rand(speed * 0.5, speed),
        Math.abs(Math.sin(phi) * Math.sin(theta)) * speed * 0.8 + 1,
        Math.cos(phi) * rand(speed * 0.5, speed)
      );
      const mesh = this._makeParticle(color, 0.08 + Math.random() * 0.06, pos.clone(), v, life * rand(0.6, 1.0), -4, 1.5);
      mesh.scale.set(1.5, 0.3, 0.3);
    }
  }

  ringBurst(color, pos, count = 3, speed = 2.5, life = 0.4) {
    for (let i = 0; i < count; i++) {
      const r = new THREE.Mesh(
        new THREE.RingGeometry(0.05 + i * 0.03, 0.08 + i * 0.03, 16),
        new THREE.MeshBasicMaterial({
          color, transparent: true, opacity: 1, side: THREE.DoubleSide
        })
      );
      r.position.copy(pos);
      r.position.y = 0.6;
      r.rotation.x = -Math.PI / 2 + rand(-0.2, 0.2);
      r.rotation.z = rand(0, Math.PI);
      this.scene.add(r);
      this.particles.push({ mesh: r, vel: new THREE.Vector3(0, speed * 0.3, 0), life, maxLife: life, gravity: 0, rotSpeed: rand(-2, 2) });
    }
  }

  sparkBurst(pos, color = 0xffffff, count = 6) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(2, 5);
      const v = new THREE.Vector3(Math.cos(angle) * speed, rand(1, 3), Math.sin(angle) * speed);
      this._makeSpark(color, pos.clone(), rand(0.15, 0.35));
    }
  }

  sunBurst(pos) {
    this.burst(0xffdd44, pos, 12, 2.5, 0.15, 0.8);
    this.burst(0xffaa00, pos, 6, 1.5, 0.08, 0.5);
    this.sparkBurst(pos, 0xffdd44, 4);
  }

  zombieDeath(pos, color = 0x88aa77) {
    this.burst(color, pos, 16, 3, 0.15, 0.7);
    this.burst(0xff4444, pos, 6, 2, 0.08, 0.5);
    this.starBurst(color, pos, 8, 2.5, 0.5);
    this.ringBurst(color, pos, 2, 2, 0.35);
  }

  explosion(pos) {
    this.burst(0xff4400, pos, 20, 4, 0.2, 0.8);
    this.burst(0xffaa00, pos, 15, 3, 0.15, 0.6);
    this.burst(0xffff00, pos, 10, 2.5, 0.1, 0.5);
    this.starBurst(0xff6600, pos, 10, 3.5, 0.5);
    this.ringBurst(0xff4400, pos, 3, 3, 0.4);
    this.sparkBurst(pos, 0xffcc00, 8);
  }

  fusionBurst(pos) {
    this.burst(0xffd700, pos, 24, 4, 0.2, 1.0);
    this.burst(0xffffff, pos, 12, 3, 0.12, 0.7);
    this.burst(0xff66ff, pos, 8, 2, 0.1, 0.6);
    this.starBurst(0xffd700, pos, 16, 4, 0.7);
    this.starBurst(0xffffff, pos, 8, 2.5, 0.5);
    this.ringBurst(0xffd700, pos, 4, 3.5, 0.5);
    this.sparkBurst(pos, 0xffffff, 12);
  }

  plantPlace(pos) {
    this.burst(0x44ff44, pos, 10, 2, 0.12, 0.5);
    this.burst(0x88ff88, pos, 5, 1, 0.08, 0.3);
  }

  peaHit(pos, color = 0x44aa44) {
    this.burst(color, pos, 5, 1.5, 0.08, 0.3);
    this.sparkBurst(pos, color, 3);
  }

  iceHit(pos) {
    this.burst(0x66ccff, pos, 8, 2, 0.1, 0.5);
    this.burst(0xffffff, pos, 4, 1, 0.06, 0.3);
    this.sparkBurst(pos, 0x66ccff, 4);
  }

  fireHit(pos) {
    this.burst(0xff6600, pos, 10, 2.5, 0.12, 0.5);
    this.burst(0xffcc00, pos, 5, 1.5, 0.08, 0.3);
    this.sparkBurst(pos, 0xff6600, 6);
  }

  electricHit(pos) {
    this.burst(0x66ddff, pos, 12, 2.5, 0.1, 0.35);
    this.sparkBurst(pos, 0x66ddff, 8);
    this.sparkBurst(pos, 0xffffff, 4);
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
        continue;
      }
      const t = 1 - p.life / p.maxLife;
      p.vel.y += p.gravity * dt;
      p.mesh.position.add(p.vel.clone().multiplyScalar(dt));
      p.mesh.material.opacity = 1 - t;
      p.mesh.scale.setScalar(1 - t * 0.5);
      p.mesh.rotation.x += p.rotSpeed * dt;
      p.mesh.rotation.z += p.rotSpeed * dt * 0.7;
    }
  }

  clear() {
    this.particles.forEach(p => {
      this.scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    });
    this.particles = [];
  }
}
