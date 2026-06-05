import * as THREE from 'three';
import { ZOMBIE_TYPES, MUTATIONS, ELITE_TYPES, SPAWN_X, ZOMBIE_KILL_ZONE, LANE_Z, COL_X, GRID_OFFSET_X, CELL_SIZE } from './constants.js';
import { createZombieModel } from './models/ZombieModels.js';
import { rand } from './utils/helpers.js';

export class ZombieManager {
  constructor(scene, particleManager, audio, game) {
    this.scene = scene;
    this.particles = particleManager;
    this.audio = audio;
    this.game = game;
    this.zombies = [];
  }

  spawn(type, lane, row, extra = {}) {
    const mutations = extra.mutations || [];
    const eliteType = extra.eliteType || null;
    const isMiniboss = extra.isMiniboss || false;
    const waveModifiers = extra.waveModifiers || {};

    const baseConfig = ZOMBIE_TYPES[type];
    if (!baseConfig) return null;

    let config = { ...baseConfig };
    let finalColor = config.color;

    // Apply elite
    if (eliteType) {
      const e = ELITE_TYPES[eliteType];
      config.hp *= e.hpMul;
      config.speed *= e.speedMul || 1;
      config.damage *= e.damageMul || 1;
      config.score = Math.round(config.score * e.scoreMul);
      finalColor = e.color;
    }

    // Apply wave modifiers
    if (waveModifiers.hpMul) config.hp *= waveModifiers.hpMul;
    if (waveModifiers.speedMul) config.speed *= waveModifiers.speedMul;
    if (waveModifiers.bonusHp) config.hp += waveModifiers.bonusHp;

    // Apply individual mutations
    let hasFireTrail = false;
    let hasPoisonTrail = false;
    for (const mId of mutations) {
      const m = MUTATIONS[mId];
      if (!m) continue;
      if (m.hpMul !== undefined) config.hp *= m.hpMul;
      if (m.speedMul !== undefined) config.speed *= m.speedMul;
      if (m.damageMul !== undefined) config.damage *= m.damageMul;
      finalColor = m.color;
    }

    const zPos = (lane !== undefined) ? LANE_Z[lane] : LANE_Z[row];
    const model = createZombieModel(type, finalColor);
    const x = SPAWN_X + rand(-0.5, 0.5);
    model.position.set(x, 0, zPos);
    model.rotation.y = -Math.PI / 2;

    // Elite/miniboss scale
    if (eliteType) model.scale.set(1.25, 1.25, 1.25);
    if (isMiniboss) model.scale.set(1.5, 1.5, 1.5);

    // Aura ring for mutated/elite zombies
    if (mutations.length > 0 || eliteType) {
      const auraColor = eliteType ? ELITE_TYPES[eliteType].color : MUTATIONS[mutations[0]].color;
      const ringM = new THREE.MeshBasicMaterial({
        color: auraColor, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false
      });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.28, 16), ringM);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.02;
      model.add(ring);
      const ring2 = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.32, 16), ringM);
      ring2.rotation.x = -Math.PI / 2;
      ring2.position.y = 0.02;
      ring2.material = ringM.clone();
      ring2.material.opacity = 0.15;
      model.add(ring2);
    }

    if (isMiniboss) {
      const glowM = new THREE.MeshBasicMaterial({
        color: 0x8844ff, transparent: true, opacity: 0.15, side: THREE.DoubleSide
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8), glowM);
      glow.position.y = 0.35;
      model.add(glow);
    }

    this.scene.add(model);

    const zombie = {
      type, row: lane !== undefined ? lane : row,
      config, model, hp: config.hp, maxHp: config.hp,
      speed: config.speed, damage: config.damage,
      attackInterval: config.attackInterval,
      attackTimer: 0,
      isEating: false,
      eatingPlant: null,
      slowTimer: 0,
      slowFactor: 1,
      alive: true,
      score: config.score || 10,
      isBoss: config.isBoss || false,
      x,
      animTime: Math.random() * Math.PI * 2,
      mutations,
      eliteType,
      isMiniboss,
      hasFireTrail: false,
      hasPoisonTrail: false,
      trailTimer: 0,
      takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
          this.hp = 0;
          this.game.zombieManager.kill(this);
        }
      },
      applySlow(factor, duration) {
        this.slowFactor = factor;
        this.slowTimer = duration;
      }
    };
    zombie.game = this.game;
    zombie.armL = model.getObjectByName('armL');
    zombie.armR = model.getObjectByName('armR');

    // Set trail flags from mutations
    for (const mId of mutations) {
      if (mId === 'fire') zombie.hasFireTrail = true;
    }
    if (waveModifiers.poisonTrail) zombie.hasPoisonTrail = true;

    this.zombies.push(zombie);
    return zombie;
  }

  getZombiesInLane(row) {
    return this.zombies.filter(z => z.alive && z.row === row);
  }

  hitTest(x, z, radius) {
    for (const zmb of this.zombies) {
      if (!zmb.alive) continue;
      const dx = zmb.x - x;
      const dz = zmb.model.position.z - z;
      if (dx * dx + dz * dz < radius * radius) return zmb;
    }
    return null;
  }

  getZombiesInRadius(x, z, radius) {
    return this.zombies.filter(z => {
      if (!z.alive) return false;
      const dx = z.x - x;
      const dz = z.model.position.z - z;
      return dx * dx + dz * dz < radius * radius;
    });
  }

  getClosestZombie(x, row, maxDist = 12) {
    let closest = null;
    let minDist = maxDist;
    for (const z of this.zombies) {
      if (!z.alive || z.row !== row) continue;
      const d = z.x - x;
      if (d > 0 && d < minDist) {
        minDist = d;
        closest = z;
      }
    }
    return closest;
  }

  getAliveCount() {
    return this.zombies.filter(z => z.alive).length;
  }

  getTotalHpRemaining() {
    return this.zombies.reduce((s, z) => z.alive ? s + z.hp : s, 0);
  }

  update(dt, gridManager) {
    const hazards = this.game.hazardsManager;

    for (let i = this.zombies.length - 1; i >= 0; i--) {
      const z = this.zombies[i];
      if (!z.alive) continue;

      z.animTime += dt * 2;
      z.model.position.z = LANE_Z[z.row] + Math.sin(z.animTime) * 0.03;

      // Regeneration mutation
      if (z.mutations.includes('regenerating') && !z.isEating) {
        z.hp = Math.min(z.maxHp, z.hp + 8 * dt);
      }

      if (z.slowTimer > 0) {
        z.slowTimer -= dt;
        if (z.slowTimer <= 0) z.slowFactor = 1;
      }

      z.isEating = false;

      let blockingPlant = null;

      for (let c = 0; c < 9; c++) {
        const plant = gridManager.getPlantAt(z.row, c);
        if (plant && plant.alive) {
          const plantWorldX = COL_X[c];
          const dist = z.x - plantWorldX;
          if (dist <= 0.35 && dist >= -1e-10) {
            if (plant.type === 'potato') {
              if (plant.armed) {
                plant.takeDamage(9999);
                this.particles.explosion(plant.model.position);
                this.audio.playExplosion();
                z.takeDamage(150);
              }
            } else if (plant.type === 'iceberg') {
              z.applySlow(0, plant.config.freezeDuration || 5);
              plant.takeDamage(9999);
              this.particles.iceHit(plant.model.position);
              this.audio.playHit();
            } else {
              blockingPlant = plant;
            }
            break;
          }
        }
      }

      if (blockingPlant) {
        z.isEating = true;
        z.x = COL_X[blockingPlant.col] + 0.34;
        z.model.position.x = z.x;
        z.attackTimer += dt;
        z.model.rotation.y = -Math.PI / 2 + Math.sin(z.animTime * 2) * 0.08;
        z.model.rotation.z = Math.sin(z.animTime * 3) * 0.05;
        z.model.position.y = Math.abs(Math.sin(z.animTime * 3)) * 0.025;
        if (z.armL) {
          const pull = 0.6 + Math.abs(Math.sin(z.animTime * 3)) * 0.3;
          z.armL.position.set(-0.08, 0.5, 0.1);
          z.armL.rotation.x = Math.PI * 0.2 * pull;
          z.armL.rotation.y = 0.4 * pull;
        }
        if (z.armR) {
          const pull = 0.6 + Math.abs(Math.sin(z.animTime * 3 + Math.PI)) * 0.3;
          z.armR.position.set(0.08, 0.5, 0.1);
          z.armR.rotation.x = Math.PI * 0.2 * pull;
          z.armR.rotation.y = -0.4 * pull;
        }
        if (z.attackTimer >= z.attackInterval) {
          z.attackTimer = 0;
          blockingPlant.takeDamage(z.damage);
          // Icy mutation: slow plant on eat
          if (z.mutations.includes('icy')) {
            blockingPlant._icySlowTimer = (blockingPlant._icySlowTimer || 0) + 2;
            blockingPlant._icySlowFactor = 0.5;
          }
          if (blockingPlant.type === 'chomper') {
            z.takeDamage(blockingPlant.config.chompDamage || 60);
          }
          this.audio.playZombieEat();
          this.particles.burst(0xff4444, blockingPlant.model.position.clone().add(new THREE.Vector3(0, 0.3, 0)), 3, 0.5, 0.05, 0.3);
          if (!blockingPlant.alive) {
            const pos = blockingPlant.model.position.clone();
            this.particles.plantPlace(pos);
          }
        }
      } else {
        z.attackTimer = 0;
        const speed = z.speed * z.slowFactor * dt;
        z.x -= speed;
        z.model.position.x = z.x;

        z.model.rotation.y = -Math.PI / 2 + Math.sin(z.animTime * 0.5) * 0.05;
        z.model.rotation.z = 0;
        z.model.position.y = Math.abs(Math.sin(z.animTime * 2)) * 0.02;
        if (z.armL) {
          z.armL.position.set(-0.12, 0.32, 0.04);
          z.armL.rotation.x = Math.PI * 0.4 + Math.sin(z.animTime * 2) * 0.15;
          z.armL.rotation.y = 0.3 + Math.sin(z.animTime * 1.5) * 0.15;
        }
        if (z.armR) {
          z.armR.position.set(0.12, 0.32, 0.04);
          z.armR.rotation.x = Math.PI * 0.4 - Math.sin(z.animTime * 2) * 0.15;
          z.armR.rotation.y = -0.3 - Math.sin(z.animTime * 1.5) * 0.15;
        }

        // Fire trail
        if (z.hasFireTrail || z.hasPoisonTrail) {
          z.trailTimer += dt;
          if (z.trailTimer >= 0.5) {
            z.trailTimer = 0;
            const col = Math.round((z.x - GRID_OFFSET_X) / CELL_SIZE);
            if (col >= 0 && col < 9) {
              if (z.hasFireTrail && hazards) {
                hazards.addHazard('firePuddle', z.row, col, { color: 0xff4400, duration: 3, damagePerSec: 10 });
              }
              if (z.hasPoisonTrail && hazards) {
                hazards.addHazard('toxicCloud', z.row, col, { color: 0x88ff44, duration: 4, damagePerSec: 8 });
              }
            }
          }
        }
      }

      if (z.x < ZOMBIE_KILL_ZONE) {
        this.game.loseLife(1);
        this._remove(z, i);
      }
    }
    this._updateDeathAnimations(dt);
  }

  kill(zombie, deathType) {
    if (!zombie.alive) return;
    zombie.alive = false;
    const pos = zombie.model.position.clone();

    // Explosive mutation death
    if (zombie.mutations.includes('explosive')) {
      const explodeDmg = 60;
      const nearby = this.getZombiesInRadius(pos.x, pos.z, 1.5);
      for (const z of nearby) {
        if (z !== zombie) z.takeDamage(explodeDmg);
      }
      this.particles.explosion(pos);
      this.audio.playExplosion();
      const col = Math.round((pos.x - GRID_OFFSET_X) / CELL_SIZE);
      if (col >= 0 && col < 9 && this.game.hazardsManager) {
        this.game.hazardsManager.addHazard('firePuddle', zombie.row, col, { color: 0xff6600, duration: 5, damagePerSec: 15 });
      }
    }

    this.particles.zombieDeath(pos, zombie.eliteType ? ELITE_TYPES[zombie.eliteType].color : zombie.config.color);
    this.particles.starBurst(zombie.eliteType ? ELITE_TYPES[zombie.eliteType].color : zombie.config.color, pos, 6, 2, 0.4);
    this.audio.playZombieDie();

    if (zombie.isMiniboss) {
      this.particles.explosion(pos);
      this.particles.starBurst(0x8844ff, pos, 20, 4, 0.8);
      this.particles.starBurst(0xffffff, pos, 12, 3, 0.5);
      this.game.sceneManager.shake(0.4, 0.35);
      this.game.sceneManager.flash(0x8844ff, 0.15);
      this.game.hitStop(0.12);
    }

    if (!deathType) deathType = Math.random() < 0.33 ? 'dissolve' : Math.random() < 0.5 ? 'launch' : 'normal';

    if (deathType === 'dissolve') {
      zombie.model.traverse(child => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 1;
        }
      });
      zombie._deathType = 'dissolve';
      zombie._deathTimer = 0.4;
      zombie._deathMaxTimer = 0.4;
      zombie._deathPos = pos.clone();
      this.game.sceneManager.shake(zombie.isMiniboss ? 0.3 : 0.1, zombie.isMiniboss ? 0.3 : 0.15);
    } else if (deathType === 'launch') {
      zombie.model.traverse(child => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 1;
        }
      });
      zombie._deathType = 'launch';
      zombie._deathTimer = 0.5;
      zombie._deathMaxTimer = 0.5;
      zombie._deathPos = pos.clone();
      zombie._deathVel = new THREE.Vector3(rand(-2, -1), rand(3, 6), rand(-1, 1));
      this.game.sceneManager.shake(zombie.isMiniboss ? 0.3 : 0.15, zombie.isMiniboss ? 0.3 : 0.2);
    } else {
      this._removeDead(zombie);
      const idx = this.zombies.indexOf(zombie);
      if (idx !== -1) this.zombies.splice(idx, 1);
      this.game.addScore(zombie.score);
      this.game.sceneManager.shake(zombie.isMiniboss ? 0.25 : 0.08, zombie.isMiniboss ? 0.2 : 0.1);
    }
  }

  _removeDead(zombie) {
    this.scene.remove(zombie.model);
    zombie.model.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }

  _updateDeathAnimations(dt) {
    for (let i = this.zombies.length - 1; i >= 0; i--) {
      const z = this.zombies[i];
      if (!z._deathType) continue;
      z._deathTimer -= dt;
      const t = z._deathTimer / z._deathMaxTimer;
      if (z._deathType === 'dissolve') {
        z.model.traverse(child => {
          if (child.isMesh) child.material.opacity = t;
        });
        z.model.position.y = (1 - t) * 0.5;
        z.model.rotation.z += dt * 2;
        if (z._deathTimer <= 0) {
          this._removeDead(z);
          this.game.addScore(z.score);
          this.zombies.splice(i, 1);
        }
      } else if (z._deathType === 'launch') {
        z._deathVel.y += -10 * dt;
        z.model.position.copy(z._deathPos);
        z.model.position.add(z._deathVel.clone().multiplyScalar(dt));
        z.model.rotation.x += z._deathVel.y * dt * 2;
        z.model.rotation.z += dt * 4;
        z.model.traverse(child => {
          if (child.isMesh) child.material.opacity = Math.max(0, t);
        });
        if (z._deathTimer <= 0 || z.model.position.y < -2) {
          this._removeDead(z);
          this.game.addScore(z.score);
          this.zombies.splice(i, 1);
        }
      }
    }
  }

  _remove(zombie, idx) {
    this.scene.remove(zombie.model);
    zombie.model.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    this.zombies.splice(idx, 1);
  }

  clear() {
    this.zombies.forEach(z => {
      this.scene.remove(z.model);
      z.model.traverse(child => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    });
    this.zombies = [];
  }
}
