import * as THREE from 'three';
import {ARButton} from '../three/examples/jsm/webxr/ARButton.js';
import {drawBoard, movePawns} from "./pawns.js";




const sizes = {
    width: 0.16,
    height: 0.0016,
    depth: 0.16,
    gap: 0.008,
    amplitude: 0.012,
}

const board = {
    numberX: 8,
    numberZ: 8,
    xDesc: ['1', '2', '3', '4', '5', '6', '7', '8'],
    zDesc: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    pawnArray: []
}

const animationState = {
    step: 0,
    acceptUp: false,
    acceptDown: false,
    acceptForward: false,
    acceptNext: false,
    finishX: false,
    finishZ: false,
    moveIndex: -1,
    coordFrom: undefined,
    coordTo: undefined,
    coordXindexFrom: undefined,
    coordXindexTo: undefined,
    coordZindexFrom: undefined,
    coordZindexTo: undefined,
    signX: undefined,
    signZ: undefined,
    xStart: undefined,
    zStart: undefined,
    xFinish: undefined,
    zFinish: undefined,
    a0: undefined,
    a1: undefined,
    byX: false,
    byZ: false,
}


let camera, scene, renderer, reticle, controller;
let hitTestSource = null;
let hitTestSourceRequested = false;
let placed = false;

init();
animate();

function init() {

    const container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);
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

    scene.add(reticle);

    // function onSelect() {
    //    if (reticle.visible) {
    drawBoard(undefined,  scene, board, sizes);
    placed = true;


    setTimeout(() => {
        animationState.acceptNext = true;
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

    if (!placed) {
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
    movePawns(animationState, scene, board, sizes)
    renderer.render(scene, camera);
}

function animate() {
    renderer.setAnimationLoop(render);
}


