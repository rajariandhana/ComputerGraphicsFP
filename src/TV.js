// TV.js
import * as THREE from 'three';

export class TV extends THREE.Group {
    constructor() {
        super();

        // TV screen geometry and material
        const screenGeometry = new THREE.BoxGeometry(100, 60, 5); // Adjust dimensions as needed
        const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black screen
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.castShadow = true;
        this.add(screen);

        // TV border
        const borderGeometry = new THREE.BoxGeometry(105, 65, 6);
        const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Dark gray for border
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.z = -2; // Slightly behind the screen
        this.add(border);

        // TV legs
        const legGeometry = new THREE.BoxGeometry(10, 10, 1);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-30, -35, -3); // Positioning leg
        this.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(30, -35, -3); // Positioning leg
        this.add(rightLeg);
    }
}
