// table.js
import * as THREE from 'three';

class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

class Chair extends THREE.Mesh {
  constructor() {
    super();
    this.chairGroup = new THREE.Group();

    const fabricTexture = new THREE.TextureLoader().load('/textures/blueFabric.jpeg');

    let seat = new THREE.Mesh(
        new THREE.BoxGeometry(46, 7, 48),
        new THREE.MeshStandardMaterial({
            // color: 0x0000ff
            map:fabricTexture
        })
    );
    seat.position.set(0, 46, 0);
    seat.castShadow=true;
    seat.receiveShadow=true;
    this.chairGroup.add(seat);

    const metalTexture = new THREE.TextureLoader().load('/textures/metal.jpeg');
    let metalMaterial = new THREE.MeshStandardMaterial({
        // color: 0xc3cace,
        map:metalTexture
        // metalness:1.0,
        // roughness:0.05,
        // envMap: cubeRenderTarget.texture
    });

    let besiAlasSamping = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 50),
        metalMaterial
    );
    besiAlasSamping.position.set(-seat.geometry.parameters.width/2, 0, 0);
    besiAlasSamping.castShadow = true;
    besiAlasSamping.receiveShadow = true;

    let besiBerdiri = new THREE.Mesh(
        new THREE.BoxGeometry(3, 66, 3),
        metalMaterial
    );
    besiBerdiri.position.set(-seat.geometry.parameters.width/2,besiBerdiri.geometry.parameters.height/2,-seat.geometry.parameters.width/2);
    besiBerdiri.castShadow = true;
    besiBerdiri.receiveShadow = true;

    let armRest = new THREE.Mesh(
        new THREE.BoxGeometry(3,3,42),
        metalMaterial
    );
    armRest.position.set(-seat.geometry.parameters.width/2,besiBerdiri.geometry.parameters.height,0);
    armRest.castShadow = true;
    armRest.receiveShadow = true;

    let besiAlasBelakang = new THREE.Mesh(
        new THREE.BoxGeometry(50, 3, 3),
        metalMaterial
    );
    besiAlasBelakang.position.set(0,0,seat.geometry.parameters.width/2);
    besiAlasBelakang.castShadow = true;
    besiAlasBelakang.receiveShadow = true;

    let senderan = new THREE.Mesh(
        new THREE.BoxGeometry(50, 25, 2),
        new THREE.MeshStandardMaterial({
            color: 0x000000
        })
    );
    senderan.position.set(0,armRest.position.y,seat.geometry.parameters.width/2);
    senderan.castShadow = true;
    senderan.receiveShadow = true;

    this.leftGroup = new THREE.Group();
    this.leftGroup.add(besiAlasSamping,besiBerdiri,armRest);
    this.rightGroup = this.leftGroup.clone();
    this.rightGroup.scale.x = -1;
    this.rightGroup.position.x = -this.leftGroup.position.x;
    
    this.chairGroup.add(this.leftGroup,this.rightGroup,besiAlasBelakang,senderan);

    // this.chairGroup.add(besiAlasSamping,armRest,besiAlasBelakang);


    // const path = new CustomSinCurve( 20 );
    // const tubeG = new THREE.TubeGeometry( path, 100, 2, 8, false );
    // const tubeM = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    // const tube = new THREE.Mesh( tubeG, tubeM );
    // tube.position.set(0,100,0);
    // const radius = 50;
    // const arcStart = 0;
    // const arcEnd = Math.PI / 2;
    // const arcCurve = new THREE.ArcCurve(0, 0, radius, arcStart, arcEnd);
    // const tubeG = new THREE.TubeGeometry(arcCurve, 100,20,20, false);
    // const tubeM = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const tube = new THREE.Mesh(tubeG, tubeM);
    // tube.position.set(0,200,0);
    // this.chairGroup.add(tube);


    // this.tableGroup.add(seat,leg1,leg1bot, leg2,leg2bot ,legback, back);
    this.add(this.chairGroup);
    this.rotation.y = Math.PI / 2;
  }
}

export { Chair };