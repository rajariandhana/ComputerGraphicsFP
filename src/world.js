import * as THREE from 'three';

export class World extends THREE.Mesh{
    #objectMap = new Map();
    constructor(width, height){
        super();

        this.width = width;
        this.height = height;
        this.treeCount = 10;
        this.rockCount = 20;
        this.bushCount = 15;

        this.trees = new THREE.Group();
        this.add(this.trees);
        this.rocks = new THREE.Group();
        this.add(this.rocks);
        this.bushes = new THREE.Group();
        this.add(this.bushes);
        this.generate();
    }
    generate(){
        this.clear();
        this.createTerrain();
        this.createTrees();
        this.createRocks();
        this.createBushes();
        // console.log(this.#objectMap);
    }
    clear(){
        if(this.terrain){
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }
        if(this.trees){
            this.trees.children.forEach((tree)=>{
                tree.geometry?.dispose();
                tree.material?.dispose();
            });
            this.trees.clear();
        }
        if(this.rocks){
            this.rocks.children.forEach((rock)=>{
                rock.geometry?.dispose();
                rock.material?.dispose();
            });
            this.rocks.clear();
        }
        if(this.bushes){
            this.bushes.children.forEach((bush)=>{
                bush.geometry?.dispose();
                bush.material?.dispose();
            });
            this.bushes.clear();
        }
        this.#objectMap.clear();
    }
    createTerrain(){
        const terrainMaterial = new THREE.MeshStandardMaterial({
            color:0x77bb41,
            // wireframe:true
        });
        const terrainGeometry = new THREE.PlaneGeometry(this.width,this.height,this.width,this.height);
        this.terrain = new THREE.Mesh(terrainGeometry,terrainMaterial);
        this.terrain.rotation.x = -Math.PI/2;
        this.terrain.position.set(this.width/2,0,this.height/2);
        this.add(this.terrain);
    }
    createTrees(){
        const treeRadius = 0.2;
        const treeHeight = 1;
        
        this.add(this.trees);
        for(let i=0; i<this.treeCount; i++){
            const coords = new THREE.Vector2(
                Math.floor(this.width*Math.random()),
                Math.floor(this.height*Math.random())
            );
            if(this.#objectMap.has(`$${coords.x}-${coords.y}`)) {i--;continue};
            const treeGeometry = new THREE.ConeGeometry(treeRadius,treeHeight,8);
            const treeMaterial = new THREE.MeshStandardMaterial({
                color:0x30510,
                flatShading:true
            });
            const treeMesh = new THREE.Mesh(treeGeometry,treeMaterial);
            
            treeMesh.rotateOnAxis.x = Math.PI/2;
            treeMesh.position.set(
                coords.x ,
                treeHeight/2,
                coords.y
            );
            this.trees.add(treeMesh);
            this.#objectMap.set(`${coords.x}-${coords.y}`,treeMesh);
        }
    }
    createRocks(){
        const minRockRadius = 0.1;
        const MaxRockRadius = 0.3;
        const minRockHeight = 0.5;
        const MaxRockHeight = 0.8;
        const rockMaterial = new THREE.MeshStandardMaterial({
            color:0xb0b0b0,
            flatShading:true
        });
        
        this.rocks = new THREE.Group();
        this.add(this.rocks);
        for(let i=0; i<this.rockCount; i++){
            const coords = new THREE.Vector2(
                Math.floor(this.width*Math.random()),
                Math.floor(this.height*Math.random())
            );
            if(this.#objectMap.has(`$${coords.x}-${coords.y}`)) {i--; continue};

            const radius = minRockRadius+(Math.random() * (MaxRockRadius-minRockRadius));
            const height = minRockHeight+(Math.random() * (MaxRockHeight-minRockHeight));
            const rockGeometry = new THREE.SphereGeometry(radius,6,5);
            const rockMesh = new THREE.Mesh(rockGeometry,rockMaterial);
            rockMesh.position.set(
                coords.x,
                0,
                coords.y
            );
            rockMesh.scale.y = height;
            this.rocks.add(rockMesh);
            this.#objectMap.set(`${coords.x}-${coords.y}`,rockMesh);
        }
    }
    createBushes(){
        const minBushRadius = 0.1;
        const MaxBushRadius = 0.3;
        const minBushHeight = 0.5;
        const MaxBushHeight = 0.8;
        const bushMaterial = new THREE.MeshStandardMaterial({
            color:0x80a040,
            flatShading:true
        });
        
        this.bushes = new THREE.Group();
        this.add(this.bushes);
        for(let i=0; i<this.bushCount; i++){
            const coords = new THREE.Vector2(
                Math.floor(this.width*Math.random()),
                Math.floor(this.height*Math.random())
            );
            if(this.#objectMap.has(`$${coords.x}-${coords.y}`)) {i--; continue};

            const radius = minBushRadius+(Math.random() * (MaxBushRadius-minBushRadius));
            // const height = minBushHeight+(Math.random() * (MaxBushHeight-minBushHeight));
            const bushGeometry = new THREE.SphereGeometry(radius,8,8);
            const bushMesh = new THREE.Mesh(bushGeometry,bushMaterial);

            bushMesh.position.set(
                coords.x ,
                radius,
                coords.y
            );
            // bushMesh.scale.y = height;
            this.bushes.add(bushMesh);
            this.#objectMap.set(`${coords.x}-${coords.y}`,bushMesh);
            
        }
    }
}