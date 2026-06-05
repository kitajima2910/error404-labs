import * as THREE from 'three';

export function createPlantModel(type, color) {
  const group = new THREE.Group();
  const c = new THREE.Color(color);

  const bodyM = new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0.1 });

  switch (type) {
    case 'peashooter':
    case 'repeater':
    case 'doublepea':
    case 'sunpea':
    case 'icepea':
    case 'nutshooter': {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33, roughness: 0.7 }));
      stem.position.y = 0.25;
      group.add(stem);

      const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8), bodyM);
      body.position.y = 0.55;
      body.castShadow = true;
      group.add(body);

      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.15, 8), bodyM);
      head.position.y = 0.75;
      group.add(head);

      const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      eye1.position.set(-0.07, 0.78, 0.12);
      group.add(eye1);
      const eye2 = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      eye2.position.set(0.07, 0.78, 0.12);
      group.add(eye2);
      const pupil1 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6), new THREE.MeshStandardMaterial({ color: 0x000000 }));
      pupil1.position.set(-0.07, 0.78, 0.16);
      group.add(pupil1);
      const pupil2 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6), new THREE.MeshStandardMaterial({ color: 0x000000 }));
      pupil2.position.set(0.07, 0.78, 0.16);
      group.add(pupil2);

      const mouth = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.12, 6), new THREE.MeshStandardMaterial({ color: 0x226622 }));
      mouth.rotation.x = Math.PI / 3;
      mouth.position.set(0, 0.65, 0.18);
      group.add(mouth);

      const leafM = new THREE.MeshStandardMaterial({ color: 0x33aa33, roughness: 0.7 });
      const leaf1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6), leafM);
      leaf1.position.set(-0.2, 0.3, 0);
      leaf1.scale.set(1, 0.3, 0.6);
      group.add(leaf1);
      const leaf2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6), leafM);
      leaf2.position.set(0.2, 0.3, 0);
      leaf2.scale.set(1, 0.3, 0.6);
      group.add(leaf2);

      if (type === 'repeater' || type === 'doublepea') {
        const m2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 0.12, 8), bodyM);
        m2.position.set(0, 0.9, -0.05);
        group.add(m2);
      }
      if (type === 'sunpea') {
        const glow = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8), new THREE.MeshStandardMaterial({ color: 0xffdd44, emissive: 0xffaa00, emissiveIntensity: 0.3 }));
        glow.position.set(0, 0.55, 0.22);
        group.add(glow);
      }
      if (type === 'icepea') {
        const ice = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x66ccff, emissiveIntensity: 0.2 }));
        ice.position.set(0, 0.55, 0.2);
        group.add(ice);
      }
      break;
    }
    case 'sunflower':
    case 'twinflower': {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33, roughness: 0.7 }));
      stem.position.y = 0.25;
      group.add(stem);

      const center = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8), new THREE.MeshStandardMaterial({ color: 0x884422, roughness: 0.8 }));
      center.position.y = 0.6;
      group.add(center);

      const petalM = new THREE.MeshStandardMaterial({ color: 0xffdd44, roughness: 0.5 });
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const petal = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6), petalM);
        petal.scale.set(0.5, 0.2, 1.5);
        petal.position.set(Math.cos(angle) * 0.2, 0.6 + Math.sin(angle * 2) * 0.02, Math.sin(angle) * 0.2);
        petal.lookAt(0, 0.6, 0);
        group.add(petal);
      }

      const face = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), new THREE.MeshStandardMaterial({ color: 0x663311 }));
      face.position.set(0, 0.58, 0.18);
      group.add(face);

      const leafM = new THREE.MeshStandardMaterial({ color: 0x33aa33, roughness: 0.7 });
      const leaf1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), leafM);
      leaf1.position.set(-0.15, 0.25, 0);
      leaf1.scale.set(1.5, 0.3, 0.6);
      group.add(leaf1);
      const leaf2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), leafM);
      leaf2.position.set(0.15, 0.25, 0);
      leaf2.scale.set(1.5, 0.3, 0.6);
      group.add(leaf2);

      if (type === 'twinflower') {
        const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8), new THREE.MeshStandardMaterial({ color: 0x884422, roughness: 0.8 }));
        c2.position.set(0.15, 0.75, 0.05);
        group.add(c2);
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const petal = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), petalM);
          petal.scale.set(0.4, 0.15, 1.2);
          petal.position.set(0.15 + Math.cos(angle) * 0.15, 0.75 + Math.sin(angle * 2) * 0.02, 0.05 + Math.sin(angle) * 0.15);
          petal.lookAt(0.15, 0.75, 0.05);
          group.add(petal);
        }
      }
      break;
    }
    case 'snowpea':
    case 'icenut':
    case 'wintermelon': {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33, roughness: 0.7 }));
      stem.position.y = 0.25;
      group.add(stem);

      const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8), bodyM);
      body.position.y = 0.55;
      body.castShadow = true;
      group.add(body);

      const iceCrown = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x66ccff, emissiveIntensity: 0.2 }));
      iceCrown.position.set(0, 0.75, 0);
      iceCrown.scale.set(1, 0.4, 1);
      group.add(iceCrown);

      const eyes = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6), new THREE.MeshStandardMaterial({ color: 0x003366 }));
      eyes.position.set(0, 0.52, 0.2);
      group.add(eyes);

      if (type === 'wintermelon') {
        body.scale.set(1.3, 1.1, 1.3);
        const crown2 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 6), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x66ccff, emissiveIntensity: 0.3 }));
        crown2.position.set(0, 0.8, 0);
        crown2.scale.set(1, 0.3, 1);
        group.add(crown2);
      }
      break;
    }
    case 'wallnut':
    case 'tallnut':
    case 'sunnut': {
      const body = new THREE.Mesh(new THREE.SphereGeometry(type === 'tallnut' ? 0.35 : 0.25, 8), bodyM);
      body.position.y = type === 'tallnut' ? 0.5 : 0.3;
      body.scale.set(1, type === 'tallnut' ? 1.6 : 1.2, 1);
      body.castShadow = true;
      group.add(body);

      const face = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6), new THREE.MeshStandardMaterial({ color: 0x664422 }));
      face.position.set(0, 0.3, 0.22);
      group.add(face);

      if (type === 'sunnut') {
        const glow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8), new THREE.MeshStandardMaterial({ color: 0xffdd44, emissive: 0xffaa00, emissiveIntensity: 0.2 }));
        glow.position.set(0, 0.55, 0);
        group.add(glow);
      }
      break;
    }
    case 'cherrybomb': {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8), bodyM);
      body.position.y = 0.25;
      body.castShadow = true;
      group.add(body);

      const body2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8), bodyM);
      body2.position.set(0.15, 0.3, 0.05);
      group.add(body2);

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.15, 4), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      stem.position.set(0.07, 0.42, 0.02);
      group.add(stem);

      const fuse = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 4), new THREE.MeshStandardMaterial({ color: 0x886644 }));
      fuse.position.set(0.12, 0.48, 0.05);
      fuse.rotation.x = 0.3;
      group.add(fuse);
      break;
    }
    case 'chomper': {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8), bodyM);
      body.position.y = 0.25;
      body.castShadow = true;
      group.add(body);

      const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.25), new THREE.MeshStandardMaterial({ color: 0xff6666 }));
      mouth.position.set(0, 0.15, 0.2);
      group.add(mouth);

      const teeth = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 4), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      teeth.position.set(0, 0.12, 0.34);
      group.add(teeth);

      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      eye.position.set(0, 0.32, 0.18);
      group.add(eye);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6), new THREE.MeshStandardMaterial({ color: 0x000000 }));
      pupil.position.set(0, 0.32, 0.22);
      group.add(pupil);
      break;
    }
    case 'torchwood': {
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x885522, roughness: 0.9 }));
      body.position.y = 0.25;
      group.add(body);

      const fire = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 6), new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff4400, emissiveIntensity: 0.5 }));
      fire.position.y = 0.55;
      group.add(fire);

      const fire2 = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.15, 6), new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xff8800, emissiveIntensity: 0.6 }));
      fire2.position.y = 0.62;
      group.add(fire2);

      const eyes = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6), new THREE.MeshStandardMaterial({ color: 0xffdd00 }));
      eyes.position.set(0, 0.3, 0.15);
      group.add(eyes);
      break;
    }
    case 'potato': {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8), bodyM);
      body.position.y = 0.1;
      body.scale.set(1, 0.7, 1);
      body.castShadow = true;
      group.add(body);

      const eyes = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6), new THREE.MeshStandardMaterial({ color: 0x000000 }));
      eyes.position.set(0.06, 0.12, 0.15);
      group.add(eyes);
      const eyes2 = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6), new THREE.MeshStandardMaterial({ color: 0x000000 }));
      eyes2.position.set(-0.06, 0.12, 0.15);
      group.add(eyes2);
      break;
    }
    case 'iceberg': {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8), bodyM);
      body.position.y = 0.12;
      body.scale.set(1, 0.6, 1);
      body.castShadow = true;
      group.add(body);

      const crown = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x66ccff, emissiveIntensity: 0.2 }));
      crown.position.set(0, 0.22, 0);
      group.add(crown);
      break;
    }
    // === new plant models ===
    case 'gatlingpea':
    case 'triplepea': {
      const gStem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33, roughness: 0.7 }));
      gStem.position.y = 0.25;
      group.add(gStem);
      const gBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8), bodyM);
      gBody.position.y = 0.55; gBody.castShadow = true;
      group.add(gBody);
      const gHead = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.18, 8), bodyM);
      gHead.position.y = 0.78;
      group.add(gHead);
      const gEye1 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      gEye1.position.set(-0.06, 0.8, 0.14); group.add(gEye1);
      const gEye2 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      gEye2.position.set(0.06, 0.8, 0.14); group.add(gEye2);
      if (type === 'triplepea') {
        const m3 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.1, 6), bodyM);
        m3.setRotationFromEuler(new THREE.Euler(Math.PI/3, 0, -0.3));
        m3.position.set(0, 0.85, 0.18); group.add(m3);
        const m4 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.1, 6), bodyM);
        m4.setRotationFromEuler(new THREE.Euler(Math.PI/3, 0, 0.3));
        m4.position.set(0, 0.85, 0.18); group.add(m4);
      }
      if (type === 'gatlingpea') {
        const barrelGroup = new THREE.Group();
        barrelGroup.name = 'barrelGroup';
        const barrelMat = new THREE.MeshStandardMaterial({ color: 0xcc4444, roughness: 0.3, metalness: 0.3 });
        for (let r = 0; r < 4; r++) {
          const angle = (r / 4) * Math.PI * 2;
          const barr = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.25, 6), barrelMat);
          barr.position.set(Math.cos(angle) * 0.08, Math.sin(angle) * 0.08, 0.12);
          barr.rotation.x = Math.PI / 2;
          barrelGroup.add(barr);
        }
        barrelGroup.position.y = 0.78;
        group.add(barrelGroup);
      }
      const gLeaf = new THREE.MeshStandardMaterial({ color: 0x33aa33, roughness: 0.7 });
      const gl1 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), gLeaf);
      gl1.position.set(-0.18, 0.3, 0); gl1.scale.set(1.5, 0.3, 0.6); group.add(gl1);
      const gl2 = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), gLeaf);
      gl2.position.set(0.18, 0.3, 0); gl2.scale.set(1.5, 0.3, 0.6); group.add(gl2);
      break;
    }
    case 'laserbean': {
      const lStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.4, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      lStem.position.y = 0.2; group.add(lStem);
      const lBody = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8), bodyM);
      lBody.position.y = 0.5; lBody.castShadow = true; group.add(lBody);
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8), new THREE.MeshStandardMaterial({ color: 0xff0044, emissive: 0xff0044, emissiveIntensity: 0.3 }));
      lens.position.set(0, 0.5, 0.22); group.add(lens);
      break;
    }
    case 'cactus': {
      const cBody = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.15, 0.5, 8), bodyM);
      cBody.position.y = 0.3; cBody.castShadow = true; group.add(cBody);
      const cTop = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6), bodyM);
      cTop.position.y = 0.58; group.add(cTop);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.12, 4), bodyM);
        arm.rotation.z = 0.5;
        arm.position.set(Math.cos(a) * 0.12, 0.35 + Math.sin(i) * 0.05, Math.sin(a) * 0.12);
        group.add(arm);
      }
      break;
    }
    case 'melon': {
      const mBody = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10), bodyM);
      mBody.position.y = 0.3; mBody.castShadow = true; group.add(mBody);
      const stripeM = new THREE.MeshStandardMaterial({ color: 0x225522, roughness: 0.7 });
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI;
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 4), stripeM);
        s.scale.set(0.3, 0.1, 1.5);
        s.position.set(Math.cos(a) * 0.2, 0.3, Math.sin(a) * 0.2);
        s.lookAt(0, 0.3, 0); group.add(s);
      }
      break;
    }
    case 'pumpkin': {
      const pBody = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8), bodyM);
      pBody.position.y = 0.3; pBody.scale.set(1, 0.9, 0.8); pBody.castShadow = true; group.add(pBody);
      const pStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.1, 4), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      pStem.position.y = 0.55; group.add(pStem);
      const pFace = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6), new THREE.MeshStandardMaterial({ color: 0x331100 }));
      pFace.position.set(0, 0.3, 0.24); group.add(pFace);
      break;
    }
    case 'sunshroom':
    case 'goldmushroom':
    case 'hypnoshroom': {
      const shStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 0.2, 6), new THREE.MeshStandardMaterial({ color: 0xeeddcc }));
      shStem.position.y = 0.12; group.add(shStem);
      const shCap = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8), bodyM);
      shCap.position.y = 0.3; shCap.scale.set(1, 0.5, 1); shCap.castShadow = true; group.add(shCap);
      const shUnder = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.04, 6), new THREE.MeshStandardMaterial({ color: 0xccbbaa }));
      shUnder.position.y = 0.2; group.add(shUnder);
      if (type === 'hypnoshroom') {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 6, 12), new THREE.MeshStandardMaterial({ color: 0xff44ff, emissive: 0xff44ff, emissiveIntensity: 0.3 }));
        ring.position.y = 0.32; ring.rotation.x = Math.PI / 2; group.add(ring);
      }
      break;
    }
    case 'solarpanel': {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.2), new THREE.MeshStandardMaterial({ color: 0x4488ff, metalness: 0.4, roughness: 0.2 }));
      panel.position.y = 0.35; group.add(panel);
      const spStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.25, 4), new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.6 }));
      spStem.position.y = 0.15; group.add(spStem);
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8), new THREE.MeshStandardMaterial({ color: 0x88ccff, emissive: 0x4488ff, emissiveIntensity: 0.2 }));
      glow.position.set(0, 0.38, 0); group.add(glow);
      break;
    }
    case 'sunlight': {
      const slStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.35, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      slStem.position.y = 0.2; group.add(slStem);
      const slHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8), bodyM);
      slHead.position.y = 0.45; slHead.castShadow = true; group.add(slHead);
      const glow2 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffff88, emissiveIntensity: 0.4 }));
      glow2.position.set(0, 0.45, 0.2); group.add(glow2);
      break;
    }
    case 'squash': {
      const sqBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8), bodyM);
      sqBody.position.y = 0.1; sqBody.scale.set(1.2, 0.5, 0.9); sqBody.castShadow = true; group.add(sqBody);
      const sqEyes = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6), new THREE.MeshStandardMaterial({ color: 0x000000 }));
      sqEyes.position.set(0, 0.12, 0.18); group.add(sqEyes);
      break;
    }
    case 'jalapeno': {
      const jBody = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.14, 0.4, 8), bodyM);
      jBody.position.y = 0.22; jBody.castShadow = true; group.add(jBody);
      const jStem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.08, 4), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      jStem.position.y = 0.44; group.add(jStem);
      const jGlow = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6), new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff4400, emissiveIntensity: 0.3 }));
      jGlow.position.set(0, 0.15, 0.1); group.add(jGlow);
      break;
    }
    case 'moonflower': {
      const mfStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.35, 6), new THREE.MeshStandardMaterial({ color: 0x226622 }));
      mfStem.position.y = 0.2; group.add(mfStem);
      const mfCtr = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8), new THREE.MeshStandardMaterial({ color: 0x224466 }));
      mfCtr.position.y = 0.45; group.add(mfCtr);
      const mfM = new THREE.MeshStandardMaterial({ color: 0x9933ff, roughness: 0.5 });
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const pt = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), mfM);
        pt.scale.set(0.4, 0.15, 1.2);
        pt.position.set(Math.cos(a) * 0.16, 0.45, Math.sin(a) * 0.16);
        pt.lookAt(0, 0.45, 0); group.add(pt);
      }
      break;
    }
    case 'electropea': {
      const eStem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      eStem.position.y = 0.25; group.add(eStem);
      const eBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8), bodyM);
      eBody.position.y = 0.55; eBody.castShadow = true; group.add(eBody);
      const coif = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x4488ff, emissiveIntensity: 0.4 }));
      coif.position.set(0, 0.55, 0.22); group.add(coif);
      break;
    }
    case 'frost': {
      const fBody = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8), bodyM);
      fBody.position.y = 0.25; fBody.castShadow = true; group.add(fBody);
      const fCrown = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 6, 12), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x66ccff, emissiveIntensity: 0.2 }));
      fCrown.position.y = 0.4; fCrown.rotation.x = Math.PI / 2; group.add(fCrown);
      break;
    }
    case 'landmine': {
      const lmBody = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8), bodyM);
      lmBody.position.y = 0.05; lmBody.scale.set(1, 0.4, 1); lmBody.castShadow = true; group.add(lmBody);
      break;
    }
    case 'thunder': {
      const tStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.3, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      tStem.position.y = 0.15; group.add(tStem);
      const tHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8), bodyM);
      tHead.position.y = 0.35; tHead.castShadow = true; group.add(tHead);
      const bolt = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 4), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x4444ff, emissiveIntensity: 0.5 }));
      bolt.position.y = 0.5; bolt.rotation.y = Math.PI / 4; group.add(bolt);
      break;
    }
    case 'cobcannon': {
      const cornBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.35, 8), bodyM);
      cornBody.position.y = 0.25; cornBody.castShadow = true; group.add(cornBody);
      const cornTop = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6), bodyM);
      cornTop.position.y = 0.45; group.add(cornTop);
      const cobMouth = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.08, 6), new THREE.MeshStandardMaterial({ color: 0xffdd44 }));
      cobMouth.rotation.x = Math.PI / 3; cobMouth.position.set(0, 0.3, 0.2); group.add(cobMouth);
      break;
    }
    case 'steelwall': {
      const swBody = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.6, 0.3), new THREE.MeshStandardMaterial({ color: 0x8888cc, metalness: 0.8, roughness: 0.3 }));
      swBody.position.y = 0.3; swBody.castShadow = true; group.add(swBody);
      const swFace = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6), new THREE.MeshStandardMaterial({ color: 0x444466 }));
      swFace.position.set(0, 0.32, 0.2); group.add(swFace);
      break;
    }
    case 'lotus': {
      const loStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 0.25, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      loStem.position.y = 0.12; group.add(loStem);
      const loM = new THREE.MeshStandardMaterial({ color: 0xff88aa, roughness: 0.4 });
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const pet = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6), loM);
        pet.scale.set(0.6, 0.15, 1.5);
        pet.position.set(Math.cos(a) * 0.1, 0.3, Math.sin(a) * 0.1);
        pet.lookAt(0, 0.3, 0); group.add(pet);
      }
      const loCtr = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6), new THREE.MeshStandardMaterial({ color: 0xffdd44 }));
      loCtr.position.y = 0.32; group.add(loCtr);
      break;
    }
    case 'spikerock': {
      const skBody = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6), bodyM);
      skBody.position.y = 0.08; skBody.scale.set(1.2, 0.5, 1); skBody.castShadow = true; group.add(skBody);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.1, 4), bodyM);
        spike.position.set(Math.cos(a) * 0.12, 0.12, Math.sin(a) * 0.12);
        group.add(spike);
      }
      break;
    }
    case 'bamboo': {
      const baStem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.55, 6), bodyM);
      baStem.position.y = 0.3; baStem.castShadow = true; group.add(baStem);
      const ringM = new THREE.MeshStandardMaterial({ color: 0x226622 });
      for (let i = 0; i < 3; i++) {
        const r = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.015, 4, 8), ringM);
        r.position.y = 0.1 + i * 0.2; r.rotation.x = Math.PI / 2; group.add(r);
      }
      break;
    }
    case 'garlic': {
      const gBody = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8), bodyM);
      gBody.position.y = 0.2; gBody.scale.set(0.8, 0.9, 0.8); gBody.castShadow = true; group.add(gBody);
      const gStem2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 0.12, 4), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      gStem2.position.y = 0.4; group.add(gStem2);
      break;
    }
    case 'marigold': {
      const mgStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 0.3, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      mgStem.position.y = 0.15; group.add(mgStem);
      const mgCtr = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), new THREE.MeshStandardMaterial({ color: 0x884422 }));
      mgCtr.position.y = 0.35; group.add(mgCtr);
      const mgM = new THREE.MeshStandardMaterial({ color: 0xffee44, roughness: 0.5 });
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const pt = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6), mgM);
        pt.scale.set(0.5, 0.15, 1.2);
        pt.position.set(Math.cos(a) * 0.1, 0.35, Math.sin(a) * 0.1);
        pt.lookAt(0, 0.35, 0); group.add(pt);
      }
      break;
    }
    case 'umbrella': {
      const umStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.35, 6), new THREE.MeshStandardMaterial({ color: 0x886644 }));
      umStem.position.y = 0.2; group.add(umStem);
      const umTop = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8), bodyM);
      umTop.position.y = 0.4; umTop.scale.set(1, 0.2, 1); umTop.castShadow = true; group.add(umTop);
      break;
    }
    case 'coffee': {
      const cfCup = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.12, 8), bodyM);
      cfCup.position.y = 0.12; cfCup.castShadow = true; group.add(cfCup);
      const cfLid = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6), new THREE.MeshStandardMaterial({ color: 0x442200 }));
      cfLid.position.y = 0.2; cfLid.scale.set(1, 0.3, 1); group.add(cfLid);
      const cfSteam = new THREE.Mesh(new THREE.SphereGeometry(0.02, 4), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 }));
      cfSteam.position.set(0, 0.28, 0); group.add(cfSteam);
      break;
    }
    case 'carrot': {
      const crBody = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 8), bodyM);
      crBody.position.y = 0.15; crBody.castShadow = true; group.add(crBody);
      const crLeaf = new THREE.MeshStandardMaterial({ color: 0x33aa33 });
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 - 0.5;
        const l = new THREE.Mesh(new THREE.SphereGeometry(0.03, 4), crLeaf);
        l.scale.set(0.3, 0.1, 1.5);
        l.position.set(Math.cos(a) * 0.04, 0.32, Math.sin(a) * 0.04);
        group.add(l);
      }
      break;
    }
    case 'madweed': {
      const mStem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.35, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      mStem.position.y = 0.2; group.add(mStem);
      const mHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8), bodyM);
      mHead.position.y = 0.42; mHead.castShadow = true; group.add(mHead);
      const mEyes = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      mEyes.position.set(0.05, 0.44, 0.16); group.add(mEyes);
      const mEyes2 = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      mEyes2.position.set(-0.05, 0.44, 0.16); group.add(mEyes2);
      const mPupil = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
      mPupil.position.set(0.05, 0.44, 0.18); group.add(mPupil);
      break;
    }
    case 'homingpea': {
      const hStem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0x33aa33 }));
      hStem.position.y = 0.25; group.add(hStem);
      const hBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8), bodyM);
      hBody.position.y = 0.55; hBody.castShadow = true; group.add(hBody);
      const hHead = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.15, 8), bodyM);
      hHead.position.y = 0.75; group.add(hHead);
      const hRadar = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6), new THREE.MeshStandardMaterial({ color: 0xff8800, emissive: 0xff6600, emissiveIntensity: 0.3 }));
      hRadar.position.set(0, 0.65, 0.22); group.add(hRadar);
      break;
    }
    case 'gravebuster': {
      const gvBody = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.25, 0.16), bodyM);
      gvBody.position.y = 0.15; gvBody.castShadow = true; group.add(gvBody);
      const gvCross = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.04), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      gvCross.position.y = 0.32; group.add(gvCross);
      break;
    }
    default: {
      const fallback = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.3, 0.25), bodyM);
      fallback.position.y = 0.15;
      fallback.castShadow = true;
      group.add(fallback);
    }
  }

  return group;
}

export function clonePlantModel(group) {
  const clone = group.clone(true);
  clone.traverse(child => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.castShadow = true;
    }
  });
  return clone;
}
