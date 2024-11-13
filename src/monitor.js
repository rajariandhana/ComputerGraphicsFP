
import * as THREE from 'three';

class Monitor extends THREE.Group {
  constructor() {
    super();

    // Monitor Stand
    const standGeometry = new THREE.CylinderGeometry(1, 1, 10, 30);
    // const standGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
    const standMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(0, 3.5, 0);
    stand.castShadow = true;
    stand.receiveShadow = true;
    this.add(stand);

    //Monitor Leg
    const legGeometry = new THREE.BoxGeometry(30, 1.6, 6.4);
    const legMaterial = new THREE.MeshStandardMaterial({color: 0x00000});
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(0, -2, 0);
    leg.castShadow = true;
    leg.receiveShadow = true;
    this.add(leg);


    // Monitor Screen
    const screenGeometry = new THREE.BoxGeometry(43.4, 16, 1.7); 
    const screenTexture = new THREE.TextureLoader().load('/textures/WindowsWallpaper.jpg');
    const screenMaterial = new THREE.MeshStandardMaterial({ map: screenTexture });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 17, -0.40);
    screen.castShadow = true;
    screen.receiveShadow = true;
    this.add(screen);

    // Monitor Frame
    const frameGeometry = new THREE.BoxGeometry(46, 20, 1.7);
    // const frameGeometry = new THREE.BoxGeometry(3.2, 2.2, 0.1);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 17, -0.05);
    frame.castShadow = true;
    frame.receiveShadow = true;
    this.add(frame);

    //Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(30, 1.2, 10);
    const keyboardTexture = new THREE.TextureLoader().load('/textures/Keyboard.png'); 
    const keyboardMaterial = new THREE.MeshStandardMaterial({ map: keyboardTexture });
    
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, -2, -15);
    keyboard.rotation.y = Math.PI;
    keyboard.castShadow = true;
    keyboard.receiveShadow = true;
    this.add(keyboard);

  }
}

export { Monitor };
