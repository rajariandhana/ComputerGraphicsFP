// Whiteboard.js
import * as THREE from 'three';

export class Whiteboard extends THREE.Group {
    constructor() {
        super();

        // Whiteboard panel geometry and material
        const boardGeometry = new THREE.BoxGeometry(150, 60, 1); // Increased width for a longer whiteboard
        const boardMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            opacity: 0.5,
            transparent: true,
        });
        const board = new THREE.Mesh(boardGeometry, boardMaterial);
        board.castShadow = true;
        board.receiveShadow = true;
        this.add(board);

        // Bolts at each corner
        const boltGeometry = new THREE.CylinderGeometry(1, 1, 1, 32);
        const boltMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

        const boltPositions = [
            { x: -72, y: 27, z: 1 },  // Top-left corner
            { x: 72, y: 27, z: 1 },   // Top-right corner
            { x: -72, y: -27, z: 1 }, // Bottom-left corner
            { x: 72, y: -27, z: 1 },  // Bottom-right corner
        ];

        boltPositions.forEach(pos => {
            const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
            bolt.position.set(pos.x, pos.y, pos.z);
            bolt.rotation.x = Math.PI / 2; // Rotate to make it face forward
            this.add(bolt);
        });
    }
}
