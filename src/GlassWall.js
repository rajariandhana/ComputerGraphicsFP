import * as THREE from 'three';

class GlassWall extends THREE.Group {
    constructor() {
        super();

        // Constants for the wall
        const wallHeight = 200;
        const wallWidth = 700;
        const frameThickness = 5;
        const glassOpacity = 0.3;

        // Create the main frame material
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x0066cc, // Blue color for frames
            metalness: 0.5,
            roughness: 0.5
        });

        // Create glass material
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xaaaaff,
            transparent: true,
            opacity: glassOpacity,
            metalness: 0.2,
            roughness: 0.1,
            transmission: 0.9
        });

        // Create top and bottom frames
        const horizontalFrame = new THREE.Mesh(
            new THREE.BoxGeometry(wallWidth, frameThickness, frameThickness),
            frameMaterial
        );
        const topFrame = horizontalFrame.clone();
        topFrame.position.y = wallHeight / 2;
        const bottomFrame = horizontalFrame.clone();
        bottomFrame.position.y = -wallHeight / 2;

        // Create vertical frames
        const verticalFrameGeometry = new THREE.BoxGeometry(frameThickness, wallHeight, frameThickness);
        const numSections = 9;
        const sectionWidth = wallWidth / numSections;

        for (let i = 0; i <= numSections; i++) {
            const verticalFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
            verticalFrame.position.x = -wallWidth/2 + i * sectionWidth;
            this.add(verticalFrame);
        }

        // Create glass panels
        const glassGeometry = new THREE.PlaneGeometry(sectionWidth - frameThickness, wallHeight - frameThickness);
        
        for (let i = 0; i < numSections; i++) {
            const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
            glassPanel.position.x = -wallWidth/2 + (i + 0.5) * sectionWidth;
            glassPanel.position.z = frameThickness/2;
            this.add(glassPanel);
        }

        // Add frames to group
        this.add(topFrame);
        this.add(bottomFrame);

        // Set shadow properties for all meshes
        this.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });
    }
}

export { GlassWall };
