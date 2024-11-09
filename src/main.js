import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import { World } from './world';

const gui = new GUI();
const stats = new Stats();
document.body.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(5, 0, 5);
camera.position.set(0, 2, 0);
controls.update();

const world = new World(10,10);
scene.add(world);

const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1,2,3);
scene.add(sun);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.MeshStandardMaterial( { color: 0xff0a23 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
scene.add( cube );

// const torusGeometry = new THREE.TorusGeometry( 3, 1.3, 12, 48 ); 
// const torusMaterial = new THREE.MeshStandardMaterial( { color: 0xd7873c } ); 
// const torus = new THREE.Mesh( torusGeometry, torusMaterial ); scene.add( torus );
// scene.add( torus );
// torus.position.set(10,5,10);


camera.position.set(10,2,10);
console.log(window.innerWidth);
console.log(window.innerHeight);
controls.update();

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;
  // torus.rotation.z += 0.01;
  controls.update();
	renderer.render( scene, camera );
  stats.update();
}
;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const worldFolder = gui.addFolder('World');
worldFolder.add(world,'width',1,20,1).name('width');
worldFolder.add(world,'height',1,20,1).name('height');
worldFolder.addColor(world.terrain.material,'color').name('color');
worldFolder.add(world,'generate').name('generate');
//   worldFolder.onChange(()=>{
//   world.createTerrain();
// });
worldFolder.add(world,1,20,1,'treeCount').name('treeCount');
worldFolder.add(world,1,20,1,'rockCount').name('rockCount');
worldFolder.add(world,1,20,1,'bushCount').name('bushCount');