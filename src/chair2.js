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
    this.tableGroup = new THREE.Group();
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(50, 4, 50),
        new THREE.MeshStandardMaterial({
            color: 0x0000ff
        })
    );
    seat.position.set(0, 40, 0);

    const leg1 = new THREE.Mesh(
        new THREE.BoxGeometry(4, 40, 4),
        new THREE.MeshStandardMaterial({
            color: 0xc3cace
        })
    );
    leg1.position.set(-seat.geometry.parameters.width/2, seat.position.y/2, -seat.geometry.parameters.depth/2);
    const leg1bot = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 1.8),
        new THREE.MeshStandardMaterial({
            color: 0xc3cace
        })
    );
    leg1bot.position.set(-0.9, -0.9, 0);

    // const path = new CustomSinCurve( 20 );
    // const tubeG = new THREE.TubeGeometry( path, 100, 2, 8, false );
    // const tubeM = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    // const tube = new THREE.Mesh( tubeG, tubeM );
    // tube.position.set(0,100,0);
    const radius = 50;
    const arcStart = 0;
    const arcEnd = Math.PI / 2;
    const arcCurve = new THREE.ArcCurve(0, 0, radius, arcStart, arcEnd);
    const tubeG = new THREE.TubeGeometry(arcCurve, 100,20,20, false);
    const tubeM = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const tube = new THREE.Mesh(tubeG, tubeM);
    tube.position.set(0,200,0);
    this.tableGroup.add(tube);

    const leg2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 1.2, 0.2),
        new THREE.MeshStandardMaterial({
            color: 0xc3cace
        })
    );
    leg2.position.set(0.9, -0.4,-0.9);
    const leg2bot = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 1.8),
        new THREE.MeshStandardMaterial({
            color: 0xc3cace
        })
    );
    leg2bot.position.set(0.9, -0.9, 0);

    const legback = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.2, 0.2),
        new THREE.MeshStandardMaterial({
            color: 0xc3cace
        })
    );
    legback.position.set(0, -0.9, 0.8);

    const back = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 0.2),
        new THREE.MeshStandardMaterial({
            color: 0x000000
        })
    );
    back.position.set(0, 1, 0.8);

    this.tableGroup.add(seat,leg1,leg1bot, leg2,leg2bot ,legback, back);
    this.add(this.tableGroup);
    this.rotation.y = Math.PI / 2;
  }
}

export { Chair };