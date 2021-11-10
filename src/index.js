import _ from 'lodash';
import * as THREE from "three";
// import * as THREE from "../node_modules/three/build/three.module.js";
// import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
// import  * as TrackballControls from '../node_modules/three/examples/jsm/controls/TrackballControls.js';


// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5;
// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

// Create Box
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
const boxMesh = new THREE.Mesh(boxGeometry, 
boxMaterial);
boxMesh.rotation.set(40, 0, 40);
scene.add(boxMesh);


//Trackball Controls for Camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;




// Lights
const lights = [];
const lightValues = [
    {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
    {colour: 0xBE61CF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0x00FF00, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
    {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
    lights[i] = new THREE.PointLight(
        lightValues[i]['colour'], 
        lightValues[i]['intensity'], 
        lightValues[i]['dist']);
    lights[i].position.set(
        lightValues[i]['x'], 
        lightValues[i]['y'], 
        lightValues[i]['z']);
    scene.add(lights[i]);
}

// Create spheres: 
const sphereMeshes = [];
const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0xC56CEF});
for (let i=0; i<4; i++) {
    sphereMeshes[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMeshes[i].position.set(0, 0, 0);
    scene.add(sphereMeshes[i]);
}
// Trigonometry Constants for Orbital Paths
let theta = 0;
const dTheta = 2 * Math.PI / 100;


const rendering = function() {
    requestAnimationFrame(rendering);
    // Constantly rotate box
    // scene.rotation.z -= 0.005;
    // scene.rotation.x -= 0.01;
    controls.update();
    theta += dTheta;
    const trigs = [
        {x: Math.cos(theta*1.05), 
         y: Math.sin(theta*1.05), 
         z: Math.cos(theta*1.05), 
         r: 2},
        {x: Math.cos(theta*0.8), 
         y: Math.sin(theta*0.8), 
         z: Math.sin(theta*0.8), 
         r: 2.25},
        {x: Math.cos(theta*1.25), 
         y: Math.cos(theta*1.25), 
         z: Math.sin(theta*1.25), 
         r: 2.5},
        {x: Math.sin(theta*0.6), 
         y: Math.cos(theta*0.6), 
         z: Math.sin(theta*0), 
         r: 2.75}
    ];
    for (let i=0; i<4; i++) {
        sphereMeshes[i].position.x = trigs[i]['r'] * trigs[i]['x'];
        sphereMeshes[i].position.y = trigs[i]['r'] * trigs[i]['y'];
        sphereMeshes[i].position.z = trigs[i]['r'] * trigs[i]['z'];
    };
    
    renderer.render(scene, camera);
}
rendering();