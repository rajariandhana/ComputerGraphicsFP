
import * as THREE from 'three';

export class TV extends THREE.Group {
    constructor() {
        super();


        const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black screen
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.castShadow = true;
        this.add(screen);


        const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Dark gray for border
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.z = -2; // Slightly behind the screen
        this.add(border);


        const legGeometry = new THREE.BoxGeometry(10, 10, 1);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);

        this.add(shelfBottom);

        // Shelf Left Side
        const shelfLeft = new THREE.Mesh(new THREE.BoxGeometry(5, 30, 10), shelfMaterial);

        this.add(shelfLeft);

        // Shelf Right Side
        const shelfRight = new THREE.Mesh(new THREE.BoxGeometry(5, 30, 10), shelfMaterial);
