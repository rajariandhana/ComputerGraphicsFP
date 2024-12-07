import * as THREE from 'three';
import { RackBox } from './rackBox.js';

class WoodenWall extends THREE.Mesh {
  constructor() {
    super();
    this.wallGroup = new THREE.Group();

    const woodTexture = new THREE.TextureLoader().load('/textures/wood2.jpeg');
    const woodMaterial = new THREE.MeshStandardMaterial({
        map:woodTexture
    })
    let wall = new THREE.Mesh(
        new THREE.BoxGeometry(70, 200, 5),
        woodMaterial
    );
    wall.position.set(0, 100, 2.5);
    wall.castShadow=true;
    wall.receiveShadow=true;
    this.wallGroup.add(wall);


    const rackBox1 = new RackBox();
    rackBox1.position.set(0, 140, 6);
    this.wallGroup.add(rackBox1);

    const rackBox2 = new RackBox();
    rackBox2.position.set(0, 70, 6);
    this.wallGroup.add(rackBox2);

    this.add(this.wallGroup);
  }
}

export { WoodenWall };