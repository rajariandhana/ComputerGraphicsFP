
import * as THREE from 'three';

class PC extends THREE.Group {
  constructor() {
    super();

    // PC Case
    const caseGeometry = new THREE.BoxGeometry(17, 45, 30);
    const caseMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
    pcCase.position.set(10, 23, 0);
    pcCase.castShadow = true;
    pcCase.receiveShadow = true;
    this.add(pcCase);

    // Front Panel (optional detail for the PC case)
    const panelGeometry = new THREE.BoxGeometry(15.5, 43, 1);
    const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const frontPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    frontPanel.position.set(10, 22.5, -14.9);
    frontPanel.castShadow = true;
    frontPanel.receiveShadow = true;
    this.add(frontPanel);
  }
}

export { PC };
