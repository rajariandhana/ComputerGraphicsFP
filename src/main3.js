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
import { Tween } from 'three/examples/jsm/libs/tween.module.js';

console.warn = function() {};

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap; // default
renderer.physicallyCorrectLights = true; // Enable PBR lighting
document.body.appendChild( renderer.domElement );

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let controls = new OrbitControls( camera, renderer.domElement );
// controls.target.set(-300, 100, 190);
// camera.position.set(-100, 140, 190);

controls.target.set(0, 100, -200);
camera.position.set(0, 140, 0);
controls.update();

let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
window.addEventListener('click', (event) => {
    // console.log("click", event);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children,true);
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        let parentGroup = clickedObject;
        while (parentGroup && !(parentGroup instanceof THREE.Group)) {
            parentGroup = parentGroup.parent;
        }

        if (parentGroup && parentGroup.userData.type === 'MainDoor') {
            parentGroup.userData.doorInstance.ToggleDoor();
        }
        else if (parentGroup && parentGroup.userData.type === 'RackFlat') {
            parentGroup.userData.rackInstance.ToggleLamp();
        }
    }
});
// let cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
//     format: THREE.RGBAFormat,
//     generateMipmaps: true,
//     minFilter: THREE.LinearMipmapLinearFilter,
// });
// let cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
// scene.add(cubeCamera);

let ambient = new THREE.AmbientLight(0xffffff,1);
scene.add(ambient);
ambient.castShadow=true

let sun = new THREE.DirectionalLight(0xffffff, 1.5);
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

let sunHelper = new THREE.DirectionalLightHelper(sun,3);
scene.add(sun,sunHelper);

// let cubeG = new THREE.BoxGeometry( 1, 1, 1 );
// let cubeM = new THREE.MeshStandardMaterial( { color: 0xff0a23 } );
// let cube = new THREE.Mesh( cubeG, cubeM );
// cube.castShadow=true;
// cube.position.set(0,1,0);
// scene.add( cube );

let floorTexture = new THREE.TextureLoader().load('/textures/Floor2.jpg');
floorTexture.rotation = Math.PI / 2;
floorTexture.center.set(0.5, 0.5);
let floorG = new THREE.PlaneGeometry(600,700);
let floorM = new THREE.MeshStandardMaterial({ 
    map: floorTexture,            
    side: THREE.DoubleSide,
});
let floor = new THREE.Mesh(floorG,floorM);
floor.receiveShadow = true;
floor.rotation.x=-Math.PI / 2;
floor.rotation.y = Math.PI;
scene.add(floor);

let wallNorth = new THREE.Group();
wallNorth.rotation.y=-Math.PI / 2;
wallNorth.position.x = -floor.geometry.parameters.width/2;
wallNorth.position.y = 100;

let blueTexture = new THREE.TextureLoader().load('/textures/blueWall.jpg');
let blueMaterial = new THREE.MeshStandardMaterial({
    map:blueTexture,
    side:THREE.DoubleSide
})

scene.add(wallNorth);

let blueWall = new THREE.Mesh(
    new THREE.PlaneGeometry(400,200),
    blueMaterial
);
blueWall.position.x = -160;
blueWall.castShadow = true;
blueWall.receiveShadow = true;
wallNorth.add(blueWall);
let blueStanding1 = new THREE.Mesh(
    new THREE.BoxGeometry(20,200,55),
    blueMaterial
)
blueStanding1.position.set(-floor.geometry.parameters.width/2 - 40,0,-30);
wallNorth.add(blueStanding1);
let blueStanding2 = blueStanding1.clone();
blueStanding2.position.x = blueStanding1.position.x * -1;
wallNorth.add(blueStanding2);

let door = new MainDoor();
door.position.set(180, -100, -10);
wallNorth.add(door);

// let wallSouth = blueWall.clone();  // Clone the wall for consistency
// wallSouth.position.x = floor.geometry.parameters.width / 2;
// scene.add(wallSouth);

let wallWest = new THREE.Mesh(
    new THREE.PlaneGeometry(600, 200), // Match floor width
    new THREE.MeshStandardMaterial({ color: 0xD9D3C3, side: THREE.DoubleSide })
);
wallWest.receiveShadow = true;
wallWest.position.z = -floor.geometry.parameters.height / 2; // Edge along Z-axis
wallWest.position.y = wallWest.geometry.parameters.height / 2;
scene.add(wallWest);

let wallEast = wallWest.clone();
wallEast.position.z = floor.geometry.parameters.height / 2; // Opposite edge along Z-axis
scene.add(wallEast);

// let helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

let rackFlat1 = new RackFlat();
rackFlat1.position.set(-274, 140, -70);
rackFlat1.castShadow=true

let rackFlat2 = new RackFlat();
rackFlat2.position.set(-274, 140, -240);
rackFlat2.castShadow=true

let workspace1 = new WorkSpace();
workspace1.position.set(-274,0,-60);
workspace1.castShadow=true

let workspace2 = new WorkSpace();
workspace2.position.set(-274,0,-240);
workspace2.castShadow=true

let workspace3 = new WorkSpace();
workspace3.position.set(-60, 0, 325);
workspace3.rotation.y = Math.PI / 2;

let workspace4 = new WorkSpace();
workspace4.position.set(120, 0, 325);
workspace4.rotation.y = Math.PI / 2;

let woodenWall = new WoodenWall();
woodenWall.position.set(-170,0,wallWest.position.z);
scene.add(rackFlat1,rackFlat2,workspace1,workspace2,workspace3,workspace4,woodenWall);

let tv = new TV();
tv.position.set(0, 120, -345.1); 
scene.add(tv);

let whiteboard = new Whiteboard();
whiteboard.position.set(180, 120, -350.1); 
scene.add(whiteboard);

let conferenceTable = new ConferenceTable();
conferenceTable.position.set(10, 0, -30); 
scene.add(conferenceTable);

// let table2 = new Table();
// table2.position.set(0, 1, -7.5);
// table2.rotation.y = 180*Math.PI;
// scene.add(table2);

// let chair1 = new Chair();
// chair1.position.set(0, 1, 0);
// chair1.rotation.y = -Math.PI /2;
// scene.add(chair1);

// Assuming your previous setup code remains the same...

// Create the GUI
let gui = new dat.GUI();

// Add camera position controls
let cameraFolder = gui.addFolder('Camera Position');
cameraFolder.add(camera.position, 'x', -500, 500).step(1).name('Camera X');
cameraFolder.add(camera.position, 'y', -500, 500).step(1).name('Camera Y');
cameraFolder.add(camera.position, 'z', -500, 500).step(1).name('Camera Z');
cameraFolder.open();

// Add controls for OrbitControls
let controlsFolder = gui.addFolder('Orbit Controls');
controlsFolder.add(controls.target, 'x', -500, 500).step(1).name('Target X');
controlsFolder.add(controls.target, 'y', -500, 500).step(1).name('Target Y');
controlsFolder.add(controls.target, 'z', -500, 500).step(1).name('Target Z');
controlsFolder.open();

// Add light (ambient light) controls
// let ambientLightFolder = gui.addFolder('Ambient Light');
// ambientLightFolder.add(ambient, 'intensity', 0, 2).step(0.01).name('Ambient Light Intensity');

// Add sun (directional light) controls
// let sunFolder = gui.addFolder('Directional Light');
// sunFolder.add(sun.position, 'x', -500, 500).step(1).name('Sun X');
// sunFolder.add(sun.position, 'y', 0, 500).step(1).name('Sun Y');
// sunFolder.add(sun.position, 'z', -500, 500).step(1).name('Sun Z');
// sunFolder.add(sun, 'intensity', 0, 5).step(0.01).name('Sun Intensity');

// Add shadow control for sun light
// let shadowFolder = gui.addFolder('Sun Shadows');
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
let resetButton = {
    resetCamera: () => {
        camera.position.set(150, 160, 0);
        controls.target.set(-120, 0, 0);
        controls.update();
    }
};
gui.add(resetButton, 'resetCamera').name('Reset Camera Position');

function animate() {
    // controls.update();
    renderer.render(scene, camera);
}