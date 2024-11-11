// table.js
import * as THREE from 'three';
import { Chair } from './chair.js';

class Table extends THREE.Mesh {
  constructor() {
    super();
    this.tableGroup = new THREE.Group();

    const top = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.2, 3),
        new THREE.MeshStandardMaterial({
            color: 0xf6d7af
        })
    );
    top.position.set(0, 1, 0);

    const leftLeg = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 2, 3),
        new THREE.MeshStandardMaterial({
            color: 0xf6d7af
        })
    );
    leftLeg.position.set(-2.4, 0,0);

    const rightLeg = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 2, 3),
        new THREE.MeshStandardMaterial({
            color: 0xf6d7af
        })
    );
    rightLeg.position.set(2.4, 0,0);

    const chair = new Chair();
    chair.position.set(0, 0, 1.5);
    chair.rotation.y = 90*Math.PI;

    this.tableGroup.add(top, leftLeg, rightLeg,chair);
    this.add(this.tableGroup);
    this.rotation.y = Math.PI / 2;
  }
}

export { Table };