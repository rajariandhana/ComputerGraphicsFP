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

    let glassDoor = new THREE.Mesh(
        new THREE.BoxGeometry(120,150,5),
        glassMaterial,
    )
    this.door.add(glassDoor)
    glassDoor.position.y=150/2;

    let glassStanding1 = new THREE.Mesh(
        new THREE.BoxGeometry(40,170,5),
        glassMaterial,
    )
    glassStanding1.position.x = 110;
    glassStanding1.position.y=170/2;
    this.door.add(glassStanding1);

    let glassStanding2 = glassStanding1.clone();
    glassStanding2.position.x = glassStanding1.position.x * -1;
    this.door.add(glassStanding2);

    let glassTop = new THREE.Mesh(
        new THREE.BoxGeometry(260,20,5),
        glassMaterial,
    )
    glassTop.position.y=200-25;
    this.door.add(glassTop);

    // const woodTexture = new THREE.TextureLoader().load('/textures/wood2.jpeg');
    const archMaterial = new THREE.MeshStandardMaterial({
        // map:woodTexture
        color:0x997950,
    })
    let archStanding1 = new THREE.Mesh(
        new THREE.BoxGeometry(30, 150, 10),
        archMaterial
    );
    archStanding1.position.set(-75, 150/2, 0);
    archStanding1.castShadow=true;
    archStanding1.receiveShadow=true;
    this.door.add(archStanding1);

    let archStanding2 = archStanding1.clone();
    archStanding2.position.x = archStanding1.position.x * -1;
    this.door.add(archStanding2);

    let archTop = new THREE.Mesh(
        new THREE.BoxGeometry(180, 20, 10),
        archMaterial
    );
    archTop.position.set(0, 160, 0);
    archTop.castShadow=true;
    archTop.receiveShadow=true;
    this.door.add(archTop);

    const blueTexture = new THREE.TextureLoader().load('/textures/blueWall.jpg');
    const blueMaterial = new THREE.MeshStandardMaterial({
        map:blueTexture,
        side:THREE.DoubleSide
    })
    let blueStanding1 = new THREE.Mesh(
        new THREE.BoxGeometry(20,200,20),
        blueMaterial
    )
    blueStanding1.position.set(-140,100,0);
    blueStanding1.castShadow=true;
    blueStanding1.receiveShadow=true;
    this.add(blueStanding1);

    let blueStanding2 = blueStanding1.clone();
    blueStanding2.position.x = blueStanding1.position.x * -1;
    this.door.add(blueStanding2);

    let blueTop = new THREE.Mesh(
        new THREE.BoxGeometry(260, 15, 20),
        blueMaterial
    );
    blueTop.position.set(0, 200-7.5, 0);
    blueTop.castShadow=true;
    blueTop.receiveShadow=true;
    this.door.add(blueTop);

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