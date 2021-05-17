import * as THREE from '../js/three.module.js';


/////////

let materialBlack = new THREE.MeshStandardMaterial({
    color: 0x666666,
    metalness: 0.95,
    roughness: 0.01,
    emissive: 0x222222,
});

const materialWhite = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.95,
    roughness: .01,
    emissive: 0xeeeeee,
});

let materialBlackBoard = new THREE.MeshStandardMaterial({
    color: 0x677a7c,
    metalness: 1.0,
    roughness: 1.0,
    emissive: 0x677a7c
});

const materialWhiteBoard = new THREE.MeshStandardMaterial({
    color: 0x939393,
    metalness: 1.0,
    roughness: 1.0,
    emissive: 0x939393,
});


//TODO this should be a paramter
const generalPawnBase = 0.004;
const generalPawnTop = 0.015;
const generalSphere = 0.01;
const radialSegments = 32;


function isWhite(options){
    return options.material === 'white';
}

function buildCube(options) {
    const material = isWhite(options) ? materialWhiteBoard : materialBlackBoard;
    const cubeGeometry = new THREE.BoxGeometry(options.width, options.height, options.depth);
    return new THREE.Mesh(cubeGeometry, material);
}


function buildPawn(options) {
    const material = isWhite(options) ? materialWhite : materialBlack;

    const pawnGeometry = new THREE.CylinderGeometry(generalPawnBase, generalPawnTop, options.height, radialSegments);
    const pawn = new THREE.Mesh(pawnGeometry, material);

    const geometrySphere = new THREE.SphereGeometry(generalSphere, radialSegments, radialSegments);
    const sphere = new THREE.Mesh(geometrySphere, material);
    sphere.position.y = pawn.position.y + options.height / 2
    pawn.add(sphere);

    return pawn;
}

function buildKing(options) {
   const material = isWhite(options) ? materialWhite : materialBlack;

    const kingGeometry = new THREE.CylinderGeometry(generalPawnBase, generalPawnTop, options.height, radialSegments);
    const king = new THREE.Mesh(kingGeometry, material);

    const geometryCylinder1 = new THREE.CylinderGeometry(.016, .016, .0016, radialSegments);
    const cylinder1 = new THREE.Mesh(geometryCylinder1, material);
    cylinder1.position.y = king.position.z + options.height / 3
    king.add(cylinder1);

    const geometryCylinder2 = new THREE.CylinderGeometry(.020, .020, .0016, radialSegments); //TODO
    const cylinder2 = new THREE.Mesh(geometryCylinder2, material);
    cylinder2.position.y = king.position.z + options.height / 4
    king.add(cylinder2);

    const geometryCylinder3 = new THREE.CylinderGeometry(0.024, .024, .0016, radialSegments); //TODO
    const cylinder3 = new THREE.Mesh(geometryCylinder3, material);
    cylinder3.position.y = king.position.z + options.height / 6
    king.add(cylinder3);

    const geometrySphere = new THREE.SphereGeometry(generalSphere, radialSegments, radialSegments);
    const sphere = new THREE.Mesh(geometrySphere, material);
    sphere.position.y = king.position.z + options.height / 2
    king.add(sphere);

    const geometryCube1 = new THREE.BoxGeometry(.018, .01, .004);//TODO
    const cube1 = new THREE.Mesh(geometryCube1, material);
    cube1.position.y = king.position.z + options.height / 1.8
    king.add(cube1);

    const geometryCube2 = new THREE.BoxGeometry(.004, .01, .018);//TODO
    const cube2 = new THREE.Mesh(geometryCube2, material);
    cube2.position.y = king.position.z + options.height / 1.8
    king.add(cube2);
    return king;
}

function buildQueen(options) {
   const material = isWhite(options) ? materialWhite : materialBlack;

    const queenGeometry = new THREE.CylinderGeometry(generalPawnBase, generalPawnTop, options.height, radialSegments);
    const queen = new THREE.Mesh(queenGeometry, material);

    const geometryCylinder1 = new THREE.CylinderGeometry(.020, .020, .0016, radialSegments); //TODO
    const cylinder1 = new THREE.Mesh(geometryCylinder1, material);
    cylinder1.position.y = queen.position.z + options.height / 4
    queen.add(cylinder1);

    const geometryCylinder2 = new THREE.CylinderGeometry(0.006, 0.006, .006, radialSegments); //TODO
    const cylinder2 = new THREE.Mesh(geometryCylinder2, material);
    cylinder2.position.y = queen.position.z + options.height / 1.65
    queen.add(cylinder2);

    const geometrySphere = new THREE.SphereGeometry(generalSphere, radialSegments, radialSegments);
    const sphere = new THREE.Mesh(geometrySphere, material);
    sphere.position.y = queen.position.z + options.height / 2
    queen.add(sphere);

    return queen;
}

function buildRock(options) {
   const material = isWhite(options) ? materialWhite : materialBlack;

    const geometryCylinder1 = new THREE.CylinderGeometry(generalPawnBase, generalPawnTop, options.height, radialSegments);
    const rock = new THREE.Mesh(geometryCylinder1, material);

    const geometryCylinder2 = new THREE.CylinderGeometry(generalPawnTop, generalPawnBase, options.height / 3, radialSegments);
    const cylinder2 = new THREE.Mesh(geometryCylinder2, material);
    cylinder2.position.y = rock.position.z + options.height / 2
    rock.add(cylinder2);

    return rock;
}

function buildBishop(options) {
   const material = isWhite(options) ? materialWhite : materialBlack;

    const geometryCylinder1 = new THREE.CylinderGeometry(generalPawnBase, generalPawnTop, options.height, radialSegments);
    const bishop = new THREE.Mesh(geometryCylinder1, material);

    const geometryCylinder2 = new THREE.CylinderGeometry(generalPawnBase, generalPawnTop, options.height / 8, radialSegments);
    const cylinder2 = new THREE.Mesh(geometryCylinder2, material);
    cylinder2.position.y = bishop.position.z + options.height / 3
    bishop.add(cylinder2);

    const geometrySphere = new THREE.SphereGeometry(generalSphere, radialSegments, radialSegments);
    const sphere = new THREE.Mesh(geometrySphere, material);
    sphere.position.y = bishop.position.y + options.height / 2
    bishop.add(sphere);

    return bishop;
}

function buildKnight(options) {
   const material = isWhite(options) ? materialWhite : materialBlack;

    const geometryCylinder1 = new THREE.CylinderGeometry(generalPawnBase, generalPawnTop, options.height, radialSegments);
    const knight = new THREE.Mesh(geometryCylinder1, material);


    const geometryCube = new THREE.BoxGeometry(0.01, 0.01, 0.006); //TODO
    const cube1 = new THREE.Mesh(geometryCube, material);
    cube1.position.y = knight.position.z + options.height / 2
    cube1.rotation.z = 3 * Math.PI / 4
    if (!isWhite(options)) {
        cube1.position.x = 0.01
        cube1.rotation.y = Math.PI
    } else {
        cube1.position.x = -0.01
    }
    knight.add(cube1);

    const cube2 = new THREE.Mesh(geometryCube, material);
    cube2.position.y = knight.position.z + options.height / 2
    cube2.rotation.z = Math.PI / 4
    if (!isWhite(options)) {
        cube2.rotation.y = Math.PI
    }
    knight.add(cube2);


    return knight;
}

export  {buildPawn, buildKing, buildQueen, buildBishop, buildKnight, buildRock, buildCube}
