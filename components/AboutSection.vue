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

const createWavyLine = (canvasRef, isLeft) => {
  if (!canvasRef.value) return;

  // Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(100, window.innerHeight);
  canvasRef.value.appendChild(renderer.domElement);

  // Create Points for the Line
  const numPoints = 100;
  let points = [];
  for (let i = 0; i < numPoints; i++) {
            points.push(new THREE.Vector3(0, (i / numPoints) * window.innerHeight * 0.02 - 4, 0));
  }

  let curve = new THREE.CatmullRomCurve3(points);
  let geometry = new THREE.TubeGeometry(curve, 200, 0.02, 8, false);
  let material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  let lineMesh = new THREE.Mesh(geometry, material);
  scene.add(lineMesh);

  // Scrolling-Based Wave Effect
  let waveAmplitude = 0.3; // Initial amplitude (straight line)
  let lastScrollY = window.scrollY;
  let isScrolling = false;
  let waveOffsetY = 0.00; // Controls downward shift of the wave pattern
  let scrollSpeed = 0;

  // Detect Scroll
  window.addEventListener("scroll", () => {
            let newScrollY = window.scrollY;
            scrollSpeed = Math.abs(newScrollY - lastScrollY) * 0.02; // Convert to a usable range
    isScrolling = true;
    waveAmplitude = Math.min(waveAmplitude + scrollSpeed, 0.5); // Increase amplitude
            lastScrollY = newScrollY;
  });

  function animate() {
    requestAnimationFrame(animate);


    // If scrolling, increase wave amplitude
    if (isScrolling) {
      waveAmplitude = Math.min(waveAmplitude + 0.55, 10.5); // Grow up to max
      waveOffsetY += 0.15; // Scroll moves the wave pattern downward
      isScrolling = false; // Reset scroll state
    } else {
      waveAmplitude = Math.max(waveAmplitude - 0.005, 0.3); // Slowly fade back
      waveOffsetY += 0.05; // Scroll moves the wave pattern downward
    }

    // Apply Sinusoidal Motion + Downward Wave Flow
    for (let i = 0; i < points.length; i++) {
      points[i].x = Math.sin(i * 0.2 + waveOffsetY) * waveAmplitude * (isLeft ? 1 : -1);
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
  createWavyLine(rightCanvas, false);
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

