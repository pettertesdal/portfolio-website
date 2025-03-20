<script setup>
import * as THREE from "three";

const leftCanvas = ref(null);

const createWavyLine = (canvasRef, isLeft) => {
  if (!canvasRef.value) return;

  // Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio); // For high DPI screens
  canvasRef.value.appendChild(renderer.domElement);

  // Create Points for the Line
  const numPoints = 100;
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let yPos = (i / numPoints) * 8 - 4; // Spread points vertically
    points.push(new THREE.Vector3(0, yPos, 0)); // Start in the center (x = 0)
  }

  let curve = new THREE.CatmullRomCurve3(points);
  let geometry = new THREE.TubeGeometry(curve, 200, 0.02, 8, false);
  let material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
  let lineMesh = new THREE.Mesh(geometry, material);
  scene.add(lineMesh);

  lineMesh.position.set(0, 0, 0);

  // Scrolling-Based Wave Effect
  let waveAmplitude = 0.3; // Initial amplitude (straight line)
  let lastScrollY = window.scrollY;
  let isScrolling = false;
  let waveOffsetY = 0.00; // Controls downward shift of the wave pattern
  let scrollSpeed = 0;

  // Detect Scroll
  window.addEventListener("scroll", () => {
    let newScrollY = window.scrollY;
    scrollSpeed = (newScrollY - lastScrollY) * 0.01; // Convert to a usable range
    isScrolling = true;
    lastScrollY = newScrollY;
  });

  window.addEventListener("resize", () => {
    const width = canvasRef.value.offsetWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;  // Keep aspect ratio consistent
    camera.updateProjectionMatrix(); // Update camera on resize
  });

  // Initialize the renderer size based on container's width
  const width = canvasRef.value.offsetWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;  // Set initial aspect ratio
  camera.updateProjectionMatrix(); // Update camera aspect

    var clock = new THREE.Clock();
    var speed = 0.9; //units a second
    var delta = 0



  function animate() {
    requestAnimationFrame(animate);

    delta = clock.getDelta();
    // If scrolling, increase wave amplitude
    if (isScrolling) {
      waveOffsetY += speed*delta + scrollSpeed; // Scroll moves the wave pattern downward
      isScrolling = false; // Reset scroll state
    } else {
      waveOffsetY += speed*delta; // Scroll moves the wave pattern downward
    }

    // Apply Sinusoidal Motion + Downward Wave Flow
    const maxWidth = canvasRef.value.offsetWidth * 0.01; // Limit wave width to 50% of container width
    for (let i = 0; i < points.length; i++) {
      points[i].x = Math.sin(i * 0.2 + waveOffsetY) * waveAmplitude * maxWidth * (isLeft ? -1 : 1); // Scale based on maxWidth
    }

    curve = new THREE.CatmullRomCurve3(points);
    lineMesh.geometry.dispose();
    lineMesh.geometry = new THREE.TubeGeometry(curve, 200, 0.02, 8, false);

    renderer.render(scene, camera);
  }

  animate();
};


onMounted(() => {
  createWavyLine(leftCanvas, true);
});
</script>
<template>
    <div ref="leftCanvas" class="canvas-container left"></div>
</template>

<style scoped>
.work-container {
  position: relative;
  width: 100%;
  height: 100vh;
}
.canvas-container {
  position: fixed;
  width: 5vw;
  height: 10vh;
  top: 0;
  z-index: 1;
}

</style>
