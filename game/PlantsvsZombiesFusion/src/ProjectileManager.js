import * as THREE from 'three';

export class ProjectileManager {
  constructor(scene, particleManager, audio, game = null) {
    this.scene = scene;
    this.particles = particleManager;
    this.audio = audio;
    this.game = game;
    this.projectiles = [];
  }

  fire(fromPos, toZ, damage, type = 'normal', extra = {}) {
    const isGatling = type === 'gatling';
    const isHoming = type === 'homing';
    const isElectric = type === 'electric';
    const isCorn = type === 'corn';
    const isSpike = type === 'spike';
    const isMad = type === 'mad';
    const isCactus = type === 'cactus';
    const isNut = type === 'nut';
    const isMelon = type === 'melon';
    const isPea = type === 'pea';
    const isRapid = type === 'rapid';
    const isTwin = type === 'twin';
    const isTriple = type === 'triple';

    const color = type === 'ice' ? 0x66ccff :
                  type === 'fire' ? 0xff6600 :
                  type === 'sun' ? 0xffdd44 :
                  isGatling ? 0xdd3333 :
                  isHoming ? 0xff8800 :
                  isElectric ? 0x66ddff :
                  isMelon ? 0x55cc55 :
                  isCorn ? 0xffaa22 :
                  isSpike ? 0x997755 :
                  isMad ? 0x88ff44 :
                  isCactus ? 0x99dd55 :
                  isNut ? 0xcc9955 :
                  isPea ? 0x66ee66 :
                  isRapid ? 0x88ee88 :
                  isTwin ? 0xaadd44 :
                  isTriple ? 0x44dd88 : 0x44aa44;

    let mesh;
    if (isHoming) {
      const g = new THREE.SphereGeometry(0.1, 8);
      const m = new THREE.MeshStandardMaterial({
        color: 0xff8800, emissive: 0xff6600, emissiveIntensity: 1.0
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.7;
      mesh.castShadow = true;
    } else if (isGatling) {
      const g = new THREE.SphereGeometry(0.055, 6);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.5
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
      mesh.scale.set(1, 1, 1.6);
    } else if (isElectric) {
      const g = new THREE.SphereGeometry(0.07, 6);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: 0x4488ff, emissiveIntensity: 1.5
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
      mesh.scale.set(1.2, 1, 1.2);
    } else if (isMelon) {
      const g = new THREE.SphereGeometry(0.15, 8);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.15
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    } else if (isCorn) {
      const g = new THREE.BoxGeometry(0.1, 0.1, 0.14);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: 0xff8800, emissiveIntensity: 0.4
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    } else if (isSpike) {
      const g = new THREE.ConeGeometry(0.04, 0.12, 4);
      const m = new THREE.MeshStandardMaterial({ color });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.5;
      mesh.castShadow = true;
      mesh.rotation.x = Math.PI / 2;
    } else if (isCactus) {
      const g = new THREE.CylinderGeometry(0.02, 0.04, 0.15, 4);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: 0x66aa33, emissiveIntensity: 0.2
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.55;
      mesh.castShadow = true;
      mesh.rotation.z = Math.PI / 2;
    } else if (isNut) {
      const g = new THREE.SphereGeometry(0.1, 8);
      const m = new THREE.MeshStandardMaterial({ color });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    } else if (isMad) {
      const g = new THREE.SphereGeometry(0.07, 5);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: 0x44ff00, emissiveIntensity: 0.6
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    } else if (isPea) {
      const g = new THREE.SphereGeometry(0.085, 8);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.25
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    } else if (isRapid) {
      const g = new THREE.SphereGeometry(0.065, 6);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: 0x66ff66, emissiveIntensity: 0.3
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    } else if (isTwin) {
      const g = new THREE.SphereGeometry(0.075, 7);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: 0x88cc22, emissiveIntensity: 0.2
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    } else if (isTriple) {
      const g = new THREE.SphereGeometry(0.072, 7);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: 0.2
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    } else {
      const g = new THREE.SphereGeometry(type === 'wintermelon' ? 0.15 : 0.08, 8);
      const m = new THREE.MeshStandardMaterial({
        color, emissive: color, emissiveIntensity: type === 'fire' ? 0.5 : 0.1
      });
      mesh = new THREE.Mesh(g, m);
      mesh.position.copy(fromPos);
      mesh.position.y = 0.6;
      mesh.castShadow = true;
    }
    this.scene.add(mesh);

    const zSpread = extra.zSpread || 0;

    this.projectiles.push({
      mesh,
      startX: fromPos.x,
      startZ: fromPos.z,
      z: fromPos.z,
      targetZ: toZ,
      speed: isHoming ? 2.5 : isNut ? 2.5 : isSpike || isCactus ? 6 : 4,
      zSpeed: zSpread * 2,
      damage,
      type,
      extra,
      alive: true,
      rotSpeed: Math.random() * 10 + 5,
      targetZombie: extra.targetZombie || null,
      homingStrength: 3,
      trailTimer: 0,
      madTimer: 0,
      hitZombies: new Set(),
    });
  }

  update(dt, zombieManager) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      if (!p.alive) continue;

      if (p.type === 'trail') {
        p.life -= dt;
        if (p.life <= 0) {
          this._remove(p, i);
        } else {
          p.mesh.material.opacity = (p.life / p.maxLife) * 0.7;
          p.mesh.scale.setScalar(1 - (1 - p.life / p.maxLife) * 0.5);
        }
        continue;
      }

      if (p.type === 'shockwave') {
        p.life -= dt;
        if (p.life <= 0) {
          this._remove(p, i);
        } else {
          const s = 1 + (1 - p.life / p.maxLife) * 3;
          p.mesh.scale.set(s, s, s);
          p.mesh.material.opacity = p.life / p.maxLife;
        }
        continue;
      }

      if (p.type === 'homing') {
        let target = p.targetZombie;
        if (!target || !target.alive) {
          const zombies = zombieManager.zombies;
          let closest = null;
          let minDist = 20;
          for (const z of zombies) {
            if (!z.alive || z.x < p.mesh.position.x) continue;
            const d = Math.sqrt((z.x - p.mesh.position.x) ** 2 + (z.model.position.z - p.mesh.position.z) ** 2);
            if (d < minDist) {
              minDist = d;
              closest = z;
            }
          }
          target = closest;
          p.targetZombie = target;
        }
        if (target && target.alive) {
          const dx = target.x - p.mesh.position.x;
          const dz = (target.model ? target.model.position.z : target.z || 0) - p.mesh.position.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const accel = dist < 2 ? 8 : 4;
          p.speed = Math.min(p.speed + accel * dt, dist < 2 ? 12 : 7);
          const targetAngle = Math.atan2(dz, dx);
          const currentAngle = Math.atan2(p.zSpeed, p.speed);
          const angleDiff = targetAngle - currentAngle;
          const steer = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff)) * Math.min(p.homingStrength * dt, 1);
          const newAngle = currentAngle + steer;
          p.speed = Math.max(0.5, p.speed);
          p.zSpeed = p.speed * Math.sin(newAngle);
          p.speed = p.speed * Math.cos(newAngle);
          const dir = new THREE.Vector3(p.speed, 0, p.zSpeed).normalize();
          p.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
        } else {
          p.mesh.rotation.y += p.rotSpeed * dt;
        }
        p.mesh.position.x += p.speed * dt;
        p.mesh.position.z += p.zSpeed * dt;
        p.trailTimer -= dt;
        if (p.trailTimer <= 0) {
          p.trailTimer = 0.04;
          this._spawnTrail(p.mesh.position);
        }
        if (p.mesh.position.x > 8 || p.mesh.position.x < -8) {
          this._remove(p, i);
          continue;
        }
      } else {
        if (p.type === 'mad') {
          p.madTimer = (p.madTimer || 0) + dt;
          p.mesh.position.z = p.startZ + Math.sin(p.madTimer * 10) * 0.4;
        }
        p.mesh.position.x += p.speed * dt;
        if (p.type !== 'spike' && p.type !== 'cactus') {
          p.mesh.position.z += p.zSpeed * dt;
        }
        if (p.type === 'gatling') {
          p.mesh.rotation.y += p.rotSpeed * dt;
        } else if (p.type === 'corn') {
          p.mesh.rotation.x += p.rotSpeed * dt * 2;
          p.mesh.rotation.z += p.rotSpeed * dt;
        } else if (p.type === 'spike' || p.type === 'cactus') {
          p.mesh.rotation.z += p.rotSpeed * dt * 2;
        } else {
          p.mesh.rotation.x += p.rotSpeed * dt;
          p.mesh.rotation.z += p.rotSpeed * dt * 0.5;
        }
        if (p.mesh.position.x > 8) {
          this._remove(p, i);
          continue;
        }
      }

      // hit detection
      if (p.type === 'spike' || p.type === 'cactus') {
        const zombies = zombieManager.zombies;
        for (const z of zombies) {
          if (!z.alive || p.hitZombies.has(z)) continue;
          const dist = Math.abs(z.x - p.mesh.position.x);
          if (dist <= 0.35) {
            const zDist = Math.abs(z.model.position.z - p.mesh.position.z);
            if (zDist <= 0.4) {
              p.hitZombies.add(z);
              z.takeDamage(p.damage);
              const hitPos = p.mesh.position.clone().setY(0.6);
              this.particles.burst(0x88ff44, hitPos, 4, 1.5, 0.04, 0.25);
              this.particles.sparkBurst(hitPos, 0x88ff44, 3);
              this.audio.playHit();
              if (this.game) this.game.spawnDamagePopup(hitPos, p.damage, '#88ff44');
            }
          }
        }
        continue;
      }

      const hit = zombieManager.hitTest(p.mesh.position.x, p.mesh.position.z, p.type === 'homing' ? 0.5 : 0.3);
      if (hit) {
        const dmg = p.damage;
        const pos = p.mesh.position.clone();
        const isBigHit = p.type === 'homing' || p.type === 'corn' || p.type === 'melon' || p.type === 'wintermelon' || p.type === 'electric';

        if (isBigHit) {
          if (this.game) {
            this.game.sceneManager.shake(0.25, 0.2);
            this.game.hitStop(0.06);
            this.game.sceneManager.flash(0xffffff, 0.08);
          }
        }

        if (p.type === 'homing') {
          const nearby = zombieManager.getZombiesInRadius(pos.x, pos.z, 1.5);
          nearby.forEach(z => { z.takeDamage(dmg); });
          this._explosionEffect(pos);
          if (this.game) {
            this.game.sceneManager.shake(0.35, 0.3);
            this.game.hitStop(0.1);
            this.game.sceneManager.flash(0xff8800, 0.12);
          }
        } else if (p.type === 'fire') {
          hit.takeDamage(dmg * 1.5);
          this.particles.fireHit(pos);
        } else if (p.type === 'ice') {
          hit.takeDamage(dmg);
          hit.applySlow(p.extra.slowFactor || 0.5, p.extra.slowDuration || 3);
          this.particles.iceHit(pos);
        } else if (p.type === 'wintermelon') {
          const nearby = zombieManager.getZombiesInRadius(pos.x, pos.z, 1.5);
          nearby.forEach(z => {
            z.takeDamage(dmg);
            z.applySlow(p.extra.slowFactor || 0.3, p.extra.slowDuration || 4);
          });
          this.particles.iceHit(pos);
          this.particles.ringBurst(0x88ddff, pos, 3, 3, 0.4);
          if (this.game) this.game.hitStop(0.08);
        } else if (p.type === 'electric') {
          hit.takeDamage(dmg);
          const chainTarget = zombieManager.getClosestZombie(pos.x, hit.row, 2);
          if (chainTarget && chainTarget !== hit) {
            chainTarget.takeDamage(Math.round(dmg * 0.5));
            this.particles.electricHit(chainTarget.model.position.clone());
            if (this.game) this.game.spawnDamagePopup(chainTarget.model.position.clone(), Math.round(dmg * 0.5), '#66ddff');
          }
          this.particles.electricHit(pos);
          this.particles.ringBurst(0x66ddff, pos, 3, 3, 0.35);
        } else if (p.type === 'melon') {
          const nearby = zombieManager.getZombiesInRadius(pos.x, pos.z, 1.2);
          nearby.forEach(z => z.takeDamage(dmg));
          this.particles.burst(0x55cc55, pos, 16, 3, 0.12, 0.5);
          this.particles.burst(0x88ff88, pos, 8, 1.5, 0.06, 0.3);
          this.particles.ringBurst(0x55cc55, pos, 3, 3, 0.4);
          if (this.game) { this.game.hitStop(0.07); this.game.sceneManager.flash(0x55cc55, 0.08); }
        } else if (p.type === 'corn') {
          const nearby = zombieManager.getZombiesInRadius(pos.x, pos.z, 1.0);
          nearby.forEach(z => z.takeDamage(dmg));
          this._explosionEffect(pos);
          if (this.game) {
            this.game.sceneManager.shake(0.3, 0.25);
            this.game.hitStop(0.09);
            this.game.sceneManager.flash(0xffaa22, 0.1);
          }
        } else if (p.type === 'nut') {
          hit.takeDamage(dmg);
          hit.applySlow(0.5, 0.3);
          this.particles.burst(0xcc9955, pos, 8, 2, 0.08, 0.3);
          this.particles.sparkBurst(pos, 0xcc9955, 4);
          if (this.game) this.game.hitStop(0.04);
        } else if (p.type === 'mad') {
          hit.takeDamage(dmg);
          this.particles.burst(0x88ff44, pos, 10, 2.5, 0.08, 0.4);
          this.particles.burst(0xccff88, pos, 6, 1.5, 0.05, 0.25);
          this.particles.sparkBurst(pos, 0x88ff44, 5);
        } else if (p.type === 'pea') {
          hit.takeDamage(dmg);
          this.particles.peaHit(pos, 0x66ee66);
          this.particles.sparkBurst(pos, 0x66ee66, 2);
        } else if (p.type === 'rapid') {
          hit.takeDamage(dmg);
          this.particles.peaHit(pos, 0x88ee88);
        } else if (p.type === 'twin') {
          hit.takeDamage(dmg);
          this.particles.peaHit(pos, 0xaadd44);
          this.particles.sparkBurst(pos, 0xaadd44, 3);
        } else if (p.type === 'triple') {
          hit.takeDamage(dmg);
          this.particles.peaHit(pos, 0x44dd88);
          this.particles.sparkBurst(pos, 0x44dd88, 3);
        } else {
          hit.takeDamage(dmg);
          this.particles.peaHit(pos);
          if (p.type === 'sun' && p.extra.sunCallback) {
            p.extra.sunCallback(pos.x, pos.z);
          }
        }

        if (this.game && dmg > 0) {
          this.game.spawnDamagePopup(pos, dmg, isBigHit ? '#ffdd44' : '#ffffff');
        }

        if (p.type === 'homing') {
          this.audio.playExplosion();
        } else if (p.type === 'fire') {
          this.audio.playShoot();
        } else {
          this.audio.playHit();
        }
        this._remove(p, i);
      }
    }
  }

  _spawnTrail(pos) {
    const g = new THREE.SphereGeometry(0.04, 4);
    const m = new THREE.MeshStandardMaterial({
      color: 0xcccccc, emissive: 0xaaaaaa,
      emissiveIntensity: 0.1, transparent: true, opacity: 0.5
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.copy(pos);
    mesh.position.x -= 0.05;
    mesh.position.y += Math.random() * 0.05;
    this.scene.add(mesh);
    this.projectiles.push({
      mesh, alive: true, type: 'trail',
      speed: 0, zSpeed: 0, damage: 0, extra: {}, startX: 0,
      z: 0, targetZ: 0, rotSpeed: 0, life: 0.3, maxLife: 0.3
    });
  }

  _explosionEffect(pos) {
    this.particles.burst(0xff6600, pos, 16, 3.5, 0.18, 0.6);
    this.particles.burst(0xffcc00, pos, 12, 2.5, 0.12, 0.5);
    this.particles.burst(0xffffff, pos, 8, 2, 0.08, 0.4);
    const ringG = new THREE.RingGeometry(0.1, 0.2, 24);
    const ringM = new THREE.MeshStandardMaterial({
      color: 0xff8800, emissive: 0xff4400,
      emissiveIntensity: 1.5, transparent: true, opacity: 1,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringG, ringM);
    ring.position.copy(pos);
    ring.position.y = 0.6;
    ring.rotation.x = -Math.PI / 2;
    this.scene.add(ring);
    this.projectiles.push({
      mesh: ring, alive: true, type: 'shockwave',
      life: 0.35, maxLife: 0.35, speed: 0, zSpeed: 0,
      damage: 0, extra: {}, startX: 0, z: 0, targetZ: 0, rotSpeed: 0
    });
  }

  _remove(p, idx) {
    if (p.type === 'trail' || p.type === 'shockwave') {
      this.scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
      this.projectiles.splice(idx, 1);
      return;
    }
    this.scene.remove(p.mesh);
    p.mesh.geometry.dispose();
    p.mesh.material.dispose();
    this.projectiles.splice(idx, 1);
  }

  clear() {
    this.projectiles.forEach(p => {
      this.scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    });
    this.projectiles = [];
  }
}
