// table.js
import * as THREE from 'three';
import { Chair } from './chair.js';

class Table extends THREE.Mesh {
  constructor() {
    super();
    this.tableGroup = new THREE.Group();

    const woodTexture = new THREE.TextureLoader().load('/textures/wood.jpg');
    const woodMaterial = new THREE.MeshStandardMaterial({
        map:woodTexture
    })
    let top = new THREE.Mesh(
        new THREE.BoxGeometry(180, 5, 50),
        woodMaterial
    );
    top.position.set(0, 70, 0);
    top.castShadow=true;
    top.receiveShadow=true;

    let leftLeg = new THREE.Mesh(
        new THREE.BoxGeometry(5,70,50),
        woodMaterial
    );
    leftLeg.position.set(-top.geometry.parameters.width/2 + top.geometry.parameters.height/2, top.position.y/2,0);
    leftLeg.castShadow=true;
    leftLeg.receiveShadow=true;

    let rightLeg = leftLeg.clone();
    rightLeg.scale.x = -1;
    rightLeg.position.x = -leftLeg.position.x;

    let chair1 = new Chair();
    chair1.position.set(top.geometry.parameters.width/4-10, 0, 25);
    chair1.rotation.y = 90*Math.PI;

    let chair2 = chair1.clone();
    chair2.scale.x = -1;
    chair2.position.x = -chair1.position.x;

    this.tableGroup.add(top, leftLeg, rightLeg, chair1, chair2);
    this.add(this.tableGroup);
    this.rotation.y = Math.PI / 2;
  }
}

export { Table };