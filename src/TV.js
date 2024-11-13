// TV.js
import * as THREE from 'three';

export class TV extends THREE.Group {
    constructor() {
        super();

        // TV screen geometry and material (Reduced height for a smaller TV height)
        const screenGeometry = new THREE.BoxGeometry(150, 70, 5); // Reduced height for a shorter screen
        const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black screen
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.castShadow = true;
        this.add(screen);

        // TV border (Adjusted to match new screen height)
        const borderGeometry = new THREE.BoxGeometry(155, 75, 6); // Slightly larger than screen
        const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Dark gray for border
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.z = -2; // Slightly behind the screen
        this.add(border);

        // TV legs (Position adjusted for bigger TV)
        const legGeometry = new THREE.BoxGeometry(10, 10, 1);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-45, -40, -3); // Adjusted positioning for larger screen
        this.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(45, -40, -3); // Adjusted positioning for larger screen
        this.add(rightLeg);

        // Left and Right Dividers
        const dividerGeometry = new THREE.BoxGeometry(15, 190, 5);
        const dividerMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        
        const rightDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
        rightDivider.position.set(85, -20, 0); // Positioned to the side of the larger TV
        this.add(rightDivider);

        const leftDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
        leftDivider.position.set(-85, -20, 0); // Positioned to the other side of the larger TV
        this.add(leftDivider);

        // Shelf below the TV (Adjust dimensions and positions if needed)
        const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Wood-like color

        // Shelf Top
        const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(140, 5, 10), shelfMaterial);
        shelfTop.position.set(0, -50, 0); // Position below the larger TV
        this.add(shelfTop);

        // Shelf Bottom
        const shelfBottom = new THREE.Mesh(new THREE.BoxGeometry(140, 5, 10), shelfMaterial);
        shelfBottom.position.set(0, -80, 0);
        this.add(shelfBottom);

        // Shelf Left Side
        const shelfLeft = new THREE.Mesh(new THREE.BoxGeometry(5, 30, 10), shelfMaterial);
        shelfLeft.position.set(-67, -65, 0);
        this.add(shelfLeft);

        // Shelf Right Side
        const shelfRight = new THREE.Mesh(new THREE.BoxGeometry(5, 30, 10), shelfMaterial);
        shelfRight.position.set(67, -65, 0);
        this.add(shelfRight);
    }
}
