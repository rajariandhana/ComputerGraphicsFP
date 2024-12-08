import * as THREE from 'three';
import { RectAreaLightHelper, RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';

class RackFlat extends THREE.Mesh {
  constructor() {
    super();
    this.rackGroup = new THREE.Group();
    this.isOn = true;
    this.lamp;


    const woodTexture = new THREE.TextureLoader().load('/textures/wood.jpg');
    const woodMaterial = new THREE.MeshStandardMaterial({
        map:woodTexture
    })
    let top = new THREE.Mesh(
        new THREE.BoxGeometry(170, 8, 30),
        woodMaterial
    );
    top.position.set(0, 0, -10);
    top.castShadow=true;
    top.receiveShadow=true;

    this.rackGroup.add(top);

    RectAreaLightUniformsLib.init();
    let rectLight = new THREE.RectAreaLight(0xfaf0dc,20,160,10);
    rectLight.position.set(0,-5,-10);
    rectLight.lookAt(0,-100,-10);
    rectLight.castShadow=true;
    this.add(rectLight);
    let rectLightHelper = new RectAreaLightHelper(rectLight);
    rectLight.add(rectLightHelper)

    this.rackGroup.userData.type = 'RackFlat'
    this.rackGroup.userData.rackInstance = this
    this.rackGroup.userData.lamp = rectLight

    // const spotLight = new THREE.SpotLight( 0xffffff );
    // spotLight.position.set( 0, 0, 0 );
    // spotLight.map = new THREE.TextureLoader().load('/textures/wood.jpg')
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 50;
    // spotLight.shadow.mapSize.height = 20;

    // spotLight.shadow.camera.near = 0;
    // spotLight.shadow.camera.far = 50;
    // spotLight.shadow.camera.fov = 30;
    // this.add(spotLight);

    // let spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // this.add(spotLightHelper)

    this.rotation.y = Math.PI / 2;
    this.add(this.rackGroup);
  }
  ToggleLamp(){
    console.log("toggle rack lamp");
    this.rackGroup.userData.lamp.intensity = this.isOn? 0:20;
    this.isOn = !this.isOn
  }
}

export { RackFlat };