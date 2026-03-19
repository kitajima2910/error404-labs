
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('assets/snake.glb', (gltf) => {
    console.log('GLB loaded');
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    console.log('Model Size:', size.x, size.y, size.z);
    
    gltf.scene.traverse((node) => {
        if (node.isMesh) {
            console.log('Mesh:', node.name, 'Geometry:', node.geometry.type);
            const meshBox = new THREE.Box3().setFromObject(node);
            const meshSize = new THREE.Vector3();
            meshBox.getSize(meshSize);
            console.log(' - Mesh Size:', meshSize.x, meshSize.y, meshSize.z);
        }
    });
}, undefined, (error) => {
    console.error('Error loading GLB:', error);
});


