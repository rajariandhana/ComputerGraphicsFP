import * as THREE from 'three';

class RackFlat extends THREE.Mesh {
  constructor() {
    super();
    this.rackGroup = new THREE.Group();

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
    this.rotation.y = Math.PI / 2;
    this.add(this.rackGroup);
  }
}

export { RackFlat };