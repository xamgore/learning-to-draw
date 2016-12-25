
var Leaf = function() {
    THREE.Group.apply(this, arguments);

 

    var leaf = new THREE.Mesh(
        new THREE.TorusGeometry(.8,1.6,3,4),
        new THREE.MeshStandardMaterial( {
            color: 0x0b8450,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        } )
    );
    //leaf.geometry.vertices[4].y -=1;
    leaf.rotateX(Math.random()*Math.PI*2);
    leaf.rotateZ(Math.random()*Math.PI*2);
    leaf.rotateY(Math.random()*Math.PI*2);
    leaf.receiveShadow = true;
    leaf.castShadow = true;

    this.add(leaf);

}
Leaf.prototype = Object.create(THREE.Group.prototype);
Leaf.prototype.constructor = Leaf;

var ChristmasTree = function() {

    THREE.Group.apply(this, arguments);


    // A material for the pot
    var potMaterial = new THREE.MeshStandardMaterial( {
        color: 0xf97514,
        shading: THREE.FlatShading,
        metalness: 0,
        roughness: 0.8,
        refractionRatio: 0.25
    } );

    // The pot
    var pot = new THREE.Mesh(
        addNoise(new THREE.CylinderGeometry(30, 25, 35, 8, 2), 2),
        potMaterial
    );
    pot.position.y += 17.5;
    pot.castShadow = true;
    pot.receiveShadow = true;
    this.add(pot);
    var potRim = new THREE.Mesh(
        addNoise(new THREE.CylinderGeometry(38, 35, 10, 8, 1), 2),
        potMaterial
    );
    potRim.position.y += 35;
    potRim.castShadow = true;
    potRim.receiveShadow = true;
    this.add(potRim);

    // A tree trunk
    var trunk = new THREE.Mesh(
        addNoise(new THREE.CylinderGeometry(12, 18, 30, 8, 3),2),
        new THREE.MeshStandardMaterial( {
            color: 0x713918,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        } )
    );
    trunk.position.y += 45;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    this.add(trunk);

    // A shape, 
    var crown = new THREE.Shape();
    crown.moveTo(3.43, 96.86);
    crown.bezierCurveTo(2.01, 96.86, 1.38, 95.87, 2.04, 94.63);
    crown.lineTo (9.07, 83.43);
    crown.bezierCurveTo(9.72, 82.2, 11.42, 81.2, 12.84, 81.2);
    crown.lineTo (67.94, 81.2);
    crown.bezierCurveTo(69.37, 81.2 , 70, 80.2, 69.34, 78.97);
    crown.lineTo (41.58, 24.87);
    crown.bezierCurveTo(40.92, 23.64, 40.92, 21.65, 41.58, 20.41);
    crown.lineTo (49.44, 5.66);
    crown.bezierCurveTo(49.44+0.65, 5.66-1.23, 49.44+1.72, 5.66-1.23, 51.82, 5.66);
    crown.lineTo (99.22,94.63);
    crown.bezierCurveTo(99.22+0.65, 94.63+1.23, 99.22+0.02, 94.63+2.23, 97.82, 96.86);

    var extrudeSettings = {
        steps: 1,
        amount: 16,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 5,
        bevelSize: 5,
        bevelSegments: 1
    };

    var treeGroup = new THREE.Group();

    var crownGeometry = new THREE.ExtrudeGeometry( crown, extrudeSettings );
    addNoise(crownGeometry, 2,2,0.5)
    var mesh = new THREE.Mesh( crownGeometry, new THREE.MeshStandardMaterial( {
            color: 0x15a46b,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.5,
            refractionRatio: 1
        } ) ) ;

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    treeGroup.add( mesh );

    for(var x = 0; x < crownGeometry.vertices.length; x++) {
        var leaf = new Leaf();
        leaf.position.copy(crownGeometry.vertices[x]);
        treeGroup.add(leaf);
    }

    treeGroup.position.y += 180;
    treeGroup.position.x -= 60;
    treeGroup.position.z += 10;
    treeGroup.rotateZ(Math.PI);
    treeGroup.rotateY(Math.PI);
    treeGroup.scale.set(1.2,1.2,1.2);

    this.add(treeGroup);

    var decorationPositions = [
        [-35, 55, 17, -0.1, 0],
        [35, 59, 17, -0.1, 0],
        [-5, 74, 17, -0.2, 0.2],
        [18, 123, 18, -0.2, 0.3],
        [43, 100, 15, -0.2, 0.3],
        [-12, 133, 1, 0, 0],

        [-35, 65, -17, 0.1, -0],
        [25, 67, -17, 0.1, -0],
        [-5, 74, -17, 0.2, -0.2],
        [10, 143, -18, 0.2, 0.3],
        [50, 85, -15, 0.2, 0.3],
    ];
    this.decorations = [];
    for (var d = 0; d < decorationPositions.length; d++) {
        var decoration = new Decoration();
        decoration.position.set(decorationPositions[d][0], decorationPositions[d][1], decorationPositions[d][2]);
        decoration.rotateX(decorationPositions[d][3]);
        decoration.rotateZ(decorationPositions[d][4]);
        this.add(decoration);
        this.decorations.push(decoration);
    }

}
ChristmasTree.prototype = Object.create(THREE.Group.prototype);
ChristmasTree.prototype.constructor = ChristmasTree;
ChristmasTree.prototype.updatePosition = function() {
    for(var d = 0; d < this.decorations.length; d++) {
        this.decorations[d].updatePosition();
    }
};

var Star = function() {

    THREE.Group.apply(this, arguments);

    var starShape = new THREE.Shape([
        new THREE.Vector2(0, 50),
        new THREE.Vector2(10, 10),
        new THREE.Vector2(40, 10),
        new THREE.Vector2(20, -10),
        new THREE.Vector2(30, -50),
        new THREE.Vector2(0, -20),
        new THREE.Vector2(-30, -50),
        new THREE.Vector2(-20, -10),
        new THREE.Vector2(-40, 10),
        new THREE.Vector2(-10, 10)
    ]);

    var geometry = new THREE.ExtrudeGeometry(starShape, {
        steps: 1,
        amount: 4,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 10,
        bevelSegments: 1,
        transparent: true,
        opacity: 0.8
    });
    addNoise(geometry, 0, 0, 2);

    var star = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        color: 0xffd423,
        shading: THREE.FlatShading,
        metalness: 0,
        roughness: 0.8,
        refractionRatio: 0.25,
        emissive: 0xffd423,
        emissiveIntensity: 0.8
    }));
    star.scale.set(.3, .3, .3);
    this.add(star);

    // var dLight = new THREE.DirectionalLight( 0xffd423, 1);
    // dLight.position.set( 0, 200, 0);
    // dLight.castShadow = true;
  
    let dLight = new THREE.PointLight( 0xffff00, 0.8);
    dLight.position.set( -35, 0, 0 );
    dLight.distance = 150;
    dLight.castShadow = true;
    this.add( dLight );
  
    dLight = new THREE.PointLight( 0xffff00, 0.8);
    dLight.position.set( 35, 0, 0 );
    dLight.distance = 150;
    dLight.castShadow = true;
    this.add( dLight );
  
    dLight = new THREE.PointLight( 0xffff00, 0.8);
    dLight.position.set( 0, 0, 35 ); 
    dLight.distance = 150;
    dLight.castShadow = true;
    this.add( dLight );
  
    dLight = new THREE.PointLight( 0xffff00, 0.8);
    dLight.position.set( 0, 0, -35 );
    dLight.distance = 150;
    dLight.castShadow = true;
    this.add( dLight );

}
Star.prototype = Object.create(THREE.Group.prototype);
Star.prototype.constructor = Star;
Star.prototype.updatePosition = function() {
//    this.rotateY(0.005);
};

var Decoration = function() {

    // Run the Group constructor with the given arguments
    THREE.Group.apply(this, arguments);

    this.rotationSpeed = Math.random() * 0.01 + 0.003;
    this.rotationPosition = Math.random();

    // A random color assignment
    var colors = ['#ff0051', '#f56762','#a53c6c','#f19fa0','#72bdbf','#47689b'];

    var bauble = new THREE.Mesh(
        addNoise(new THREE.OctahedronGeometry(12,1), 2),
        new THREE.MeshStandardMaterial( {
            color: colors[Math.floor(Math.random()*colors.length)],
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        })
    );
    bauble.castShadow = true;
    bauble.receiveShadow = true;
    bauble.rotateZ(Math.random()*Math.PI*2);
    bauble.rotateY(Math.random()*Math.PI*2);

    this.add(bauble);

    var shapeOne = new THREE.Mesh(
        addNoise(new THREE.CylinderGeometry(4, 6, 10, 6, 1), 0.5),
        new THREE.MeshStandardMaterial( {
            color: 0xf8db08,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        } )
    );
    shapeOne.position.y += 8;
    shapeOne.castShadow = true;
    shapeOne.receiveShadow = true;
    this.add(shapeOne);


    var shapeTwo = new THREE.Mesh(
        addNoise(new THREE.TorusGeometry( 2,1, 6, 4, Math.PI), 0.2),
        new THREE.MeshStandardMaterial( {
            color: 0xf8db08,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25

        } )
    );
    shapeTwo.position.y += 12.5;
    shapeTwo.castShadow = true;
    shapeTwo.receiveShadow = true;
    this.add(shapeTwo);

    var scale = Math.random() * 0.2 + 0.4;
    this.scale.set(scale,scale,scale);
};
Decoration.prototype = Object.create(THREE.Group.prototype);
Decoration.prototype.constructor = Decoration;
Decoration.prototype.updatePosition = function() {
    this.rotationPosition += this.rotationSpeed;
    this.rotation.y = (Math.sin(this.rotationPosition));
};


var Leaf = function() {
    THREE.Group.apply(this, arguments);

    var leaf = new THREE.Mesh(
        new THREE.TorusGeometry(.8,1.6,3,4),
        new THREE.MeshStandardMaterial( {
            color: 0x0b8450,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        } )
    );
    //leaf.geometry.vertices[4].y -=1;
    leaf.rotateX(Math.random()*Math.PI*2);
    leaf.rotateZ(Math.random()*Math.PI*2);
    leaf.rotateY(Math.random()*Math.PI*2);
    leaf.receiveShadow = true;
    leaf.castShadow = true;

    this.add(leaf);

}
Leaf.prototype = Object.create(THREE.Group.prototype);
Leaf.prototype.constructor = Leaf;



var Present = function() {

    THREE.Group.apply(this, arguments);

     // A random color assignment
    var colors = ['#ff0051', '#a53c6c','#f19fa0','#72bdbf','#47689b'],
        boxColor = colors.splice( Math.floor(Math.random()*colors.length), 1 )[0];
        colors.push('#393839'),
        ribbonColor = colors.splice( Math.floor(Math.random()*colors.length), 1 )[0],
        boxMaterial = new THREE.MeshStandardMaterial( {
            color: boxColor,
            shading: THREE.FlatShading,
            metalness: 0,
            roughness: 1
        }),
        ribbonMaterial = new THREE.MeshStandardMaterial( {
            color: ribbonColor,
            shading: THREE.FlatShading,
            metalness: 0,
            roughness: 1
        });

    var box = new THREE.Mesh(
        addNoise(new THREE.BoxGeometry( 20, 12, 15), 2,1, 2),
        boxMaterial
    );
    box.position.y += 6;
    box.castShadow = true;
    box.receiveShadow = true;
    this.add(box);

    box = new THREE.Mesh(
        addNoise(new THREE.BoxGeometry( 22, 14, 2),.5),
        ribbonMaterial
    );
    box.position.y += 6;
    box.castShadow = true;
    box.receiveShadow = true;
    this.add(box);

    box = new THREE.Mesh(
        addNoise(new THREE.BoxGeometry( 2, 14, 17),.5),
        ribbonMaterial
    );
    box.position.y += 6;
    box.castShadow = true;
    box.receiveShadow = true;
    this.add(box);

    var bow = new THREE.Mesh(
        addNoise(new THREE.TorusGeometry(2, 1, 4, 4), 0.5),
        ribbonMaterial
    );
    bow.position.x -= 2;
    bow.position.y += 14;
    bow.rotateZ(-1*Math.PI/1.5);

    bow.castShadow = true;
    bow.receiveShadow = true;
    this.add(bow);

    bow = new THREE.Mesh(
        addNoise(new THREE.TorusGeometry(2, 1, 4, 4), 0.5),
        ribbonMaterial
    );
    bow.position.x += 2;
    bow.rotateZ(Math.PI/1.5);
    bow.position.y += 14;
    bow.castShadow = true;
    bow.receiveShadow = true;
    this.add(bow);

    this.scale.set(2,2,2);

}
Present.prototype = Object.create(THREE.Group.prototype);
Present.prototype.constructor = Present;



var Lamp = function(col, pow = 1.5) {
    THREE.Group.apply(this, arguments);
  
    let figure = new THREE.Mesh(
        //new THREE.TorusGeometry(.8,1.6,3,4),
        new THREE.OctahedronGeometry(1.5,1),
        new THREE.MeshStandardMaterial( {
            color: col,
            shading: THREE.FlatShading,
            metalness: 0,
            roughness: 1,
            refractionRatio: 1,
            transparent: true,
            opacity: 0.8,
            emissive: col,
            emissiveIntensity: 1
        } )
    );
    this.add(figure);
  
    var l = new THREE.PointLight( col, pow );
    l.position.set( 0, 0, 0);
    l.distance = 35.0;
    l.castShadow = true;
    // lamp.shadow.mapSize.width = 1024;
    // lamp.shadow.mapSize.height = 1024; 
    this.add(l);
}
Lamp.prototype = Object.create(THREE.Group.prototype);
Lamp.prototype.constructor = Lamp;



// Create a scene which will hold all our meshes to be rendered
var scene = new THREE.Scene();

// Add a point light that will cast shadows
[
  [-20, 70, 17, 0x00ffff],
  [3,   68, 17, 'yellow'],
  [10,  80, 17, 0x00ff00],
  [20,  65, 17, 0xff00ff],
  [33,  75, 17, 0xdddddd],
  [53,  69, 17, 0x0077ff],
  [27,  105, 17, 0xff0000, 3],
  [42,  87, 17, 0xffff00],
].forEach(([x, y, z, ...col]) => {
    let l = new Lamp(...col);
    l.position.x += x;
    l.position.y += y;
    l.position.z += z;
    scene.add(l)
});

// Create and position a camera
var camera = new THREE.PerspectiveCamera(
    70,                                   // Field of view
    window.innerWidth/window.innerHeight, // Aspect ratio
    0.1,                                  // Near clipping pane
    1000                                  // Far clipping pane
);

// Reposition the camera
camera.position.set(-70,80,210);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0,80,0))

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Size should be the same as the window
renderer.setSize( window.innerWidth, window.innerHeight );

// Set a near white clear color (default is black)
renderer.setClearColor( 0x111 );

// Enable shadow mapping
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Append to the document
document.body.appendChild( renderer.domElement );

// Add an ambient lights
var ambientLight = new THREE.AmbientLight( 0xffffff, 0.1 );
scene.add( ambientLight );


// var fire = new THREE.PointLight( 0xffffff, .11 );
// fire.position.set(-20, 60, 25);
// scene.add( fire );

// A basic material that shows the geometry wireframe.
var shadowMaterial = new THREE.ShadowMaterial( { color: 0xffffff } );
shadowMaterial.opacity = 0.5;
var groundMesh = new THREE.Mesh(
	new THREE.BoxGeometry( 1000, .1, 1000 ),
	shadowMaterial
);
groundMesh.receiveShadow = true;
scene.add( groundMesh );

// Add the tree
var tree = new ChristmasTree();
scene.add(tree);

// A star on top
var star = new Star();
star.position.y += 200;
scene.add(star);

// Loop around the tree, adding presents every 20 to 40 degrees.
for(var angle = 0; angle < 360; angle += Math.random()*20+20) {
    var p = new Present();
    var radius = Math.random() * 40 + 50;
    p.position.x =  Math.cos(angle * Math.PI / 180) * radius;
    p.position.z =  Math.sin(angle * Math.PI / 180) * radius;
    p.scale.set(Math.random() + 1, Math.random() + 1,Math.random() + 1);
    scene.add(p);
}


// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,80,0);
controls.maxPolarAngle = Math.PI / 2;
controls.minDistance = 100;
controls.maxDistance = 220;

requestAnimationFrame(render);

function render() {
    controls.update();

    // Update animated elements
    tree.updatePosition();
    star.updatePosition();

    // Render the scene/camera combnation
    renderer.render(scene, camera);

    // Repeat...
    requestAnimationFrame(render);
}

/**
 * Helper function to add random noise to geometry vertixes
 *
 * @param geometry The geometry to alter
 * @param noiseX Amount of noise on the X axis
 * @param noiseY Amount of noise on the Y axis
 * @param noiseZ Amount of noise on the Z axis
 * @returns the geometry object
 */
function addNoise(geometry, noiseX, noiseY, noiseZ) {

	var noiseX = noiseX || 2;
	var noiseY = noiseY || noiseX;
	var noiseZ = noiseZ || noiseY;

	for(var i = 0; i < geometry.vertices.length; i++){
    	var v = geometry.vertices[i];
    	v.x += -noiseX / 2 + Math.random() * noiseX;
    	v.y += -noiseY / 2 + Math.random() * noiseY;
    	v.z += -noiseZ / 2 + Math.random() * noiseZ;
    }

    return geometry;
}

function addShapeNoise(shapes, noiseX, noiseY) {

	var noiseX = noiseX || 2;
	var noiseY = noiseY || noiseX;

	for(var i = 0; i < shapes.length; i++){
    	var v = shapes[i];
    	v.x += -noiseX / 2 + Math.random() * noiseX;
    	v.y += -noiseY / 2 + Math.random() * noiseY;
        shapes[i] = v;
    }

    return shapes;
}
