<template>
  <section class="about">
    <!-- Three.js Left Line -->
    <div ref="leftCanvas" class="canvas-container left"></div>

    <!-- Centered Bio Section -->
    <div class="text-content">
      <h2>About Me</h2>
      <p>
        I'm <strong>Petter Tesdal</strong>, a computer engineer passionate about solving
        complex problems with clean and efficient code. I love building scalable
        applications, optimizing performance, and experimenting with creative technologies.
      </p>
      <p>
        Whether it's backend architecture, frontend UI/UX, or system design, I strive to
        write elegant solutions that blend functionality with aesthetics.
      </p>

      <!-- Skills -->
      <div class="skills">
        <h3>Skills</h3>
        <ul>
          <li>⚡ Java, Spring Boot</li>
          <li>🌍 Vue.js, Nuxt, Tailwind</li>
          <li>🚀 NixOS, DevOps</li>
          <li>🖥️ Three.js, WebGL</li>
        </ul>
      </div>
    </div>

    <!-- Three.js Right Line -->
    <div ref="rightCanvas" class="canvas-container right"></div>
  </section>
</template>

<script setup>
import * as THREE from "three";

const leftCanvas = ref(null);
const rightCanvas = ref(null);
let animationFrameId1 = null;
let animationFrameId2 = null;

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
  let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
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
    var speed = 1.5; //units a second
    var delta = 0

  function animate() {
    if (isLeft) {
      animationFrameId1 = requestAnimationFrame(animate);
    } else {
      animationFrameId2 = requestAnimationFrame(animate)
    }

    delta = clock.getDelta();
    // If scrolling, increase wave amplitude
    if (isScrolling) {
      waveAmplitude = Math.min(waveAmplitude + 0.1, 0.2); // Limit max amplitude to avoid overflow
      waveOffsetY += speed*delta + scrollSpeed; // Scroll moves the wave pattern downward
      isScrolling = false; // Reset scroll state
    } else {
      waveAmplitude = Math.max(waveAmplitude - 0.005, 0.1); // Slowly fade back
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
  const cleanup = () => {
      cancelAnimationFrame(animationFrameId1);
      cancelAnimationFrame(animationFrameId2);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    scene.remove(lineMesh);
  };

  return cleanup;

};

let cleanup;

onMounted(() => {
  cleanup = createWavyLine(leftCanvas, true);
});
onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  background: black;
  color: white;
  padding: 50px 20px;
  position: relative;
}

.text-content {
  max-width: 600px;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  line-height: 1.5;
}

.skills {
  margin-top: 20px;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

/* Three.js Lines */
.canvas-container {
  position: fixed;
  width: 100px;
  height: 100vh;
  top: 0;
  z-index: 0;
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>

