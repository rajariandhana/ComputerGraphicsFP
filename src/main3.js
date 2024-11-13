import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import { Table } from './table.js';
import { Chair } from './chair.js';
import { PC } from './pc.js';
import { Monitor } from './monitor.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap; // default
renderer.physicallyCorrectLights = true; // Enable PBR lighting
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(-120, 0, 0);
camera.position.set(150, 160, 0);
controls.update();

// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
//     format: THREE.RGBAFormat,
//     generateMipmaps: true,
//     minFilter: THREE.LinearMipmapLinearFilter,
// });
// const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
// scene.add(cubeCamera);

const ambient = new THREE.AmbientLight(0xffffff,1);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff, 1.5);
sun.position.set(100, 200, 100);
sun.castShadow = true;
sun.shadow.mapSize.width = 2048; // Increase shadow map resolution for sharper shadows
sun.shadow.mapSize.height = 2048;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 1000;
sun.shadow.camera.left = -200;
sun.shadow.camera.right = 200;
sun.shadow.camera.top = 200;
sun.shadow.camera.bottom = -200;

const sunHelper = new THREE.DirectionalLightHelper(sun,3);
scene.add(sun,sunHelper);

// const sun2 = new THREE.DirectionalLight(0x0000ff);
// sun2.intensity = 3;
// sun2.position.set(-5,5,-5);
// sun2.castShadow=true;
// const sun2Helper = new THREE.DirectionalLightHelper(sun2,3);
// scene.add(sun2,sun2Helper);

// const pointLight = new THREE.PointLight( 0x00ffff, 1,100 );
// pointLight.position.set( 0, 5, 5 );
// pointLight.castShadow=true;
// scene.add( pointLight );
// const pointLightHelper = new THREE.PointLightHelper( pointLight,1);
// scene.add( pointLightHelper );

// pointLight.shadow.mapSize.width = 512; // default
// pointLight.shadow.mapSize.height = 512; // default
// pointLight.shadow.camera.near = 0.5; // default
// pointLight.shadow.camera.far = 500; // default

const cubeG = new THREE.BoxGeometry( 1, 1, 1 );
const cubeM = new THREE.MeshStandardMaterial( { color: 0xff0a23 } );
const cube = new THREE.Mesh( cubeG, cubeM );
cube.castShadow=true;
cube.position.set(0,1,0);
// scene.add( cube );

const floorTexture = new THREE.TextureLoader().load('/textures/Floor.jpg');
floorTexture.rotation = Math.PI / 2;
floorTexture.center.set(0.5, 0.5);
const floorG = new THREE.PlaneGeometry(600,700);
const floorM = new THREE.MeshStandardMaterial({ 
    map: floorTexture,            
    side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorG,floorM);
floor.receiveShadow = true;
floor.rotation.x=-Math.PI / 2;
floor.rotation.y = Math.PI;
scene.add(floor);

const wallNorth = new THREE.Mesh(
    new THREE.PlaneGeometry(floor.geometry.parameters.height,200),
    new THREE.MeshStandardMaterial({color:0x0000ff,side:THREE.DoubleSide})
);
wallNorth.receiveShadow = true;
wallNorth.rotation.y=-Math.PI / 2;
wallNorth.position.x = -floor.geometry.parameters.width/2;
wallNorth.position.y = wallNorth.geometry.parameters.height/2;
scene.add(wallNorth);

// const wallSouth = wallNorth.clone();  // Clone the wall for consistency
// wallSouth.position.x = floor.geometry.parameters.width / 2;
// scene.add(wallSouth);

const wallWest = new THREE.Mesh(
    new THREE.PlaneGeometry(600, 200), // Match floor width
    new THREE.MeshStandardMaterial({ color: 0xD9D3C3, side: THREE.DoubleSide })
);
wallWest.receiveShadow = true;
wallWest.position.z = -floor.geometry.parameters.height / 2; // Edge along Z-axis
wallWest.position.y = wallWest.geometry.parameters.height / 2;
scene.add(wallWest);

const wallEast = wallWest.clone();
wallEast.position.z = floor.geometry.parameters.height / 2; // Opposite edge along Z-axis
scene.add(wallEast);

// const helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

const table1 = new Table();
table1.position.set(-274, 0, -84);
scene.add(table1);

const table2 = new Table();
table2.position.set(-274, 0, -257);
scene.add(table2);

const table3 = new Table();
table3.position.set(-60, 0, 325);
table3.rotation.y = -Math.PI / 1;
scene.add(table3);

const table4 = new Table();
table4.position.set(120, 0, 325);
table4.rotation.y = -Math.PI / 1;
scene.add(table4);

const monitor1 = new Monitor();
monitor1.position.set(-284, 75, -50);
monitor1.rotation.y = -Math.PI / 2;
scene.add(monitor1);

const pc1 = new PC();
pc1.position.set(-270,0, -22);
pc1.rotation.y = -Math.PI / 2;      //ntar gue tambahin lagi for the other -aul
scene.add(pc1);

// const table2 = new Table();
// table2.position.set(0, 1, -7.5);
// table2.rotation.y = 180*Math.PI;
// scene.add(table2);

// const chair1 = new Chair();
// chair1.position.set(0, 1, 0);
// chair1.rotation.y = -Math.PI /2;
// scene.add(chair1);


function animate() {
    // scene.rotation.x += 0.01;
    // scene.rotation.y += 0.01;
    // scene.rotation.z += 0.01;
    // torus.rotation.x += 0.01;
    // torus.rotation.y += 0.01;
    // torus.rotation.z += 0.01;
    // cubeCamera.position.copy(chair1.position);
    // chair1.visible = false;  // Hide chair to avoid self-reflection
    // cubeCamera.update(renderer, scene);
    // chair1.visible = true;

    controls.update();
    renderer.render(scene, camera);
    // stats.update();
}