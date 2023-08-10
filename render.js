import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Creación de la escena y la cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Implementación del render a la view del windows, toma el alto y el ancho de la pantalla disponible
const renderer = new THREE.WebGLRenderer({});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

camera.position.set(0,4,8)

// Creación de la luz direccional y se añade a la escena
const light = new THREE.DirectionalLight( 0xffffff, .3 );
light.position.set( 0, 0, -30 );
light.castShadow = true;
scene.add( light );

// Creación de uan 2da luz direccional a la parte trasera del modelo
const light2 = new THREE.DirectionalLight( 0xffffff, 1 );
light2.position.set( 0, 10, 10 );
light2.castShadow = true;
scene.add( light2 );

// Se importa un modelo 3d con el loader de GLTF
const loader = new GLTFLoader();

const modelHouse = './assets/hosejapanese.gltf' // Modelo a renderizar

// Usamos la librería del loader y cargamos el modelo
loader.load(modelHouse, function ( gltf ) {
	
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

// Función que actualiza cada frame en tiempo real la escena y la cámara
function animate() {
  requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

// Importamos control para que el usuario pueda orbitar por la escena ysando la cámara
const controls = new OrbitControls( camera, renderer.domElement );