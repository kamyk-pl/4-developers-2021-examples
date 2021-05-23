import * as THREE from 'three';

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
    color: 0x5b360d,
    metalness: 1.0,
    roughness: 0.6,
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


function isWhite(options) {
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
        cube1.rotation.y = Math.PI;
    } else {
        cube1.position.x = -0.01
    }
    knight.add(cube1);

    const cube2 = new THREE.Mesh(geometryCube, material);
    cube2.position.y = knight.position.z + options.height / 2
    cube2.rotation.z = Math.PI / 4
    if (!isWhite(options)) {
        cube2.rotation.y = Math.PI;
    }
    knight.add(cube2);


    return knight;
}


function drawBoard(matrixWorld, scene, board, options) {
    function isWhite(x, z) {
        return (x + z) % 2;
    }

    const {height, width, depth, gap} = options
    const {pawnArray, xDesc, zDesc, numberX, numberZ} = board

    const pawnHeight = 0.04;
    const kingHeight = 0.095;
    const queenHeight = 0.09;
    const rockHeight = 0.06;
    const bishopHeight = 0.07;
    const knightHeight = 0.05;
    const kingDeltaY = (height + kingHeight) / 2;
    const pawnDeltaY = (height + pawnHeight) / 2;
    const queenDeltaY = (height + queenHeight) / 2;
    const rockDeltaY = (height + rockHeight) / 2;
    const bishopDeltaY = (height + bishopHeight) / 2;
    const knightDeltaY = (height + knightHeight) / 2;

    const pawnBlack = buildPawn({material: 'black', height: pawnHeight});
    const pawnWhite = buildPawn({material: 'white', height: pawnHeight});
    const kingBlack = buildKing({material: 'black', height: kingHeight});
    const kingWhite = buildKing({material: 'white', height: kingHeight});
    const queenBlack = buildQueen({material: 'black', height: queenHeight});
    const queenWhite = buildQueen({material: 'white', height: queenHeight});
    const rockBlack = buildRock({material: 'black', height: rockHeight});
    const rockWhite = buildRock({material: 'white', height: rockHeight});
    const bishopBlack = buildBishop({material: 'black', height: bishopHeight});
    const bishopWhite = buildBishop({material: 'white', height: bishopHeight});
    const knightBlack = buildKnight({material: 'black', height: knightHeight});
    const knightWhite = buildKnight({material: 'white', height: knightHeight});
    const cubeWhite = buildCube({...options, material: 'white'})
    const cubeBlack = buildCube({...options, material: 'black'})

    let pawn;
    let offsetX = (numberX * width + (numberX - 1) * gap) / 2 - width / 2;
    for (let countX = 0; countX < numberX; countX++) {
        let offsetZ = (numberZ * depth + (numberZ - 1) * gap) / 2 - depth / 2;
        for (let countZ = 0; countZ < numberZ; countZ++) {
            let item = isWhite(countZ, countX) ? cubeWhite.clone() : cubeBlack.clone();
            item.position.set(offsetX, 0, offsetZ);
            scene.add(item);
//------------------------------------------------------------------------------------------------------
            if (xDesc[countX] === '1') {
                if (zDesc[countZ] === 'a' || zDesc[countZ] === 'h') {
                    pawn = rockWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = rockDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + rockDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] === 'b' || zDesc[countZ] === 'g') {
                    pawn = knightWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = knightDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + knightDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] === 'c' || zDesc[countZ] === 'f') {
                    pawn = bishopWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = bishopDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + bishopDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] === 'd') {
                    pawn = queenWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = queenDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + queenDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] === 'e') {
                    pawn = kingWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = kingDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + kingDeltaY;
                    pawn.position.z = item.position.z;

                }
            }
            if (xDesc[countX] === '2') {
                pawn = pawnWhite.clone();
                pawn.name = zDesc[countZ] + xDesc[countX]
                pawn.delta = pawnDeltaY
                pawnArray.push(pawn)

                scene.add(pawn)
                pawn.position.x = item.position.x;
                pawn.position.y = item.position.y + pawnDeltaY;
                pawn.position.z = item.position.z;
            }
            if (xDesc[countX] === '7') {
                pawn = pawnBlack.clone();
                pawn.name = zDesc[countZ] + xDesc[countX]
                pawn.delta = pawnDeltaY
                pawnArray.push(pawn)

                scene.add(pawn)
                pawn.position.x = item.position.x;
                pawn.position.y = item.position.y + pawnDeltaY;
                pawn.position.z = item.position.z;
            }
            if (xDesc[countX] === '8') {
                if (zDesc[countZ] === 'a' || zDesc[countZ] === 'h') {
                    pawn = rockBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = rockDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + rockDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] === 'b' || zDesc[countZ] === 'g') {
                    pawn = knightBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = knightDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + knightDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] === 'c' || zDesc[countZ] === 'f') {
                    pawn = bishopBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = bishopDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + bishopDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] === 'd') {
                    pawn = queenBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = queenDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + queenDeltaY;
                    pawn.position.z = item.position.z;

                } else if (zDesc[countZ] === 'e') {
                    pawn = kingBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = kingDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + kingDeltaY;
                    pawn.position.z = item.position.z;
                }
            }
            offsetZ -= depth + gap;
        }
        offsetX -= width + gap;
    }
    scene.position.set( 0, 0.0, -2.5 ).applyMatrix4( matrixWorld );
    scene.rotation.z = Math.PI

}

function movePawns(animationState, scene, board, sizes) {
    let deltaStep, sinus;
    const {amplitude, width,  depth, gap} = sizes;
    const {pawnArray, xDesc, zDesc, numberX, numberZ} = board;


    if (animationState.acceptNext) {
        animationState.acceptNext = false
        animationState.moveIndex += 1
        if (animationState.moveIndex === Moves.length) {
            animationState.acceptNext = false;
        } else {
            animationState.coordFrom = Moves[animationState.moveIndex].move.substring(0, 2)
            animationState.coordTo = Moves[animationState.moveIndex].move.substring(2, 4)


            animationState.coordXindexFrom = xDesc.indexOf(animationState.coordFrom.substring(1, 2))
            animationState.coordXindexTo = xDesc.indexOf(animationState.coordTo.substring(1, 2));
            animationState.coordZindexFrom = zDesc.indexOf(animationState.coordFrom.substring(0, 1))
            animationState.coordZindexTo = zDesc.indexOf(animationState.coordTo.substring(0, 1));

            (animationState.coordXindexTo === animationState.coordXindexFrom) ? animationState.signX = 0 : (animationState.coordXindexTo > animationState.coordXindexFrom) ? animationState.signX = -1 : animationState.signX = 1;
            (animationState.coordZindexTo === animationState.coordZindexFrom) ? animationState.signZ = 0 : (animationState.coordZindexTo > animationState.coordZindexFrom) ? animationState.signZ = -1 : animationState.signZ = 1;

            animationState.xStart = (numberX * width + (numberX - 1) * gap) / 2 - width / 2 - animationState.coordXindexFrom * (width + gap);
            animationState.zStart = (numberZ * depth + (numberZ - 1) * gap) / 2 - depth / 2 - animationState.coordZindexFrom * (depth + gap);
            animationState.xFinish = (numberX * width + (numberX - 1) * gap) / 2 - width / 2 - animationState.coordXindexTo * (width + gap);
            animationState.zFinish = (numberZ * depth + (numberZ - 1) * gap) / 2 - depth / 2 - animationState.coordZindexTo * (depth + gap);

            animationState.byX = false;
            animationState.byZ = false;
            (Math.abs(animationState.xFinish - animationState.xStart) > Math.abs(animationState.zFinish - animationState.zStart)) ? animationState.byX = true : animationState.byZ = true;

            if (animationState.byX === true) {
                animationState.a1 = (animationState.zFinish - animationState.zStart) / (animationState.xFinish - animationState.xStart)
                animationState.a0 = animationState.zStart - animationState.a1 * animationState.xStart
            } else {  // byZ
                animationState.a1 = (animationState.xFinish - animationState.xStart) / (animationState.zFinish - animationState.zStart)
                animationState.a0 = animationState.xStart - animationState.a1 * animationState.zStart
            }
            animationState.acceptUp = true;
        }
    }
    pawnArray.forEach(pawn => {
        if (pawn.name === animationState.coordFrom) {
            if (animationState.acceptUp) {
                deltaStep = 0.05;
                animationState.step += deltaStep;
                sinus = Math.sin(animationState.step);
                pawn.position.y = amplitude * sinus + pawn.delta
                if (Math.abs(animationState.step - Math.PI) < animationState.step) {
                    animationState.acceptUp = false
                    sinus = 1
                    animationState.step = 0
                    animationState.acceptForward = true
                }
            } else if (animationState.acceptForward) {
                deltaStep = 0.006
                animationState.finishX = false
                animationState.finishZ = false
                if (animationState.byX === true) {
                    if (Math.abs(pawn.position.x - animationState.xFinish) >= deltaStep) {
                        pawn.position.x += animationState.signX * deltaStep;
                        pawn.position.z = animationState.a1 * pawn.position.x + animationState.a0
                    } else {
                        animationState.finishX = true;
                    }
                }
                if (animationState.byZ === true) {
                    if (Math.abs(pawn.position.z - animationState.zFinish) >= deltaStep) {
                        pawn.position.z += animationState.signZ * deltaStep;
                        pawn.position.x = animationState.a1 * pawn.position.z + animationState.a0
                    } else {
                        animationState.finishZ = true;
                    }
                }
                if (animationState.finishX || animationState.finishZ) {
                    animationState.acceptForward = false
                    animationState.step = 0
                    animationState.acceptDown = true


                }
            } else if (animationState.acceptDown) {
                deltaStep = 0.05;
                for (let pawnCount = 0; pawnCount < pawnArray.length; pawnCount++) {
                    if (pawnArray[pawnCount].name === animationState.coordTo) {
                        scene.remove(pawnArray[pawnCount])
                        pawnArray.splice(pawnCount, 1);
                        break
                    }
                }
                animationState.step += deltaStep;
                sinus = 2 * Math.sin(animationState.step + Math.PI / 2);
                pawn.position.y = amplitude * sinus + pawn.delta
                if (Math.abs(animationState.step - Math.PI) < animationState.step) {
                    animationState.acceptDown = false
                    animationState.acceptNext = true;
                    sinus = 0
                    animationState.step = 0
                    pawn.name = zDesc[animationState.coordZindexTo] + xDesc[animationState.coordXindexTo]
                }
            }
        }
    });
}

export {drawBoard, movePawns}
