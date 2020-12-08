// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let mixer, mixer2, mixer3, mixer4, mixer5;

let object;

//add material name here first
let newMaterial, Standard, newStandard, pointsMaterial;

let SkyboxTexture, SkyboxMaterial, refractorySkybox;

let mouse;

const mixers = [];
const clock = new THREE.Clock();

function init() {

  container = document.querySelector( '#scene-container' );
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0xa0a0a0, 100, 1500 );
  mouse = new THREE.Vector2();
  alert("Thank you for buying 'Camera Life'. We will now record you and upload to the cloud.");
//scene.background = new THREE.Color( 0x8FBCD4 );

  createSkybox();
  createCamera();
  createControls();
  createLights();
  loadModels();
  createRenderer();

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function createSkybox(){

SkyboxTexture = new THREE.CubeTextureLoader()
  					.setPath( 'textures/' )
  					.load( [ '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg' ] );
//SkyboxTexture.encoding = THREE.sRGBEncoding;
SkyboxTexture.mapping = THREE.CubeRefractionMapping;
//other mappings to try:
/*
THREE.UVMapping
THREE.CubeReflectionMapping
THREE.CubeRefractionMapping
THREE.EquirectangularReflectionMapping
THREE.EquirectangularRefractionMapping
THREE.CubeUVReflectionMapping
THREE.CubeUVRefractionMapping
*/


scene.background = SkyboxTexture;

}


function createCamera() {

  camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 0.1, 10000 );
  camera.position.set( 500, 744, 500);

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}


function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  const directionalLight = new THREE.DirectionalLight( 0xffff0f );
				directionalLight.position.set( 1, - 0.5, - 1 );
				scene.add( directionalLight );


  scene.add( ambientLight, mainLight, directionalLight );

}



function loadModels() {
const loader = new THREE.FBXLoader();

const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), new THREE.MeshLambertMaterial( { color: 0x999999, depthWrite: false } ) );
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add( mesh );

// model
loader.load( '../models/test.fbx', function ( object ) {
  mixer = new THREE.AnimationMixer( object );
  const action = mixer.clipAction( object.animations[ 0 ] );
  action.play();
  object.traverse( function ( child ) {
    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add( object );
});

loader.load( '../models/test.fbx', function ( object ) {
  mixer2 = new THREE.AnimationMixer( object );
  const action = mixer2.clipAction( object.animations[ 0 ] );
  action.play();
  object.traverse( function ( child ) {
    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add( object );
  object.position.x = 200;
  object.updateMatrix();
});

loader.load( '../models/test.fbx', function ( object ) {
  mixer3 = new THREE.AnimationMixer( object );
  const action = mixer3.clipAction( object.animations[ 0 ] );
  action.play();
  object.traverse( function ( child ) {
    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add( object );
  object.position.z = 200;
  object.updateMatrix();
});

loader.load( '../models/test.fbx', function ( object ) {
  mixer4 = new THREE.AnimationMixer( object );
  const action = mixer4.clipAction( object.animations[ 0 ] );
  action.play();
  object.traverse( function ( child ) {
    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add( object );
  object.position.x = -200;
  object.updateMatrix();
});

loader.load( '../models/test.fbx', function ( object ) {
  mixer5 = new THREE.AnimationMixer( object );
  const action = mixer5.clipAction( object.animations[ 0 ] );
  action.play();
  object.traverse( function ( child ) {
    if ( child.isMesh ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add( object );
  object.position.z = -200;
  object.updateMatrix();
});

}

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;



  container.appendChild( renderer.domElement );

}

function update() {

  // /*for ( const mixer of mixers ) {
  //
  //   mixer.update( delta );
  // }
  // */

}


function render() {

  //call the raycaster
  renderer.render( scene, camera );

}

function onMouseMove( event ) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

function animate() {

    requestAnimationFrame( animate );
    let delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );
    if ( mixer2 ) mixer2.update( delta );
    if ( mixer3 ) mixer3.update( delta );
    if ( mixer4 ) mixer4.update( delta );
    if ( mixer5 ) mixer5.update( delta );
    renderer.render( scene, camera );
  }


function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );
window.addEventListener('mousemove', onMouseMove, false );

init();
animate();
