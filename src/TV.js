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

        //TV divider
        const dividerGeometry = new THREE.BoxGeometry(15, 190, 5); // Adjust dimensions for height and thickness
        const dividerMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // White or light gray color
        const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);

        //Right divider
        const rightDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
        divider.position.set(60, -20, 0); // Position beside the TV, adjust as needed
        this.add(divider);

        // Left divider
        const leftDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
        leftDivider.position.set(-60, -20, 0); // Position on the left side of the TV
        this.add(leftDivider);

        // Shelf 
        const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Wood-like color

        // Shelf Top
        const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(90, 5, 10), shelfMaterial);
        shelfTop.position.set(0, -55, 0); // Position below the TV
        this.add(shelfTop);

        // Shelf Bottom
        const shelfBottom = new THREE.Mesh(new THREE.BoxGeometry(90, 5, 10), shelfMaterial);
        shelfBottom.position.set(0, -85, 0);
        this.add(shelfBottom);

        // Shelf Left Side
        const shelfLeft = new THREE.Mesh(new THREE.BoxGeometry(5, 30, 10), shelfMaterial);
        shelfLeft.position.set(-43, -68, 0);
        this.add(shelfLeft);

        // Shelf Right Side
        const shelfRight = new THREE.Mesh(new THREE.BoxGeometry(5, 30, 10), shelfMaterial);
        shelfRight.position.set(43, -68, 0);
        this.add(shelfRight);
        
    }
    
}
