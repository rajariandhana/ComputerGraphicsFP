// table.js
import * as THREE from 'three';
import { Chair } from './chair2.js';

class Table extends THREE.Mesh {
  constructor() {
    super();
    this.tableGroup = new THREE.Group();

    const top = new THREE.Mesh(
        new THREE.BoxGeometry(140, 3.5, 60),
        new THREE.MeshStandardMaterial({
            color: 0xf6d7af
        })
    );
    top.position.set(0, 70, 0);

    const leftLeg = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, top.position.y, 60),
        new THREE.MeshStandardMaterial({
            color: 0xf6d7af
        })
    );
    leftLeg.position.set(-top.geometry.parameters.width/2 + top.geometry.parameters.height/2, top.position.y/2,0);

    const rightLeg = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, top.position.y, 60),
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