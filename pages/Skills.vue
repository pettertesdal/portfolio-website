<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const canvasContainer = ref(null);
const languages = [
  { name: 'JavaScript', usage: 90, url: 'languages/javascript' },
  { name: 'Html', usage: 90, url: 'languages/html' },
  { name: 'Haskell', usage: 40, url: 'languages/haskell' },
  { name: 'Python', usage: 30, url: 'languages/python' },
  { name: 'Java', usage: 90, url: 'languages/java' },
  { name: 'Nix', usage: 90, url: 'languages/nix'},
  { name: 'Lua', usage: 70, url: 'languages/lua' },
  { name: 'Rust', usage: 30, url: 'languages/rust' }
];
const technologies = [
  { name: 'Nuxt', usage: 60, url: 'technologies/nuxt' },
  { name: 'Springboot', usage: 30, url: 'technologies/springboot' },
  { name: 'Docker', usage: 30, url: 'technologies/docker' },
  { name: 'MSSQL', usage: 60, url: 'technologies/mssql' },
]

let scene, camera, renderer, tubes, labels, animationFrameId;
const cardSpacing = 4;
const totalWidth = languages.length*cardSpacing;
const cardSpacingTechnology = 8;
const totalWidthTechnology = technologies.length*cardSpacingTechnology;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredLabel = null;



let isDragging = false;
let previousMouseX = 0;
let velocityX = 0;
let friction = 0.95; // Controls how fast inertia slows down (0.95 is a good balance)
let touchStartX = 0;
let touchDeltaX = 0;
let canDrag = false; // Prevent dragging unless touching the graph

onMounted(() => {
  initScene();
  animate();
  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onClick);

  // Dragging events
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseDrag);
  window.addEventListener('mouseup', onMouseUp);

  // Touch dragging (mobile support)
  window.addEventListener('touchstart', onTouchStart, { passive: false });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('click', onClick);

  // Remove dragging events
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mousemove', onMouseDrag);
  window.removeEventListener('mouseup', onMouseUp);

  // Remove touch events
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('touchend', onTouchEnd);

  renderer.dispose();
});


function initScene() {
  scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
const viewSize = 6; // Adjust this to control the scene size
camera = new THREE.OrthographicCamera(
  -viewSize * aspect,  // left
  viewSize * aspect,   // right
  viewSize,            // top
  -viewSize,           // bottom
  0.1,                 // near
  1000                 // far
);



  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  if (canvasContainer.value) {
    canvasContainer.value.appendChild(renderer.domElement);
  }

  camera.position.z = 5;

  tubes = new THREE.Group();
  labels = new THREE.Group();
  languages.forEach((lang, index) => {
    const curve = createTubeCurve(lang.usage);
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({ color: getColor(lang.usage), wireframe: false });

    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tube.position.x = index * cardSpacing - totalWidth/2;
    tubes.add(tube);

    // Create label
    const label = createLabelTexture(lang.name, lang.usage);
    const labelGeometry = new THREE.PlaneGeometry(2, 1);
    const labelMaterial = new THREE.MeshBasicMaterial({ map: label, transparent: true });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.x = (index - 1) * cardSpacing - totalWidth/2 + 1.5;
    labelMesh.position.y = ((lang.usage / (cardSpacing/2*10)) * Math.pow(1, 3) + 1);
    labelMesh.userData = { url: lang.url, originalScale: 1 }; // Store the original scale
    labels.add(labelMesh);
  });
  technologies.forEach((lang, index) => {
    const curve = createTechnologyTubeCurve(lang.usage);
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({ color: getColor(lang.usage), wireframe: false });

    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tube.position.x = index * cardSpacingTechnology - totalWidth/2;
    tubes.add(tube);

    // Create label
    const label = createLabelTexture(lang.name, lang.usage);
    const labelGeometry = new THREE.PlaneGeometry(2, 1);
    const labelMaterial = new THREE.MeshBasicMaterial({ map: label, transparent: true });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.x = (index) * cardSpacingTechnology - totalWidth/2 - 0.5 ;
    labelMesh.position.y = ((lang.usage / (cardSpacingTechnology/2*10)) * Math.pow(1, 3) + 1)*-1;
    labelMesh.userData = { url: lang.url, originalScale: 1 }; // Store the original scale
    labels.add(labelMesh);
  });0

  scene.add(tubes);
  scene.add(labels);
}


function onMouseDown(event) {
  if (!isOverGraph(event)) return;
  isDragging = true;
  previousMouseX = event.clientX;
  velocityX = 0; // Reset velocity when user starts dragging
}


// Handle dragging
function onMouseDrag(event) {
  if (!isDragging) return;

  const deltaX = event.clientX - previousMouseX;
  previousMouseX = event.clientX;

  const moveFactor = 0.01; // Adjust to fine-tune drag sensitivity

  tubes.children.forEach(tube => tube.position.x += deltaX * moveFactor);
  labels.children.forEach(label => label.position.x += deltaX * moveFactor);

  velocityX = deltaX * moveFactor; // Store velocity for inertia
}

// Stop dragging
function onMouseUp() {
  isDragging = false;
}

// TOUCH EVENTS
function onTouchStart(event) {
      if (!isOverGraph(event)) return;
  isDragging = true;
  touchStartX = event.touches[0].clientX;
  velocityX = 0; // Reset inertia
}

function onTouchMove(event) {
  if (!isDragging) return;

  event.preventDefault(); // Prevent scrolling while dragging

  touchDeltaX = event.touches[0].clientX - touchStartX;
  touchStartX = event.touches[0].clientX;

  const moveFactor = 0.02; // Adjust touch sensitivity

  tubes.children.forEach(tube => tube.position.x += touchDeltaX * moveFactor);
  labels.children.forEach(label => label.position.x += touchDeltaX * moveFactor);

  velocityX = touchDeltaX * moveFactor; // Store velocity for inertia
}

function onTouchEnd() {
  isDragging = false;
}


function isOverGraph(event) {
  if (!canvasContainer.value) return false;

  const rect = canvasContainer.value.getBoundingClientRect();
  let x, y;

  if (event.touches) {
    // Touch events
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    // Mouse events
    x = event.clientX;
    y = event.clientY;
  }

  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}





var clock = new THREE.Clock();
var speed = 0.7; //units a second
var delta = 0;

function animate() {
  animationFrameId = requestAnimationFrame(animate);

  delta = clock.getDelta();
  // Move everything left
  tubes.children.forEach(tube => tube.position.x -= speed * delta);
  labels.children.forEach(label => label.position.x -= speed * delta);



  if (!isDragging) {
    // Apply inertia when not actively dragging
    tubes.children.forEach(tube => tube.position.x += velocityX);
    labels.children.forEach(label => label.position.x += velocityX);

    velocityX *= friction; // Apply friction to slow down
    if (Math.abs(velocityX) < 0.001) velocityX = 0; // Stop when velocity is very low
  }

  // Reset position when offscreen
  tubes.children.forEach(tube => {
    if (tube.position.x < -totalWidth / 2) tube.position.x += totalWidth;
    if (tube.position.x > totalWidth / 2) tube.position.x -= totalWidth;
  });

  labels.children.forEach(label => {
    if (label.position.x < -totalWidth / 2) label.position.x += totalWidth;
    if (label.position.x > totalWidth / 2) label.position.x -= totalWidth;
  });

  renderer.render(scene, camera);
}


function handleResize() {
  const aspect = window.innerWidth / window.innerHeight;
  const viewSize = 6; // Keep consistent size across window changes

  camera.left = -viewSize * aspect;
  camera.right = viewSize * aspect;
  camera.top = viewSize;
  camera.bottom = -viewSize;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}




// 🖱️ Detect Hover
function onMouseMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(labels.children);

  if (intersects.length > 0) {
    if (hoveredLabel !== intersects[0].object) {
      // Reset old hovered label
      if (hoveredLabel) hoveredLabel.scale.setScalar(hoveredLabel.userData.originalScale);

      // Set new hovered label
      hoveredLabel = intersects[0].object;
      hoveredLabel.scale.setScalar(1.2); // Make it bigger
    }
  } else {
    // Reset previous hovered label when not hovering
    if (hoveredLabel) hoveredLabel.scale.setScalar(hoveredLabel.userData.originalScale);
    hoveredLabel = null;
  }
}

// 🖱️ Click to Open URL
function onClick(event) {
  if (hoveredLabel) {
    const url = hoveredLabel.userData.url;
    navigateTo('skills/'+hoveredLabel.userData.url);
  }
}

function createTubeCurve(usage) {
  const points = [];
  const length = cardSpacing/2*10;
  const height = usage / length;

  for (let i = 0; i <= length; i++) {
    const t = i / 15;
    const x = (t - 1.5) * 3;

    let y = 0;
    if (i <= length/2) y = height * Math.pow(i / (length/2), 3);
    else y = height * Math.pow((length - i) / (length/2), 3);

    points.push(new THREE.Vector3(x, y, 0));
  }


  return new THREE.CatmullRomCurve3(points);
}
function createTechnologyTubeCurve(usage) {
  const points = [];
  const length = cardSpacingTechnology/2*10;
  const height = usage / length;

  for (let i = 0; i <= length; i++) {
    const t = i / 15;
    const x = (t - 1.5) * 3;

    let y = 0;
    if (i <= length/2) y = height * Math.pow(i / (length/2), 3);
    else y = height * Math.pow((length - i) / (length/2), 3);

    y = y*-1

    points.push(new THREE.Vector3(x, y, 0));
  }

  return new THREE.CatmullRomCurve3(points);
}

function createLabelTexture(text, usage) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 128;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${text}`, canvas.width / 2, canvas.height / 2);

  return new THREE.CanvasTexture(canvas);
}

function getColor(usage) {
  const intensity = Math.min(255, Math.round(usage * 3.4));
  return new THREE.Color(`rgb(${intensity}, ${255 - intensity}, 150)`);
}

</script>

<template>
  <div class="skills-container">
    <h1>Languages</h1>
        <p>Through studies and freetime experience I have learned a few languages through my studies. The scrolling graph below showcases how much I've used a language. If you are interested in my experiences with specific languages you are welcome to click on any of them.</p>
    <div ref="canvasContainer" class="threejs-container"></div>
  </div>
</template>

<style scoped>
.skills-container {
  text-align: center;
  color: black;
}

.threejs-container {
  width: 100%;
  height: 80vh;
  overflow: hidden;
}
</style>

