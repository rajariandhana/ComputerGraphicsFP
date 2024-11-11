// table.js
import * as THREE from 'three';
import { Chair } from './chair.js';

class Table extends THREE.Mesh {
  constructor() {
    super();
    this.tableGroup = new THREE.Group();

    let top = new THREE.Mesh(
        new THREE.BoxGeometry(180, 5, 50),
        new THREE.MeshStandardMaterial({
            color: 0xf6d7af
        })
    );
    top.position.set(0, 70, 0);

    let leftLeg = new THREE.Mesh(
        new THREE.BoxGeometry(5,70,50),
        new THREE.MeshStandardMaterial({
            color: 0xf6d7af
        })
    );
    leftLeg.position.set(-top.geometry.parameters.width/2 + top.geometry.parameters.height/2, top.position.y/2,0);

    let rightLeg = new THREE.Mesh(
        new THREE.BoxGeometry(5,70,50),
        new THREE.MeshStandardMaterial({
            color: 0xf6d7af
        })
    );
    rightLeg.position.set(top.geometry.parameters.width/2 - top.geometry.parameters.height/2, top.position.y/2,0);

    // const chair = new Chair();
    // chair.position.set(0, 0, 1.5);
    // chair.rotation.y = 90*Math.PI;

    this.tableGroup.add(top, leftLeg, rightLeg);
    this.add(this.tableGroup);
    this.rotation.y = Math.PI / 2;
  }
}

export { Table };