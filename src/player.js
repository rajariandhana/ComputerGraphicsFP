import * as THREE from 'three';

export class Player extends THREE.Mesh{
    constructor(){
        super();
        this.geometry = new THREE.CapsuleGeometry(0.25,0.5);
        this.material = new THREE.MeshStandardMaterial({
            color:0x0000ff
        });
        this.position.set(5,0.5,5);
    }
}