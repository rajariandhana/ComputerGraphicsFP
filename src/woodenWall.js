import * as THREE from 'three';

class WoodenWall extends THREE.Mesh {
  constructor() {
    super();
    this.wallGroup = new THREE.Group();

    const woodTexture = new THREE.TextureLoader().load('/textures/wood2.jpeg');
    const woodMaterial = new THREE.MeshStandardMaterial({
        map:woodTexture
    })
    let wall = new THREE.Mesh(
        new THREE.BoxGeometry(120, 200, 5),
        woodMaterial
    );
    wall.position.set(0, 100, 2.5);
    wall.castShadow=true;
    wall.receiveShadow=true;

    this.wallGroup.add(wall);
    this.add(this.wallGroup);
  }
}

export { WoodenWall };