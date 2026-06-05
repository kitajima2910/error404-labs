import * as THREE from 'three';
import { CELL_SIZE, GRID_ROWS, GRID_COLS, GRID_OFFSET_X, GRID_OFFSET_Z, LANE_Z, COL_X } from './constants.js';

export class SceneManager {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 25, 40);

    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 50);
    this.camera.position.set(0, 14, 11);
    this.camera.lookAt(0, 0, 0);
    this._baseCamPos = this.camera.position.clone();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    container.appendChild(this.renderer.domElement);

    this.groundMesh = null;
    this.stripMeshes = [];
    this.gridHelpers = [];
    this.gridLineHelpers = [];
    this.ambientLight = null;
    this.sunLight = null;

    this._shakeIntensity = 0;
    this._shakeTimer = 0;
    this._shakeDuration = 0;

    this._flashMesh = null;
    this._flashTimer = 0;
    this._flashDuration = 0;

    this._setupLights();
    this._createGround();
    this._createGrid();
    this._createDecorations();
    this._handleResize();
    this._createFlashOverlay();
  }

  _setupLights() {
    const ambient = new THREE.AmbientLight(0x8899bb, 0.6);
    this.scene.add(ambient);
    this.ambientLight = ambient;

    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x3a6b35, 0.5);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffeedd, 1.8);
    sun.position.set(10, 20, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 40;
    sun.shadow.camera.left = -12;
    sun.shadow.camera.right = 12;
    sun.shadow.camera.top = 12;
    sun.shadow.camera.bottom = -12;
    this.scene.add(sun);
    this.sunLight = sun;

    const fill = new THREE.DirectionalLight(0x8888ff, 0.3);
    fill.position.set(-5, 10, -5);
    this.scene.add(fill);
  }

  _createFlashOverlay() {
    const g = new THREE.PlaneGeometry(30, 20);
    const m = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0,
      depthTest: false, side: THREE.DoubleSide
    });
    this._flashMesh = new THREE.Mesh(g, m);
    this._flashMesh.position.set(0, 0.5, -1);
    this._flashMesh.renderOrder = 999;
    this.scene.add(this._flashMesh);
  }

  flash(color = 0xffffff, duration = 0.15) {
    if (!this._flashMesh) return;
    this._flashMesh.material.color.setHex(color);
    this._flashMesh.material.opacity = 0.5;
    this._flashTimer = duration;
    this._flashDuration = duration;
  }

  shake(intensity = 0.3, duration = 0.2) {
    this._shakeIntensity = intensity;
    this._shakeDuration = duration;
    this._shakeTimer = duration;
  }

  _createGround() {
    const g = new THREE.PlaneGeometry(28, 16);
    const m = new THREE.MeshStandardMaterial({ color: 0x4a8c3f, roughness: 0.9 });
    const ground = new THREE.Mesh(g, m);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.05, 0);
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.groundMesh = ground;

    const stripG = new THREE.PlaneGeometry(28, 1.2);
    const stripM = new THREE.MeshStandardMaterial({ color: 0x3d7a33, roughness: 0.9 });
    this.stripMeshes = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      const strip = new THREE.Mesh(stripG, stripM.clone());
      strip.rotation.x = -Math.PI / 2;
      strip.position.set(0, -0.04, GRID_OFFSET_Z + r * CELL_SIZE);
      this.scene.add(strip);
      this.stripMeshes.push(strip);
    }
  }

  _createGrid() {
    const cellM = new THREE.MeshStandardMaterial({
      color: 0x5a9e4a, roughness: 0.8, transparent: true, opacity: 0.15
    });
    const cellG = new THREE.PlaneGeometry(CELL_SIZE * 0.9, CELL_SIZE * 0.9);
    this.gridHelpers = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        const m = new THREE.Mesh(cellG, cellM.clone());
        m.rotation.x = -Math.PI / 2;
        m.position.set(COL_X[c], -0.03, LANE_Z[r]);
        this.scene.add(m);
        this.gridHelpers.push(m);
      }
    }

    const edgeM = new THREE.LineBasicMaterial({ color: 0x3a7a2a, transparent: true, opacity: 0.3 });
    this.gridLineHelpers = [];
    for (let r = 0; r <= GRID_ROWS; r++) {
      const z = GRID_OFFSET_Z + (r - 0.5) * CELL_SIZE;
      const pts = [
        new THREE.Vector3(GRID_OFFSET_X - CELL_SIZE * 0.5, 0, z),
        new THREE.Vector3(GRID_OFFSET_X + (GRID_COLS - 1) * CELL_SIZE + CELL_SIZE * 0.5, 0, z)
      ];
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(g, edgeM.clone());
      this.scene.add(line);
      this.gridLineHelpers.push(line);
    }
    for (let c = 0; c <= GRID_COLS; c++) {
      const x = GRID_OFFSET_X + (c - 0.5) * CELL_SIZE;
      const pts = [
        new THREE.Vector3(x, 0, GRID_OFFSET_Z - CELL_SIZE * 0.5),
        new THREE.Vector3(x, 0, GRID_OFFSET_Z + (GRID_ROWS - 1) * CELL_SIZE + CELL_SIZE * 0.5)
      ];
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(g, edgeM.clone());
      this.scene.add(line);
      this.gridLineHelpers.push(line);
    }
  }

  _createDecorations() {
    const fenceM = new THREE.MeshStandardMaterial({ color: 0x8B6E4E, roughness: 0.8 });
    for (let r = 0; r < GRID_ROWS; r++) {
      const z = GRID_OFFSET_Z + r * CELL_SIZE;
      const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), fenceM.clone());
      post1.position.set(GRID_OFFSET_X - CELL_SIZE * 0.5 - 0.3, 0.2, z);
      this.scene.add(post1);
      const post2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), fenceM.clone());
      post2.position.set(GRID_OFFSET_X + (GRID_COLS - 1) * CELL_SIZE + CELL_SIZE * 0.5 + 0.3, 0.2, z);
      this.scene.add(post2);
    }

    const bushM = new THREE.MeshStandardMaterial({ color: 0x2d6b1e, roughness: 0.9 });
    for (let i = 0; i < 6; i++) {
      const bush = new THREE.Mesh(new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 6), bushM.clone());
      bush.position.set(
        GRID_OFFSET_X + (GRID_COLS - 1) * CELL_SIZE + 1.2 + Math.random() * 1.5,
        0.15,
        GRID_OFFSET_Z - 1 + Math.random() * (GRID_ROWS * CELL_SIZE + 2)
      );
      bush.castShadow = true;
      this.scene.add(bush);
    }
  }

  setTheme(theme) {
    this.scene.background = new THREE.Color(theme.sky);
    this.scene.fog = new THREE.Fog(theme.fog, theme.fogNear || 25, theme.fogFar || 40);

    if (this.groundMesh) {
      this.groundMesh.material.color.setHex(theme.ground);
    }

    this.stripMeshes.forEach(m => m.material.color.setHex(theme.groundStrip));

    this.gridHelpers.forEach(m => m.material.color.setHex(theme.grid));

    this.gridLineHelpers.forEach(m => m.material.color.setHex(theme.gridEdge));

    if (this.ambientLight) {
      this.ambientLight.color.setHex(theme.ambient);
    }

    if (this.sunLight) {
      this.sunLight.color.setHex(theme.sunColor);
      this.sunLight.intensity = theme.sunIntensity;
    }
  }

  _handleResize() {
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  screenToWorld(x, y) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndcX = ((x - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((y - rect.top) / rect.height) * 2 + 1;
    const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
    vec.unproject(this.camera);
    const dir = vec.sub(this.camera.position).normalize();
    const dist = -this.camera.position.y / dir.y;
    const pos = this.camera.position.clone().add(dir.multiplyScalar(dist));
    return { x: pos.x, z: pos.z };
  }

  highlightCell(row, col, active = true) {
    const idx = row * GRID_COLS + col;
    if (this.gridHelpers[idx]) {
      this.gridHelpers[idx].material.color.setHex(active ? 0x88ff66 : 0x5a9e4a);
      this.gridHelpers[idx].material.opacity = active ? 0.4 : 0.15;
    }
  }

  clearHighlights() {
    this.gridHelpers.forEach(h => {
      h.material.color.setHex(0x5a9e4a);
      h.material.opacity = 0.15;
    });
  }

  update(dt) {
    if (this._shakeTimer > 0) {
      this._shakeTimer -= dt;
      const t = this._shakeTimer / this._shakeDuration;
      const intensity = this._shakeIntensity * t;
      this.camera.position.x = this._baseCamPos.x + (Math.random() - 0.5) * intensity * 2;
      this.camera.position.z = this._baseCamPos.z + (Math.random() - 0.5) * intensity * 1.5;
      this.camera.lookAt(0, 0, 0);
    } else if (this.camera.position.x !== this._baseCamPos.x) {
      this.camera.position.copy(this._baseCamPos);
      this.camera.lookAt(0, 0, 0);
    }

    if (this._flashTimer > 0) {
      this._flashTimer -= dt;
      const t = this._flashTimer / this._flashDuration;
      this._flashMesh.material.opacity = t * 0.5;
    } else {
      this._flashMesh.material.opacity = 0;
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
