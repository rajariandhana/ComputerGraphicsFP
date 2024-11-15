import * as THREE from 'three';

class Chair extends THREE.Mesh {
  constructor() {
    super();
    this.chairGroup = new THREE.Group();

    const fabricTexture = new THREE.TextureLoader().load('/textures/blueFabric.jpeg');

    let seat = new THREE.Mesh(
        new THREE.BoxGeometry(46, 7, 48),
        new THREE.MeshStandardMaterial({
            // color: 0x0000ff
            map:fabricTexture
        })
    );
    seat.position.set(0, 46, 0);
    seat.castShadow=true;
    seat.receiveShadow=true;
    this.chairGroup.add(seat);

    const metalTexture = new THREE.TextureLoader().load('/textures/metal.jpeg');
    let metalMaterial = new THREE.MeshStandardMaterial({
        // color: 0xc3cace,
        map:metalTexture,
        // metalness:1.0,
        // roughness:0.05,
        // envMap: cubeRenderTarget.texture
    });

    let besiAlasSamping = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5,1.5,26,30),
        metalMaterial
    );
    besiAlasSamping.position.set(-seat.geometry.parameters.width/2,0,0);
    besiAlasSamping.rotation.x = Math.PI/2;
    besiAlasSamping.castShadow = true;
    besiAlasSamping.receiveShadow = true;

    let besiBerdiri = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5,45,30),
        metalMaterial
    );
    besiBerdiri.position.set(-seat.geometry.parameters.width/2, 32.5, -seat.geometry.parameters.width/2);
    besiBerdiri.castShadow = true;
    besiBerdiri.receiveShadow = true;

    let armRest = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5,1.5,36,30),
        metalMaterial
    );
    armRest.position.set(-seat.geometry.parameters.width/2,65,5);
    armRest.rotation.x = Math.PI/2;
    armRest.castShadow = true;
    armRest.receiveShadow = true;

    let besiAlasBelakang = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5,1.5,26,30),
        metalMaterial
    );
    besiAlasBelakang.rotation.z = Math.PI/2;
    besiAlasBelakang.position.set(0, 0, 23);
    besiAlasBelakang.castShadow = true;
    besiAlasBelakang.receiveShadow = true;

    let senderan = new THREE.Mesh(
        new THREE.BoxGeometry(50, 25, 2),
        new THREE.MeshStandardMaterial({
            color: 0x000000
        })
    );
    senderan.position.set(0,armRest.position.y,seat.geometry.parameters.width/2);
    senderan.castShadow = true;
    senderan.receiveShadow = true;

    let torusG = new THREE.TorusGeometry(10,1.5,besiAlasSamping.geometry.parameters.radialSegments,100,Math.PI/2); 
    let torus1 = new THREE.Mesh( torusG, metalMaterial );
    torus1.position.set(-seat.geometry.parameters.width/2, 55, -13);
    torus1.rotation.y = Math.PI/2;

    let torus2 = torus1.clone();
    torus2.rotation.x = -Math.PI/2;
    torus2.position.y=10;

    let torus3 = torus2.clone();
    torus3.rotation.z = -Math.PI/2;
    torus3.rotation.y = Math.PI;
    torus3.position.set(-13,0,13);

    this.leftGroup = new THREE.Group();
    this.leftGroup.add(besiAlasSamping,besiBerdiri,armRest,torus1,torus2,torus3);
    this.rightGroup = this.leftGroup.clone();
    this.rightGroup.scale.x = -1;
    this.rightGroup.position.x = -this.leftGroup.position.x;
    
    this.chairGroup.add(this.leftGroup,this.rightGroup,besiAlasBelakang,senderan);

    this.add(this.chairGroup);
    this.rotation.y = Math.PI / 2;
  }
}

export { Chair };