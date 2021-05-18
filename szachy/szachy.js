import * as THREE from 'three';
import {ARButton} from '../js/ARButton.js';
import {buildPawn, buildKnight, buildQueen, buildBishop, buildRock, buildKing, buildCube} from "./figury.js";


let camera, scene, renderer, reticle;
let controller;

let hitTestSource = null;
let hitTestSourceRequested = false;
let played = false;


/////////
// const width = 0.04;
// const height = 0.004
// const depth = 0.04;
//const gap = 0.002;
const width = 0.16;
const height = 0.0016
const depth = 0.16;
const gap = 0.008;
var amplitude = 0.012;

/////////
const numberX = 8;
const numberZ = 8;

const xDesc = ['1', '2', '3', '4', '5', '6', '7', '8'];
const zDesc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


const pawnArray = [];



var step = 0;
let deltaStep = 0.03;
var acceptUp = false;
var acceptDown = false;
var acceptForward = false;
var acceptNext = false;
let finishX = false
let finishZ = false
var recordNo = -1;
var coordFrom, coordTo, coordXindexFrom, coordXindexTo, coordZindexFrom, coordZindexTo, dX, dZ, signX, signZ;

var pawn;


let xStart;
let zStart;
let xFinish;
let zFinish;
let a0;
let a1;

let byX = false;
let byZ = false;

///

init();
animate();

function init() {

    const container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.6 );
    hemiLight.position.set( 0, 200, 0 );
    scene.add( hemiLight );
   // scene.add( light );
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);
    document.body.appendChild(ARButton.createButton(renderer, {requiredFeatures: ['local', 'hit-test']}));




    reticle = new THREE.Mesh(
        new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial()
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

   // function onSelect() {
    //    if (reticle.visible) {
            drawBoard()

            setTimeout(() => {
                acceptNext = true;
            }, 2 * 1000)
            //controller.removeEventListener('select', onSelect);
            //reticle.visible =   false;
   //    }
   // }

    controller = renderer.xr.getController(0);
   // controller.addEventListener('select', onSelect);
    scene.add(controller);

    window.addEventListener('resize', onWindowResize);


}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}


function render(timestamp, frame) {

    if (!played) {


        if (frame) {

            const referenceSpace = renderer.xr.getReferenceSpace();
            const session = renderer.xr.getSession();

            if (hitTestSourceRequested === false) {

                session.requestReferenceSpace('viewer').then(function (referenceSpace) {
                    session.requestHitTestSource({space: referenceSpace}).then(function (source) {
                        hitTestSource = source;
                    });
                });

                session.addEventListener('end', function () {

                    hitTestSourceRequested = false;
                    hitTestSource = null;
                });

                hitTestSourceRequested = true;
            }

            if (hitTestSource) {

                const hitTestResults = frame.getHitTestResults(hitTestSource);
                if (hitTestResults.length) {
                    const hit = hitTestResults[0];
                    reticle.visible = true;
                    reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

                } else {
                    reticle.visible = false;
                }

            }

        }

    }
    movePawns()
    renderer.render(scene, camera);


}


function animate() {
    renderer.setAnimationLoop(render);
}



function drawBoard(pos) {


    function isWhite(x, z) {
        return (x + z) % 2;
    }

    // const width = 0.04;
    // const height = 0.004
    // const depth = 0.04;
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
    const cubeWhite = buildCube({material: 'white', width, height, depth})
    const cubeBlack = buildCube({material: 'black', width, height, depth})

    let pawn;
    let offsetX = 0.1 + (numberX * width + (numberX - 1) * gap) / 2 - width / 2;
    for (let countX = 0; countX < numberX; countX++) {
        let offsetZ = -0.1 + (numberZ * depth + (numberZ - 1) * gap) / 2 - depth / 2;
        for (let countZ = 0; countZ < numberZ; countZ++) {
            let item = isWhite(countZ, countX) ? cubeWhite.clone() : cubeBlack.clone();
            item.position.set(offsetX, 0, offsetZ);
            scene.add(item);
//------------------------------------------------------------------------------------------------------
            if (xDesc[countX] == '1') {
                if (zDesc[countZ] == 'a' || zDesc[countZ] == 'h') {
                    pawn = rockWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = rockDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + rockDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] == 'b' || zDesc[countZ] == 'g') {
                    pawn = knightWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = knightDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + knightDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] == 'c' || zDesc[countZ] == 'f') {
                    pawn = bishopWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = bishopDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + bishopDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] == 'd') {
                    pawn = queenWhite.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = queenDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + queenDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] == 'e') {
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
            if (xDesc[countX] == '2') {
                pawn = pawnWhite.clone();
                pawn.name = zDesc[countZ] + xDesc[countX]
                pawn.delta = pawnDeltaY
                pawnArray.push(pawn)

                scene.add(pawn)
                pawn.position.x = item.position.x;
                pawn.position.y = item.position.y + pawnDeltaY;
                pawn.position.z = item.position.z;
            }
            if (xDesc[countX] == '7') {
                pawn = pawnBlack.clone();
                pawn.name = zDesc[countZ] + xDesc[countX]
                pawn.delta = pawnDeltaY
                pawnArray.push(pawn)

                scene.add(pawn)
                pawn.position.x = item.position.x;
                pawn.position.y = item.position.y + pawnDeltaY;
                pawn.position.z = item.position.z;
            }
            if (xDesc[countX] == '8') {
                if (zDesc[countZ] == 'a' || zDesc[countZ] == 'h') {
                    pawn = rockBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = rockDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + rockDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] == 'b' || zDesc[countZ] == 'g') {
                    pawn = knightBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = knightDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + knightDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] == 'c' || zDesc[countZ] == 'f') {
                    pawn = bishopBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = bishopDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + bishopDeltaY;
                    pawn.position.z = item.position.z;
                } else if (zDesc[countZ] == 'd') {
                    pawn = queenBlack.clone();
                    pawn.name = zDesc[countZ] + xDesc[countX]
                    pawn.delta = queenDeltaY
                    pawnArray.push(pawn)
                    scene.add(pawn)
                    pawn.position.x = item.position.x;
                    pawn.position.y = item.position.y + queenDeltaY;
                    pawn.position.z = item.position.z;

                } else if (zDesc[countZ] == 'e') {
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


    console.log('pos: ', pos)
 //   scene.position.setFromMatrixPosition(pos);
    scene.position.z = scene.position.z - 2;
    scene.rotation.x = Math.PI/6

    //scene.position.set( 0, 3, -3 ).applyMatrix4( controller.matrixWorld );
   // scene.rotation.z = Math.PI ;

}


function movePawns(){

    let sinus
//    console.log( acceptUp, acceptForwardX, acceptForwardZ, acceptDown, acceptNext )

    if (acceptNext) {
        acceptNext = false
        recordNo += 1
        if (recordNo == Moves.length) {
            acceptNext = false;
        } else {
            coordFrom = Moves[recordNo].move.substring(0, 2)
            coordTo = Moves[recordNo].move.substring(2, 4)

            coordXindexFrom = xDesc.indexOf(coordFrom.substring(1, 2))
            coordXindexTo = xDesc.indexOf(coordTo.substring(1, 2));
            coordZindexFrom = zDesc.indexOf(coordFrom.substring(0, 1))
            coordZindexTo = zDesc.indexOf(coordTo.substring(0, 1));
            //    let temp = ''
            //    for( let pawnCount = 0; pawnCount < pawnArray.length; pawnCount ++ )  temp += pawnArray[ pawnCount ].name + ' '

            //    console.log( recordNo, '/', Moves.length, '-->', coordFrom, '-->', coordTo, '-->', temp,  );
            console.log("-------------------------------------------------")
            console.log(coordFrom, '-->', coordTo);

            (coordXindexTo == coordXindexFrom) ? signX = 0 : (coordXindexTo > coordXindexFrom) ? signX = -1 : signX = 1;
            (coordZindexTo == coordZindexFrom) ? signZ = 0 : (coordZindexTo > coordZindexFrom) ? signZ = -1 : signZ = 1;
            //    ( coordXindexTo == coordXindexFrom ) ? dX = 0 : dX = ( coordXindexTo - coordXindexFrom ) * ( width + gap );
            //    ( coordZindexTo == coordZindexFrom ) ? dZ = 0 : dZ = ( coordZindexTo - coordZindexFrom ) * ( depth + gap );

            let adjustX = ((Math.abs(coordXindexTo - coordXindexFrom)) * ( 0.1 * width +    gap) )
            let adjustZ = ((Math.abs(coordZindexTo - coordZindexFrom)) * ( 0.1 * depth + gap) )

            xStart =  0.1 + ( numberX * width + ( numberX - 1 ) * gap ) / 2 - width / 2 - coordXindexFrom * ( width + gap );
            zStart =  -0.1 +( numberZ * depth + ( numberZ - 1 ) * gap ) / 2 - depth / 2 - coordZindexFrom * ( depth + gap );
            xFinish =  0.1 +( numberX * width + ( numberX - 1 ) * gap ) / 2 - width / 2 - coordXindexTo * ( width + gap );
            zFinish = - 0.1 +( numberZ * depth + ( numberZ - 1 ) * gap ) / 2 - depth / 2 - coordZindexTo * ( depth + gap );



            // xStart = parseFloat((adjustX + (numberX * width / 2 - coordXindexFrom * (width + gap)))   .toFixed(3));
            // zStart = parseFloat(((adjustZ + (numberZ * depth / 2 - coordZindexFrom * (depth + gap))) - depth - 2*gap ).toFixed(3));
            // xFinish = parseFloat((adjustX + (numberX * width / 2 - coordXindexTo * (width + gap)))    .toFixed(3));
            // zFinish = parseFloat(((adjustZ + (numberZ * depth / 2 - coordZindexTo * (depth + gap)))   - depth - 2*gap ).toFixed(3));


            // console.log('signX: ', signX)
            // console.log('signZ: ', signZ)
            // console.log('numberX: ', numberX)
            // console.log('numberZ: ', numberZ)
            // console.log('coordXindexFrom: ', coordXindexFrom)
            // console.log('coordZindexFrom: ', coordZindexFrom)
            // console.log('coordXindexTo: ', coordXindexTo)
            // console.log('coordZindexTo: ', coordZindexTo)
            // console.log('adjustX: ', adjustX)
            // console.log('adjustZ: ', adjustZ)
            //
            //
            // console.log('width: ', width)
            // console.log('depth: ', depth)
            // console.log('gap: ', gap)
            //
            // console.log('xStart', xStart)
            // console.log('zStart', zStart)
            // console.log('xFinish', xFinish)
            // console.log('zFinish', zFinish)
            // console.log('xFinish-xStart', xFinish - xStart)
            // console.log('zFinish-zStart', zFinish - zStart)
            // console.log("-------------------------------------------------")

            byX = false;
            byZ = false;
            (Math.abs(xFinish - xStart) > Math.abs(zFinish - zStart)) ? byX = true : byZ = true;
            if (byX === true) {
                a1 = (zFinish - zStart) / (xFinish - xStart)
                a0 = zStart - a1 * xStart
            } else {  // byZ
                a1 = (xFinish - xStart) / (zFinish - zStart)
                a0 = xStart - a1 * zStart
            }

            acceptUp = true;
        }
    }

    for (let pawnCount = 0; pawnCount < pawnArray.length; pawnCount++) {
        pawn = pawnArray[pawnCount]

        if (!coordFrom) {
            return
        }

        if (pawn.name == coordFrom) {
            if (acceptUp) {
                let deltaStep = 0.05;
                step += deltaStep;
                sinus = Math.sin(step);
                pawn.position.y = amplitude * sinus + pawn.delta
                if (Math.abs(step - Math.PI) < step) {
                    acceptUp = false
                    sinus = 1
                    step = 0
                    acceptForward = true
                }
            } else if (acceptForward) {

                //log initial position
                deltaStep = 0.006
                finishX = false
                finishZ = false


                if (byX === true) {
                    if (Math.abs(pawn.position.x - xFinish) >= deltaStep) {
                        pawn.position.x += signX * deltaStep;
                        pawn.position.z = a1 * pawn.position.x + a0
                    } else finishX = true;
                }
                if (byZ === true) {
                    if (Math.abs(pawn.position.z - zFinish) >= deltaStep) {
                        pawn.position.z += signZ * deltaStep;
                        pawn.position.x = a1 * pawn.position.z + a0
                    } else finishZ = true;
                }
                if (finishX || finishZ) {
                    acceptForward = false
                    step = 0
                    acceptDown = true
                    console.log('koniec')

                }
            } else if (acceptDown) {
                let deltaStep = 0.04;
                for (let pawnCount = 0; pawnCount < pawnArray.length; pawnCount++) {
                    if (pawnArray[pawnCount].name === coordTo) {
                        console.log(coordFrom, '--> delete from coordTo =', coordTo)
                        scene.remove(pawnArray[pawnCount])
                        pawnArray.splice(pawnCount, 1);
                        break
                    }
                }
                step += deltaStep;
                sinus = 2 * Math.sin(step + Math.PI / 2);
                pawn.position.y = amplitude * sinus + pawn.delta
                if (Math.abs(step - Math.PI) < step) {
                    acceptDown = false
                    acceptNext = true;
                    sinus = 0
                    step = 0
                    pawn.name = zDesc[coordZindexTo] + xDesc[coordXindexTo]
                }
            }
            break
        }
    }
}
