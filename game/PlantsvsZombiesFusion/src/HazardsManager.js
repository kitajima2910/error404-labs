import * as THREE from 'three';
import { HAZARD_TYPES, COL_X, LANE_Z } from './constants.js';

export class HazardsManager {
  constructor(scene, game) {
    this.scene = scene;
    this.game = game;
    this.hazards = [];
    this._geom = new THREE.CircleGeometry(1, 16);
  }

  addHazard(type, row, col, extra = {}) {
    const cfg = HAZARD_TYPES[type];
    if (!cfg) return null;

    const x = COL_X[col];
    const z = LANE_Z[row];
    const color = extra.color || cfg.color;
    const radius = extra.radius || cfg.radius;

    const mat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.4, depthWrite: false,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(this._geom.clone(), mat);
    mesh.position.set(x, 0.02, z);
    mesh.scale.set(radius, radius, 1);
    mesh.rotation.x = -Math.PI / 2;
    this.scene.add(mesh);

    const h = {
      type, row, col, x, z, mesh, mat,
      radius, color,
      life: extra.duration || cfg.duration || 8,
      maxLife: extra.duration || cfg.duration || 8,
      damagePerSec: extra.damagePerSec || cfg.damagePerSec || 0,
      slowFactor: cfg.slowFactor || 0,
      alive: true,
      tickTimer: 0,
    };
    this.hazards.push(h);
    return h;
  }

  update(dt, zombieManager) {
    for (let i = this.hazards.length - 1; i >= 0; i--) {
      const h = this.hazards[i];
      h.life -= dt;
      if (h.life <= 0) {
        this._remove(i);
        continue;
      }

      const t = h.life / h.maxLife;
      h.mat.opacity = 0.15 + t * 0.35;
      h.mesh.scale.setScalar(h.radius * (0.8 + (1 - t) * 0.2));

      h.tickTimer += dt;
      if (h.tickTimer >= 0.5) {
        h.tickTimer = 0;
        const zombies = zombieManager.getZombiesInRadius(h.x, h.z, h.radius);
        for (const z of zombies) {
          if (h.damagePerSec > 0) {
            z.takeDamage(h.damagePerSec * 0.5);
            if (this.game) this.game.spawnDamagePopup(z.model.position.clone(), h.damagePerSec * 0.5, '#' + h.mat.color.getHexString());
          }
          if (h.slowFactor > 0) {
            z.applySlow(h.slowFactor, 1.0);
          }
        }
      }
    }
  }

  _remove(idx) {
    const h = this.hazards[idx];
    this.scene.remove(h.mesh);
    h.mesh.geometry.dispose();
    h.mesh.material.dispose();
    this.hazards.splice(idx, 1);
  }

  clear() {
    for (const h of this.hazards) {
      this.scene.remove(h.mesh);
      h.mesh.geometry.dispose();
      h.mesh.material.dispose();
    }
    this.hazards = [];
  }
}
