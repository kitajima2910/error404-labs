import * as THREE from 'three';
import { PLANT_TYPES, FUSION_RECIPES, CELL_SIZE, GRID_OFFSET_X, GRID_OFFSET_Z, COL_X, LANE_Z } from './constants.js';
import { createPlantModel, clonePlantModel } from './models/PlantModels.js';
import { rand } from './utils/helpers.js';

export class PlantManager {
  constructor(scene, gridManager, particleManager, audio, game) {
    this.scene = scene;
    this.grid = gridManager;
    this.particles = particleManager;
    this.audio = audio;
    this.game = game;
    this.plants = [];
    this.laserBeams = [];
    this.fusionRecipes = FUSION_RECIPES;
  }

  placePlant(type, row, col, config = null) {
    if (this.grid.isOccupied(row, col)) return null;
    const plantType = config || PLANT_TYPES[type];
    if (!plantType) return null;

    const pos = this.grid.gridToWorld(row, col);
    const model = createPlantModel(type, plantType.color);
    model.position.set(pos.x, 0, pos.z);
    model.rotation.y = Math.PI / 2;
    this.scene.add(model);

    const hpBar = this._createHpBar();
    model.add(hpBar.sprite);

    const self = this;
    const barrelGroup = type === 'gatlingpea' ? model.getObjectByName('barrelGroup') : null;
    const plant = {
      type, row, col, config: plantType,
      hp: plantType.hp, maxHp: plantType.hp,
      model, alive: true,
      fireTimer: 0,
      sunTimer: 0,
      slowTimer: 0,
      _icySlowTimer: 0,
      _icySlowFactor: 1,
      chompTimer: 0,
      armTimer: 0,
      armed: type !== 'potato',
      animTime: Math.random() * Math.PI * 2,
      isFusion: !!config?.isFusion,
      fusionData: config?.isFusion ? config : null,
      hpBar,
      damaged: false,
      spinSpeed: 0,
      spinAngle: 0,
      lastFireAngle: 0,
      barrelGroup,
      takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
          this.hp = 0;
          self.removePlant(this);
          return;
        }
        const pct = Math.max(0, this.hp / this.maxHp);
        const ctx = this.hpBar.ctx;
        const cvs = this.hpBar.canvas;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.fillStyle = '#222222';
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        const fillW = Math.round(60 * pct);
        if (pct < 0.25) {
          ctx.fillStyle = '#ff4444';
        } else if (pct < 0.5) {
          ctx.fillStyle = '#ffaa00';
        } else {
          ctx.fillStyle = '#44ff44';
        }
        ctx.fillRect(2, 1, fillW, 8);
        this.hpBar.tex.needsUpdate = true;
        if (pct < 0.5 && !this.damaged) {
          this.damaged = true;
          self._applyDamageVisual(this);
        }
        if (['wallnut','bamboo','steelwall','pumpkin','tallnut','icenut'].includes(this.type)) {
          self.particles.burst(0x88aaff, this.model.position.clone().setY(0.5), 5, 1.2, 0.05, 0.25);
        }
      }
    };

    this.grid.placePlant(row, col, plant);
    this.plants.push(plant);

    this.particles.plantPlace(model.position);
    this.audio.playPlace();

    if (type === 'cherrybomb') {
      this._explodePlant(plant);
    }

    return plant;
  }

  _createHpBar() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, 64, 10);
    ctx.fillStyle = '#44ff44';
    ctx.fillRect(2, 1, 60, 8);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(0.5, 0.07, 1);
    sprite.position.y = 1.0;

    return { sprite, canvas, ctx, tex };
  }

  _applyDamageVisual(plant) {
    plant.model.traverse(child => {
      if (child.isMesh && child.material) {
        const c = child.material.color.clone();
        c.multiplyScalar(0.55);
        child.material.color.copy(c);
      }
    });
  }

  _createLaserBeam(from, to) {
    const dir = new THREE.Vector3().copy(to).sub(from);
    const length = dir.length();
    if (length < 0.1) return;
    dir.normalize();
    const g = new THREE.BoxGeometry(0.025, 0.025, length);
    const m = new THREE.MeshStandardMaterial({
      color: 0xff2255, emissive: 0xff4488,
      emissiveIntensity: 2.5, transparent: true, opacity: 0.9
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.copy(from).add(dir.clone().multiplyScalar(length / 2));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
    this.scene.add(mesh);
    this.laserBeams.push({ mesh, life: 0.12, maxLife: 0.12 });
  }

  removePlant(plant) {
    if (!plant.alive) return;
    plant.alive = false;
    this.grid.removePlant(plant.row, plant.col);
    this.scene.remove(plant.model);
    plant.model.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    const idx = this.plants.indexOf(plant);
    if (idx !== -1) this.plants.splice(idx, 1);
  }

  _explodePlant(plant) {
    const zombies = this.game.zombieManager.getZombiesInRadius(
      plant.model.position.x, plant.model.position.z,
      plant.config.explodeRadius || 2
    );
    zombies.forEach(z => {
      z.takeDamage(plant.config.explodeDamage || 200);
    });
    this.particles.explosion(plant.model.position);
    this.audio.playExplosion();
    this.removePlant(plant);
  }

  getPlantAt(row, col) {
    return this.grid.getPlantAt(row, col);
  }

  update(dt) {
    for (let i = this.plants.length - 1; i >= 0; i--) {
      const p = this.plants[i];
      if (!p.alive) continue;

      p.animTime += dt;
      p.model.position.y = Math.sin(p.animTime * 1.5) * 0.02;

      if (p._icySlowTimer > 0) {
        p._icySlowTimer -= dt;
        if (p._icySlowTimer <= 0) p._icySlowFactor = 1;
      }

      if (p.config.sunInterval) {
        p.sunTimer += dt;
        if (p.sunTimer >= p.config.sunInterval) {
          p.sunTimer = 0;
          const factor = p.type === 'twinflower' ? 2 : 1;
          this.game.sunManager.dropSunAt(
            p.model.position.x + rand(-0.3, 0.3),
            p.model.position.z + rand(-0.3, 0.3),
            (p.config.sunAmount || 25) * factor
          );
          this.particles.burst(0xffdd44, p.model.position.clone().setY(0.5), 6, 1.5, 0.06, 0.3);
        }
      }

      if (p.type === 'potato' || p.type === 'landmine') {
        p.armTimer += dt;
        if (p.armTimer >= (p.config.armTime || 5) && !p.armed) {
          p.armed = true;
          if (p.type === 'landmine') {
            p.model.traverse(child => {
              if (child.isMesh) child.material.color.setHex(0x887766);
            });
          } else {
            p.model.traverse(child => {
              if (child.isMesh) child.material.color.setHex(0xff6622);
            });
          }
        }
      }

      if (p.type === 'homingpea') {
        p.fireTimer += dt * p._icySlowFactor;
        if (p.fireTimer >= p.config.fireRate) {
          p.fireTimer = 0;
          let target = null;
          let minDist = p.config.range || 14;
          for (const z of this.game.zombieManager.zombies) {
            if (!z.alive) continue;
            const d = z.x - p.model.position.x;
            if (d > 0 && d < minDist) {
              minDist = d;
              target = z;
            }
          }
          if (target) {
            const pos = p.model.position.clone();
            const extra = { targetZombie: target };
            const zPos = target.model.position.z;
            this.game.projectileManager.fire(pos, zPos, p.config.damage || 20, 'homing', extra);
            this.audio.playShoot();
          }
        }
      }

      if (p.config.damage && p.config.fireRate && !p.config._laser) {
        p.fireTimer += dt * p._icySlowFactor;
        if (p.fireTimer >= p.config.fireRate) {
          p.fireTimer = 0;
          const zombie = this.game.zombieManager.getClosestZombie(
            p.model.position.x, p.row, p.config.range || 12
          );
          if (zombie) {
            const shots = p.config.shotsPerFire || 1;
            for (let s = 0; s < shots; s++) {
              setTimeout(() => {
                if (!p.alive) return;
                const pos = p.model.position.clone();
                let projType = 'normal';
                const extra = {};
                if (p.type === 'snowpea') {
                  projType = 'ice';
                  extra.slowFactor = p.config.slowFactor;
                  extra.slowDuration = p.config.slowDuration;
                } else if (p.type === 'icepea') {
                  projType = 'ice';
                  extra.slowFactor = p.config.slowFactor || 0.4;
                  extra.slowDuration = p.config.slowDuration || 4;
                } else if (p.type === 'wintermelon') {
                  projType = 'wintermelon';
                  extra.slowFactor = p.config.slowFactor || 0.3;
                  extra.slowDuration = p.config.slowDuration || 4;
                } else if (p.type === 'sunpea') {
                  projType = 'sun';
                  extra.sunCallback = (x, z) => {
                    this.game.sunManager.dropSunAt(x, z, p.config.sunPerHit || 10);
                  };
                } else if (p.type === 'electropea') {
                  projType = 'electric';
                } else if (p.type === 'melon') {
                  projType = 'melon';
                } else if (p.type === 'cobcannon') {
                  projType = 'corn';
                } else if (p.type === 'spikerock') {
                  projType = 'spike';
                  extra.piercing = true;
                } else if (p.type === 'madweed') {
                  projType = 'mad';
                } else if (p.type === 'cactus') {
                  projType = 'cactus';
                  extra.piercing = true;
                } else if (p.type === 'nutshooter') {
                  projType = 'nut';
                } else if (p.type === 'peashooter') {
                  projType = 'pea';
                } else if (p.type === 'repeater') {
                  projType = 'rapid';
                } else if (p.type === 'doublepea') {
                  projType = 'twin';
                } else if (p.type === 'triplepea') {
                  projType = 'triple';
                  extra.zSpread = (s - 1) * 0.15;
                }
                const zPos = zombie.model.position.z;
                this.game.projectileManager.fire(pos, zPos, p.config.damage || 20, projType, extra);
                this.audio.playShoot();
              }, s * 100);
            }
          }
        }
      }

      if (p.type === 'gatlingpea') {
        const target = this.game.zombieManager.getClosestZombie(
          p.model.position.x, p.row, p.config.range || 12
        );
        if (target) {
          p.spinSpeed = Math.min(p.spinSpeed + (p.config.spinAccel || 5) * dt, p.config.maxSpinSpeed || 12);
        } else {
          p.spinSpeed = Math.max(p.spinSpeed - (p.config.spinDecel || 3) * dt, 0);
        }
        p.spinAngle += p.spinSpeed * dt;
        if (p.barrelGroup) {
          p.barrelGroup.rotation.z = p.spinAngle;
        }
        while (p.spinAngle - p.lastFireAngle >= Math.PI / 2) {
          p.lastFireAngle += Math.PI / 2;
          if (target && p.spinSpeed > 0.3) {
            const pos = p.model.position.clone();
            const barrelIdx = Math.floor(p.lastFireAngle / (Math.PI / 2)) % 4;
            pos.z += Math.sin(p.lastFireAngle) * 0.04;
            const extra = { zSpread: (barrelIdx / 3 - 0.5) * 0.3 };
            const zPos = target.model.position.z;
            this.game.projectileManager.fire(pos, zPos, p.config.damage || 20, 'gatling', extra);
            this.audio.playShoot();
          }
        }
      } else if (p.type === 'chomper') {
        p.chompTimer += dt;
        if (p.chompTimer >= (p.config.chompInterval || 2.5)) {
          const nearby = this.game.zombieManager.getZombiesInRadius(
            p.model.position.x, p.model.position.z, p.config.range || 1.5
          );
          if (nearby.length > 0) {
            p.chompTimer = 0;
            const target = nearby[0];
            target.takeDamage(p.config.chompDamage || 60);
            this.audio.playChomp();
            this.particles.burst(0xff4444, target.model.position.clone(), 8, 2, 0.1, 0.4);
          }
        }
      }

      if (p.type === 'laserbean') {
        p.fireTimer += dt;
        if (p.fireTimer >= p.config.fireRate) {
          p.fireTimer = 0;
          const zombie = this.game.zombieManager.getClosestZombie(
            p.model.position.x, p.row, p.config.range || 20
          );
          if (zombie) {
            zombie.takeDamage(p.config.damage);
            const from = p.model.position.clone();
            from.y = 0.6;
            const to = zombie.model.position.clone();
            to.y = 0.6;
            this._createLaserBeam(from, to);
            this.particles.burst(0xff2255, from, 6, 1.5, 0.08, 0.25);
            this.particles.burst(0xff4488, to, 10, 2, 0.1, 0.4);
            this.particles.burst(0xffffff, to, 5, 1, 0.05, 0.25);
            this.audio.playShoot();
          }
        }
      }

      // === new plant special abilities ===
      if ((p.type === 'squash' || p.type === 'thunder') && p.config.oneShot) {
        const nearby = this.game.zombieManager.getZombiesInRadius(
          p.model.position.x, p.model.position.z, p.config.explodeRadius || 1
        );
        if (nearby.length > 0) {
          if (p.type === 'squash') {
            this.particles.burst(0x88ff44, p.model.position.clone(), 10, 3, 0.12, 0.5);
            this.particles.burst(0xccaa44, p.model.position.clone(), 6, 2, 0.08, 0.4);
          } else {
            this.particles.burst(0x4444ff, p.model.position.clone(), 16, 4, 0.15, 0.6);
            this.particles.burst(0xffffff, p.model.position.clone(), 10, 2.5, 0.1, 0.4);
            this.particles.burst(0x8888ff, p.model.position.clone(), 8, 3, 0.12, 0.5);
          }
          this._explodePlant(p);
        }
      }

      if (p.type === 'jalapeno' && p.config.oneShot) {
        const laneZombies = this.game.zombieManager.zombies.filter(z =>
          z.alive && Math.abs(z.model.position.z - p.model.position.z) < 0.8
        );
        if (laneZombies.length > 0) {
          this.particles.burst(0xff4400, p.model.position.clone(), 25, 5, 0.15, 0.8);
          this.particles.burst(0xffcc00, p.model.position.clone(), 15, 3.5, 0.1, 0.5);
          this.particles.burst(0xff8800, p.model.position.clone(), 10, 2.5, 0.08, 0.4);
          this._explodePlant(p);
        }
      }

      if ((p.type === 'frost' || p.type === 'hypnoshroom') && p.alive) {
        const nearby = this.game.zombieManager.getZombiesInRadius(
          p.model.position.x, p.model.position.z, p.config.freezeDuration ? 1.5 : 1
        );
        if (nearby.length > 0) {
          const target = nearby[0];
          target.freezeTimer = (p.config.freezeDuration || 5);
          target.frozen = true;
          this.particles.burst(0x66ccff, target.model.position.clone(), 10, 2, 0.1, 0.4);
          this.audio.playFreeze();
          this.removePlant(p);
        }
      }

      if (p.type === 'spikerock' && p.alive) {
        const nearby = this.game.zombieManager.getZombiesInRadius(
          p.model.position.x, p.model.position.z, 0.5
        );
        if (nearby.length > 0) {
          const target = nearby[0];
          target.takeDamage(p.config.damage || 10);
        }
      }

      // === passive visual effects ===
      if (p.type === 'torchwood') {
        p.effectTimer = (p.effectTimer || 0) + dt;
        if (p.effectTimer > 0.4) {
          p.effectTimer = 0;
          this.particles.burst(0xff6600, p.model.position.clone().setY(0.4), 2, 1.0, 0.04, 0.4);
        }
      }

      if (p.type === 'garlic') {
        const nearby = this.game.zombieManager.getZombiesInRadius(
          p.model.position.x, p.model.position.z, 1.5
        );
        if (nearby.length > 0) {
          p.stinkTimer = (p.stinkTimer || 0) + dt;
          if (p.stinkTimer > 0.8) {
            p.stinkTimer = 0;
            this.particles.burst(0x88cc66, p.model.position.clone().setY(0.3), 6, 1.5, 0.06, 0.5);
          }
        }
      }

      if (p.type === 'coffee') {
        p.effectTimer = (p.effectTimer || 0) + dt;
        if (p.effectTimer > 0.7) {
          p.effectTimer = 0;
          this.particles.burst(0xffdd44, p.model.position.clone().setY(0.5), 3, 1.2, 0.04, 0.3);
        }
      }

      if (p.type === 'moonflower') {
        p.effectTimer = (p.effectTimer || 0) + dt;
        if (p.effectTimer > 1.2) {
          p.effectTimer = 0;
          this.particles.burst(0x9933ff, p.model.position.clone().setY(0.3), 5, 1.8, 0.06, 0.5);
        }
      }

      if (p.type === 'lotus') {
        p.effectTimer = (p.effectTimer || 0) + dt;
        if (p.effectTimer > 1.0) {
          p.effectTimer = 0;
          this.particles.burst(0xff88aa, p.model.position.clone().setY(0.5), 4, 1.5, 0.05, 0.4);
        }
      }

      if (p.type === 'umbrella') {
        p.effectTimer = (p.effectTimer || 0) + dt;
        if (p.effectTimer > 0.8) {
          p.effectTimer = 0;
          this.particles.burst(0x4488ff, p.model.position.clone().setY(0.6), 3, 1.0, 0.04, 0.3);
        }
      }

      if (p.type === 'gravebuster') {
        p.effectTimer = (p.effectTimer || 0) + dt;
        if (p.effectTimer > 0.5) {
          p.effectTimer = 0;
          this.particles.burst(0xbb88ff, p.model.position.clone().setY(0.4), 4, 1.5, 0.05, 0.3);
        }
      }

      if (p.type === 'carrot') {
        p.effectTimer = (p.effectTimer || 0) + dt;
        if (p.effectTimer > 0.6) {
          p.effectTimer = 0;
          this.particles.burst(0xffaa22, p.model.position.clone().setY(0.5), 3, 1.2, 0.04, 0.3);
        }
      }

      if (p.type === 'marigold') {
        p.effectTimer = (p.effectTimer || 0) + dt;
        if (p.effectTimer > 0.5) {
          p.effectTimer = 0;
          this.particles.burst(0xffee44, p.model.position.clone().setY(0.5), 3, 1.2, 0.04, 0.3);
        }
      }
    }

    // Laser beams update
    for (let li = this.laserBeams.length - 1; li >= 0; li--) {
      const lb = this.laserBeams[li];
      lb.life -= dt;
      if (lb.life <= 0) {
        this.scene.remove(lb.mesh);
        lb.mesh.geometry.dispose();
        lb.mesh.material.dispose();
        this.laserBeams.splice(li, 1);
      } else {
        lb.mesh.material.opacity = lb.life / lb.maxLife;
      }
    }
  }

  clear() {
    this.plants.forEach(p => {
      this.scene.remove(p.model);
      p.model.traverse(child => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    });
    this.plants = [];
    this.laserBeams.forEach(lb => {
      this.scene.remove(lb.mesh);
      lb.mesh.geometry.dispose();
      lb.mesh.material.dispose();
    });
    this.laserBeams = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 9; c++) {
        this.grid.cells[r][c].plant = null;
        this.grid.cells[r][c].occupied = false;
      }
    }
  }

  findFusionTargets(row, col) {
    return this.grid.findAdjacentPlants(row, col);
  }
}
