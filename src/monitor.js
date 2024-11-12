
import * as THREE from 'three';

class Monitor extends THREE.Group {
  constructor() {
    super();

    // Monitor Stand
    // const standGeometry = new THREE.CylinderGeometry(1.6, 1.6, 30, 30);
    const standGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
    const standMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(0, 0.5, 0);
    stand.castShadow = true;
    stand.receiveShadow = true;
    this.add(stand);

    // Monitor Screen
    const screenGeometry = new THREE.BoxGeometry(30, 20, 3);
    // const screenGeometry = new THREE.BoxGeometry(3, 2, 0.1);
    const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 25, 0);
    screen.castShadow = true;
    screen.receiveShadow = true;
    this.add(screen);

    // Monitor Frame
    const frameGeometry = new THREE.BoxGeometry(27, 16, 3);
    // const frameGeometry = new THREE.BoxGeometry(3.2, 2.2, 0.1);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 25, -0.05);
    frame.castShadow = true;
    frame.receiveShadow = true;
    this.add(frame);
  }
}

export { Monitor };
