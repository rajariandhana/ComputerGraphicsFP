import * as THREE from 'three';

class RackBox extends THREE.Mesh {
  constructor() {
    super();
    this.rackGroup = new THREE.Group();

    const woodTexture = new THREE.TextureLoader().load('/textures/wood.jpg');
    const woodMaterial = new THREE.MeshStandardMaterial({
        map:woodTexture
    })
    let top = new THREE.Mesh(
        new THREE.BoxGeometry(100, 4, 20),
        woodMaterial
    );
    top.position.set(0, 10, 0);
    top.castShadow=true;
    top.receiveShadow=true;
    this.rackGroup.add(top);

    let bot = top.clone();
    bot.position.y = -10;
    this.rackGroup.add(bot);

    let side = new THREE.Mesh(
        new THREE.BoxGeometry(4, 20, 20),
        woodMaterial
    );
    side.position.set(-100/2 +2,0,0);
    side.castShadow=true;
    side.receiveShadow=true;
    this.rackGroup.add(side);

    let side2 = side.clone();
    side2.position.x = -side.position.x;
    this.rackGroup.add(side2);

    // this.rotation.y = Math.PI / 2;
    this.rackGroup.position.z=top.geometry.parameters.depth/2;
    this.add(this.rackGroup);
  }
}

export { RackBox };