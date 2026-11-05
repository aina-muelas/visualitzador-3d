import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 1. Crear l'escena 3D
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// 2. Crear la càmera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.set(0, 2, 5);

// 3. Crear el renderitzador[cite: 1]
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Il·luminació[cite: 1]
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// 5. Controls de rotació amb el ratolí[cite: 1]
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 6. Carregador de models 3D (adaptat al fitxer maple_tree.glb que tens a public/)[cite: 1, 2]
const loader = new GLTFLoader();
loader.load(
  '/maple_tree.glb', 
  (gltf) => {
    scene.add(gltf.scene);
    console.log('Model 3D carregat amb èxit');
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% carregat');
  },
  (error) => {
    console.error('S\'ha produït un error al carregar el model:', error);
  }
);

// Bucle d'animació i renderitzat
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Adaptar la pantalla si es redimensiona la finestra
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});