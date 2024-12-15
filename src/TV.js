// TV.js
import * as THREE from 'three';

export class TV extends THREE.Group {
    constructor() {
        super();

        // Create video element and texture
        this.video = document.createElement('video');
        this.video.src = 'path/to/your/video.mp4'; // Replace with your video path
        this.video.loop = true;
        this.videoTexture = new THREE.VideoTexture(this.video);
        this.videoTexture.minFilter = THREE.LinearFilter;
        this.videoTexture.magFilter = THREE.LinearFilter;
        
        // TV screen with video material
        const screenGeometry = new THREE.BoxGeometry(150, 70, 5);
        this.screenMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x000000,
            emissive: 0x000000,
            emissiveMap: this.videoTexture,
            emissiveIntensity: 1
        });
        const screen = new THREE.Mesh(screenGeometry, this.screenMaterial);
        screen.castShadow = true;
        this.add(screen);

        // Store reference to screen for later use
        this.screen = screen;
        this.isOn = false;

        // TV border
        const borderGeometry = new THREE.BoxGeometry(155, 75, 6);
        const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.z = -2;
        this.add(border);

        // TV legs
        const legGeometry = new THREE.BoxGeometry(10, 10, 1);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-45, -40, -3);
        this.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(45, -40, -3);
        this.add(rightLeg);

        // Left and Right Dividers
        const dividerGeometry = new THREE.BoxGeometry(15, 190, 5);
        const dividerMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        
        const rightDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
        rightDivider.position.set(85, -20, 0);
        this.add(rightDivider);

        const leftDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
        leftDivider.position.set(-85, -20, 0);
        this.add(leftDivider);

        // Shelf components
        const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

        const shelfTop = new THREE.Mesh(new THREE.BoxGeometry(140, 5, 10), shelfMaterial);
        shelfTop.position.set(0, -50, 0);
        this.add(shelfTop);

        const shelfBottom = new THREE.Mesh(new THREE.BoxGeometry(140, 5, 10), shelfMaterial);
        shelfBottom.position.set(0, -80, 0);
        this.add(shelfBottom);

        const shelfLeft = new THREE.Mesh(new THREE.BoxGeometry(5, 30, 10), shelfMaterial);
        shelfLeft.position.set(-67, -65, 0);
        this.add(shelfLeft);

        const shelfRight = new THREE.Mesh(new THREE.BoxGeometry(5, 30, 10), shelfMaterial);
        shelfRight.position.set(67, -65, 0);
        this.add(shelfRight);
    }

    onClick() {
        if (!this.isOn) {
            this.turnOn();
        } else {
            this.turnOff();
        }
    }

    turnOn() {
        if (!this.isOn) {
            this.video.play();
            this.screenMaterial.emissiveIntensity = 1;
            this.isOn = true;
        }
    }

    turnOff() {
        if (this.isOn) {
            this.video.pause();
            this.video.currentTime = 0;
            this.screenMaterial.emissiveIntensity = 0;
            this.isOn = false;
        }
    }

    update() {
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.videoTexture.needsUpdate = true;
        }
    }
}