<template>
    <section class="hero">
        <div ref="canvasContainer" class="canvas-container"></div>
        <div class="hero-content">
            <img id="profile-image" src="~/assets/Petter.png" width="200" height="200">
            <p>I'm a computer engineer passionate about coding, linux and gaming</p>
            <p>If you want to know more keep reading below</p>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";

const canvasContainer = ref(null);

onMounted(() => {
    if (!canvasContainer.value) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.value.appendChild(renderer.domElement);

    // Create Dynamic Flowing Line
    const numPoints = 100;
    let points = [];
    let time = 0; // Keep track of time for animation

    function updatePoints() {
        points = [];
        for (let i = 0; i < numPoints; i++) {
            const x = (i / numPoints) * 10 - 5 // Move to the right over time
            const y = Math.sin(i * 0.3 + time) * 0.5; // Animate the wave dynamically
            points.push(new THREE.Vector3(x, y, 0));
        }
        return new THREE.CatmullRomCurve3(points);
    }

    let curve = updatePoints();
    let geometry = new THREE.TubeGeometry(curve, 100, 0.02, 8, false);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const flowingLines = new THREE.Mesh(geometry, material);
    flowingLines.position.set(0, 0.8, 0);
    scene.add(flowingLines);

    let lastTime = performance.now(); // Track last frame timestamp

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        let now = performance.now();
        let deltaTime = (now - lastTime) / 1000; // Convert to seconds
        lastTime = now;

        time += deltaTime*1.5; // Increment time for movement

        // Update the curve dynamically
        curve = updatePoints();
        flowingLines.geometry.dispose();
        flowingLines.geometry = new THREE.TubeGeometry(curve, 100, 0.02, 8, false);

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
});
</script>

<style scoped>
/* Hero Section */
.hero {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: black;
    color: white;
    overflow: hidden;
    z-index: 1;
}

/* Three.js Canvas */
.canvas-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

/* Hero Content */
.hero-content {
    z-index: 1;
    padding: 20px;
}

h1 {
    font-size: 1rem;
    font-weight: bold;
}

p {
    font-size: 1rem;
}

#profile-image {
clip-path: circle();
}
.wrapper-profile {
    display: flex;
    flex-direction: row;
}
</style>

