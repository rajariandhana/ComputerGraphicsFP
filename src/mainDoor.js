import * as THREE from 'three';

class MainDoor extends THREE.Mesh {
  constructor() {
    super();
    this.door = new THREE.Group();

    const glassMaterial = new THREE.MeshPhysicalMaterial();
    glassMaterial.color = new THREE.Color(1,1,1);
    glassMaterial.transmission=1.0;
    glassMaterial.roughness=0.0;
    glassMaterial.ior = 5.0;
    glassMaterial.thickness = 0.9;
    glassMaterial.specularIntensity = 1.0;
    glassMaterial.clearcoat = 1.0;

    let pintuKaca = new THREE.Mesh(
        new THREE.BoxGeometry(120,150,5),
        glassMaterial,
    )
    this.door.add(pintuKaca)
    pintuKaca.position.y=150/2;


    const woodTexture = new THREE.TextureLoader().load('/textures/wood2.jpeg');
    const woodMaterial = new THREE.MeshStandardMaterial({
        map:woodTexture
    })
    let archStanding = new THREE.Mesh(
        new THREE.BoxGeometry(30, 150, 10),
        woodMaterial
    );
    archStanding.position.set(-75, 150/2, 0);
    archStanding.castShadow=true;
    archStanding.receiveShadow=true;
    this.door.add(archStanding);

    let archStanding2 = archStanding.clone();
    archStanding2.position.x = archStanding.position.x * -1;
    this.door.add(archStanding2);

    let archTop = new THREE.Mesh(
        new THREE.BoxGeometry(180, 20, 10),
        woodMaterial
    );
    archTop.position.set(0, 160, 0);
    archTop.castShadow=true;
    archTop.receiveShadow=true;
    this.door.add(archTop);

    const metalTexture = new THREE.TextureLoader().load('/textures/metal.jpeg');
    let metalMaterial = new THREE.MeshStandardMaterial({
        // color: 0xc3cace,
        map:metalTexture,
        // metalness:1.0,
        // roughness:0.05,
        // envMap: cubeRenderTarget.texture
    });
    let handle = new THREE.Mesh(
        new THREE.BoxGeometry(5, 20, 5),
        metalMaterial
    );
    handle.position.set(-10, 150/2, 0);
    handle.castShadow=true;
    handle.receiveShadow=true;
    this.door.add(handle);

    let handle2 = handle.clone();
    handle.position.x = handle.position.x * -1;
    this.door.add(handle2);

    this.add(this.door);
  }
}

export { MainDoor };