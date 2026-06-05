import * as THREE from 'three';

export function createZombieModel(type, color) {
  const group = new THREE.Group();
  const c = new THREE.Color(color);

  const bodyM = new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 });
  const skinM = new THREE.MeshStandardMaterial({ color: 0x88aa77, roughness: 0.8 });
  const armorM = new THREE.MeshStandardMaterial({ color: 0x886644, roughness: 0.6 });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.4, 6), skinM);
  body.position.y = 0.35;
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8), skinM);
  head.position.y = 0.65;
  head.castShadow = true;
  group.add(head);

  const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6), new THREE.MeshStandardMaterial({ color: 0xff4444 }));
  eye1.position.set(-0.05, 0.67, 0.12);
  group.add(eye1);
  const eye2 = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6), new THREE.MeshStandardMaterial({ color: 0xff4444 }));
  eye2.position.set(0.05, 0.67, 0.12);
  group.add(eye2);

  const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.28, 5), skinM);
  armL.position.set(-0.12, 0.32, 0.04);
  armL.rotation.x = Math.PI * 0.4;
  armL.rotation.y = 0.3;
  armL.name = 'armL';
  group.add(armL);
  const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.28, 5), skinM);
  armR.position.set(0.12, 0.32, 0.04);
  armR.rotation.x = Math.PI * 0.4;
  armR.rotation.y = -0.3;
  armR.name = 'armR';
  group.add(armR);

  switch (type) {
    case 'cone': {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.2, 6), new THREE.MeshStandardMaterial({ color: 0xff8833 }));
      cone.position.y = 0.78;
      group.add(cone);
      break;
    }
    case 'bucket': {
      const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.16, 8), new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.3 }));
      bucket.position.y = 0.78;
      group.add(bucket);
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 4, 8), new THREE.MeshStandardMaterial({ color: 0x888888 }));
      handle.position.y = 0.87;
      handle.rotation.x = Math.PI / 2;
      group.add(handle);
      break;
    }
    case 'flag': {
      const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.25, 4), new THREE.MeshStandardMaterial({ color: 0x886644 }));
      flagPole.position.set(-0.08, 0.8, 0.08);
      flagPole.rotation.z = 0.2;
      group.add(flagPole);
      const flagMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.07), new THREE.MeshStandardMaterial({ color: 0xff4444, side: THREE.DoubleSide }));
      flagMesh.position.set(-0.16, 0.85, 0.08);
      group.add(flagMesh);
      break;
    }
    case 'football': {
      const pad = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6), new THREE.MeshStandardMaterial({ color: 0xcc4444 }));
      pad.position.set(0, 0.68, 0.12);
      group.add(pad);
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8), new THREE.MeshStandardMaterial({ color: 0xcc4444 }));
      helmet.position.set(0, 0.72, 0.02);
      helmet.scale.set(1, 0.7, 1);
      group.add(helmet);
      break;
    }
    case 'boss': {
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 0.08, 6), new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.5 }));
      crown.position.y = 0.78;
      group.add(crown);
      body.scale.set(1.3, 1.2, 1.3);
      head.scale.set(1.2, 1.1, 1.2);
      head.position.y = 0.7;
      armL.scale.set(1.2, 1.1, 1.2);
      armR.scale.set(1.2, 1.1, 1.2);
      const cape = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.25), new THREE.MeshStandardMaterial({ color: 0xaa00aa, side: THREE.DoubleSide }));
      cape.position.set(0, 0.35, -0.12);
      group.add(cape);
      break;
    }
    case 'giant': {
      body.scale.set(1.5, 1.4, 1.5);
      head.scale.set(1.4, 1.3, 1.4);
      head.position.y = 0.72;
      armL.scale.set(1.4, 1.3, 1.4);
      armR.scale.set(1.4, 1.3, 1.4);
      const belt = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 4, 8), new THREE.MeshStandardMaterial({ color: 0x664422 }));
      belt.position.y = 0.28;
      belt.rotation.x = Math.PI / 2;
      group.add(belt);
      break;
    }
  }

  return group;
}

export function cloneZombieModel(group) {
  const clone = group.clone(true);
  clone.traverse(child => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.castShadow = true;
    }
  });
  return clone;
}
