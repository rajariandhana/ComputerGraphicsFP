import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Table } from './table.js';
import { PC } from './pc.js';
import { Monitor } from './monitor.js';
import { TV } from './TV.js';
import { Whiteboard } from './whiteboard.js';
import { ConferenceTable } from './ConferenceTable.js';
import { RackFlat } from './rackFlat.js';
import { RackBox } from './rackBox.js';
import { WoodenWall } from './woodenWall.js';
import { MainDoor } from './mainDoor.js';
import { WorkSpace } from './workSpace.js';


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
controls.target.set(220, 120, 0);
camera.position.set(400, 160, 0);
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

// const cubeG = new THREE.BoxGeometry( 1, 1, 1 );
// const cubeM = new THREE.MeshStandardMaterial( { color: 0xff0a23 } );
// const cube = new THREE.Mesh( cubeG, cubeM );
// cube.castShadow=true;
// cube.position.set(0,1,0);
// scene.add( cube );

const floorTexture = new THREE.TextureLoader().load('/textures/Floor2.jpg');
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

const wallNorth = new THREE.Group();
wallNorth.rotation.y=-Math.PI / 2;
wallNorth.position.x = -floor.geometry.parameters.width/2;
wallNorth.position.y = 100;

const blueTexture = new THREE.TextureLoader().load('/textures/blueWall.jpg');
const blueMaterial = new THREE.MeshStandardMaterial({
    map:blueTexture,
    side:THREE.DoubleSide
})

scene.add(wallNorth);

const blueWall = new THREE.Mesh(
    new THREE.PlaneGeometry(400,200),
    blueMaterial
);
blueWall.position.x = -160;
blueWall.castShadow = true;
blueWall.receiveShadow = true;
wallNorth.add(blueWall);
const blueStanding1 = new THREE.Mesh(
    new THREE.BoxGeometry(20,200,55),
    blueMaterial
)
blueStanding1.position.set(-floor.geometry.parameters.width/2 - 40,0,-30);
wallNorth.add(blueStanding1);
let blueStanding2 = blueStanding1.clone();
blueStanding2.position.x = blueStanding1.position.x * -1;
wallNorth.add(blueStanding2);

const door = new MainDoor();
door.position.set(180, -100, -10);
wallNorth.add(door);

// const wallSouth = blueWall.clone();  // Clone the wall for consistency
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

const rackFlat1 = new RackFlat();
rackFlat1.position.set(-274, 140, -70);
scene.add(rackFlat1);

const rackFlat2 = new RackFlat();
rackFlat2.position.set(-274, 130, -240);
scene.add(rackFlat2);

const workspace1 = new WorkSpace();
workspace1.position.set(-274,0,-60);
scene.add(workspace1);

const workspace2 = new WorkSpace();
workspace2.position.set(-274,0,-240);
scene.add(workspace2);

const woodenWall = new WoodenWall();
woodenWall.position.set(-170,0,wallWest.position.z);
scene.add(woodenWall)

const workspace3 = new WorkSpace();
workspace3.position.set(-60, 0, 325);
workspace3.rotation.y = Math.PI / 2;
scene.add(workspace3);

const workspace4 = new WorkSpace();
workspace4.position.set(120, 0, 325);
workspace4.rotation.y = Math.PI / 2;
scene.add(workspace4);

const tv = new TV();
tv.position.set(0, 120, -345.1); 
scene.add(tv);

const whiteboard = new Whiteboard();
whiteboard.position.set(180, 120, -350.1); 
scene.add(whiteboard);

const conferenceTable = new ConferenceTable();
conferenceTable.position.set(10, 0, -30); 
scene.add(conferenceTable);

// const table2 = new Table();
// table2.position.set(0, 1, -7.5);
// table2.rotation.y = 180*Math.PI;
// scene.add(table2);

// const chair1 = new Chair();
// chair1.position.set(0, 1, 0);
// chair1.rotation.y = -Math.PI /2;
// scene.add(chair1);

// Assuming your previous setup code remains the same...

// Create the GUI
const gui = new dat.GUI();

// Add camera position controls
const cameraFolder = gui.addFolder('Camera Position');
cameraFolder.add(camera.position, 'x', -500, 500).step(1).name('Camera X');
cameraFolder.add(camera.position, 'y', -500, 500).step(1).name('Camera Y');
cameraFolder.add(camera.position, 'z', -500, 500).step(1).name('Camera Z');
cameraFolder.open();

// Add controls for OrbitControls
const controlsFolder = gui.addFolder('Orbit Controls');
controlsFolder.add(controls.target, 'x', -500, 500).step(1).name('Target X');
controlsFolder.add(controls.target, 'y', -500, 500).step(1).name('Target Y');
controlsFolder.add(controls.target, 'z', -500, 500).step(1).name('Target Z');
controlsFolder.open();

// Add light (ambient light) controls
// const ambientLightFolder = gui.addFolder('Ambient Light');
// ambientLightFolder.add(ambient, 'intensity', 0, 2).step(0.01).name('Ambient Light Intensity');

// Add sun (directional light) controls
// const sunFolder = gui.addFolder('Directional Light');
// sunFolder.add(sun.position, 'x', -500, 500).step(1).name('Sun X');
// sunFolder.add(sun.position, 'y', 0, 500).step(1).name('Sun Y');
// sunFolder.add(sun.position, 'z', -500, 500).step(1).name('Sun Z');
// sunFolder.add(sun, 'intensity', 0, 5).step(0.01).name('Sun Intensity');

// Add shadow control for sun light
// const shadowFolder = gui.addFolder('Sun Shadows');
// shadowFolder.add(sun.shadow.mapSize, 'width', 1024, 4096).step(256).name('Shadow Map Size Width');
// shadowFolder.add(sun.shadow.mapSize, 'height', 1024, 4096).step(256).name('Shadow Map Size Height');
// shadowFolder.add(sun.shadow.camera, 'near', 0, 10).step(0.1).name('Shadow Camera Near');
// shadowFolder.add(sun.shadow.camera, 'far', 10, 1000).step(1).name('Shadow Camera Far');
// shadowFolder.add(sun.shadow.camera, 'left', -500, 500).step(10).name('Shadow Camera Left');
// shadowFolder.add(sun.shadow.camera, 'right', -500, 500).step(10).name('Shadow Camera Right');
// shadowFolder.add(sun.shadow.camera, 'top', -500, 500).step(10).name('Shadow Camera Top');
// shadowFolder.add(sun.shadow.camera, 'bottom', -500, 500).step(10).name('Shadow Camera Bottom');
// shadowFolder.open();

// Optional: Add a button to reset camera position or other settings
const resetButton = {
    resetCamera: () => {
        camera.position.set(150, 160, 0);
        controls.target.set(-120, 0, 0);
        controls.update();
    }
};
gui.add(resetButton, 'resetCamera').name('Reset Camera Position');

function animate() {
    controls.update();
    renderer.render(scene, camera);
}