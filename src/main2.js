import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import { Table } from './table.js';
import { Chair } from './chair.js';
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFShadowMap; // default
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(0, 0, 0);
camera.position.set(5, 10, 10);
controls.update();

const ambient = new THREE.AmbientLight(0xffffff,1);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xffffff);
sun.intensity = 1;
// sun.position.set(5,5,5);
sun.position.set(0,5,0);
sun.castShadow=true;
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

const floorG = new THREE.PlaneGeometry(15,20);
const floorM = new THREE.MeshStandardMaterial({color:0xfefefe,side:THREE.DoubleSide});
const floor = new THREE.Mesh(floorG,floorM);
floor.receiveShadow = true;
floor.rotation.x=-Math.PI / 2;
scene.add(floor);

const wallNorth = new THREE.Mesh(
    new THREE.PlaneGeometry(20,5),
    new THREE.MeshStandardMaterial({color:0x0000ff,side:THREE.DoubleSide})
);
wallNorth.receiveShadow = true;
wallNorth.rotation.y=-Math.PI / 2;
wallNorth.position.x=-7.5;
wallNorth.position.y=2.5;
scene.add(wallNorth);

const wallSouth = new THREE.Mesh(
    new THREE.PlaneGeometry(15,5),
    new THREE.MeshStandardMaterial({color:0xffffff,side:THREE.DoubleSide})
);
wallSouth.receiveShadow = true;
wallSouth.position.z=-10;
wallSouth.position.y=2.5;
scene.add(wallSouth);


// const helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

const table1 = new Table();
table1.position.set(-5.5, 1, 0);
scene.add(table1);

const table2 = new Table();
table2.position.set(0, 1, -7.5);
table2.rotation.y = 180*Math.PI;
scene.add(table2);

const chair1 = new Chair();
chair1.position.set(0, 1, 0);
scene.add(chair1);

function animate() {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;
    // torus.rotation.x += 0.01;
    // torus.rotation.y += 0.01;
    // torus.rotation.z += 0.01;
    controls.update();
    renderer.render( scene, camera );
    // stats.update();
}