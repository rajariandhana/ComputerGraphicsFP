import * as THREE from 'three';
import { Table } from './table.js';
import { Monitor } from './monitor.js';
import { PC } from './pc.js';

class WorkSpace extends THREE.Mesh {
  constructor() {
    super();

    this.workSpace = new THREE.Group();

    let table = new Table();
    table.position.y = 0;
    this.workSpace.add(table);

    const monitor1 = new Monitor();
    monitor1.position.set(0, 75, -35);
    monitor1.rotation.y = -Math.PI / 2;
    this.workSpace.add(monitor1);

    const pc1 = new PC();
    pc1.position.set(0,0, -85);
    pc1.rotation.y = -Math.PI / 2;     
    this.workSpace.add(pc1);

    const monitor2 = new Monitor();
    monitor2.position.set(0, 75, 35);
    monitor2.rotation.y = -Math.PI / 2;
    this.workSpace.add(monitor2);


    const pc2 = new PC();
    pc2.position.set(0,0, 65);
    pc2.rotation.y = -Math.PI / 2;     
    this.workSpace.add(pc2);

    this.add(this.workSpace);
  }
}

export { WorkSpace };