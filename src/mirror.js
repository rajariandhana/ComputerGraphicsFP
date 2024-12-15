import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

class Mirror extends THREE.Group {
  constructor(width = 100, height = 70) {
    super();

    // Create mirror frame
    const frameWidth = width + 10;
    const frameHeight = height + 10;
    const frameDepth = 5;
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      roughness: 0.8,
      metalness: 0.2
    });

    // Frame pieces
    const frameGeometries = {
      top: new THREE.BoxGeometry(frameWidth, 5, frameDepth),
      bottom: new THREE.BoxGeometry(frameWidth, 5, frameDepth),
      left: new THREE.BoxGeometry(5, frameHeight, frameDepth),
      right: new THREE.BoxGeometry(5, frameHeight, frameDepth)
    };

    // Create and position frame pieces
    const frames = {
      top: new THREE.Mesh(frameGeometries.top, frameMaterial),
      bottom: new THREE.Mesh(frameGeometries.bottom, frameMaterial),
      left: new THREE.Mesh(frameGeometries.left, frameMaterial),
      right: new THREE.Mesh(frameGeometries.right, frameMaterial)
    };

    frames.top.position.y = height/2 + 2.5;
    frames.bottom.position.y = -height/2 - 2.5;
    frames.left.position.x = -width/2 - 2.5;
    frames.right.position.x = width/2 + 2.5;

    // Reflective mirror surface using Reflector
    const mirrorGeometry = new THREE.PlaneGeometry(width, height);
    const mirrorSurface = new Reflector(mirrorGeometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: new THREE.Color(0x777777),
      recursion: 1,
      multisample: 4
    });
    mirrorSurface.position.z = -frameDepth/2 + 0.1;

    // Add all pieces to the group
    this.add(frames.top);
    this.add(frames.bottom);
    this.add(frames.left);
    this.add(frames.right);
    this.add(mirrorSurface);

    // Optional: Add backing
    const backGeometry = new THREE.PlaneGeometry(frameWidth, frameHeight);
    const backMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const backing = new THREE.Mesh(backGeometry, backMaterial);
    backing.position.z = -frameDepth;
    this.add(backing);

    // Set castShadow and receiveShadow for all components
    this.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }
}

export { Mirror };