import * as THREE from 'three';
import { Chair } from './chair.js';

class ConferenceTable extends THREE.Group {
    constructor() {
        super();

        // Load wood texture for the tabletop and legs
        const textureLoader = new THREE.TextureLoader();
        const woodTexture = textureLoader.load('textures/wood.jpg'); 

        // Tabletop geometry and material with wood texture
        const tabletopGeometry = new THREE.BoxGeometry(300, 5, 160); 
        const tabletopMaterial = new THREE.MeshStandardMaterial({ map: woodTexture }); 
        const tabletop = new THREE.Mesh(tabletopGeometry, tabletopMaterial);
        tabletop.position.y = 65; 
        tabletop.castShadow = true;
        tabletop.receiveShadow = true;
        this.add(tabletop);

        // Table legs geometry and material with wood texture
        const legGeometry = new THREE.BoxGeometry(5, 65, 5); 
        const legMaterial = new THREE.MeshStandardMaterial({ map: woodTexture }); 

        const legPositions = [
            { x: -145, z: 70 },  // Front-left leg at the edge
            { x: 145, z: 70 },   // Front-right leg at the edge
            { x: -145, z: -70 }, // Back-left leg at the edge
            { x: 145, z: -70 }   // Back-right leg at the edge
        ];

        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos.x, 32.5, pos.z); 
            leg.castShadow = true;
            this.add(leg);
        });

        // rotate table
        this.rotation.y = Math.PI / 2;

        this.addChairs();
    }

    addChairs() {
        const chairYPosition = 0;

        for (let i = -1; i <= 1; i++) {
            // Left side chairs (positive x, facing the table)
            const leftChair = new Chair();
            leftChair.position.set(i * 100, chairYPosition, -110);
            leftChair.rotation.y = Math.PI;
            this.add(leftChair);

            // Right side chairs (negative x, facing the table)
            const rightChair = new Chair();
            rightChair.position.set(i * 100, chairYPosition, 110);
            rightChair.rotation.y = 0;
            this.add(rightChair);
        }

        // Adjusted position for chairs along the shorter side (width)
        const widthOffset = 10; // Adjust this value to move the chairs back further

        // Front side chair (left-facing) - moved back
        const frontChair1 = new Chair();
        frontChair1.position.set(-180, chairYPosition, -40 - widthOffset);
        frontChair1.rotation.y = -Math.PI / 2;
        this.add(frontChair1);

        const frontChair2 = new Chair();
        frontChair2.position.set(-180, chairYPosition, 40 - widthOffset);
        frontChair2.rotation.y = -Math.PI / 2;
        this.add(frontChair2);

        // Back side chair (right-facing) - moved back
        const backChair1 = new Chair();
        backChair1.position.set(180, chairYPosition, -40 + widthOffset);
        backChair1.rotation.y = Math.PI / 2;
        this.add(backChair1);

        const backChair2 = new Chair();
        backChair2.position.set(180, chairYPosition, 40 + widthOffset);
        backChair2.rotation.y = Math.PI / 2;
        this.add(backChair2);
    }
}

export { ConferenceTable };
