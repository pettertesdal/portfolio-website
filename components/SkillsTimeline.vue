<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const skills = ref([
  { name: "JavaScript", color: "#f7df1e" },
  { name: "Python", color: "#3776ab" },
  { name: "C++", color: "#00599c" },
  { name: "Rust", color: "#dea584" },
  { name: "Java", color: "#b07219" },
]);

onMounted(() => {
  gsap.to(".flow-line", {
    duration: 4,
    ease: "power1.inOut",
    strokeDashoffset: 0,
    repeat: -1,
    yoyo: true,
  });
});
</script>

<template>
  <div class="timeline-container">
    <!-- Flowing Line -->
    <svg class="flow-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
      <path
        d="M 10 10 Q 30 -10, 50 10 T 90 10"
        stroke="white"
        stroke-width="0.8"
        fill="transparent"
        stroke-dasharray="100"
        stroke-dashoffset="100"
        class="flow-line"
      />
    </svg>

    <!-- Skill Nodes -->
    <div class="skills-wrapper">
      <div
        v-for="(skill, index) in skills"
        :key="index"
        class="skill-node"
        :style="{ backgroundColor: skill.color }"
      ></div>
      <div v-for="skill in skills" :key="skill.name" class="skill-label">
        {{ skill.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container */
.timeline-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  overflow: hidden;
}

/* Flowing Line Animation */
.flow-svg {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 10%;
}

.flow-line {
  animation: flow 3s linear infinite alternate;
}

@keyframes flow {
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
}

/* Skills Wrapper */
.skills-wrapper {
  display: flex;
  align-items: center;
  gap: 50px;
  position: relative;
  margin-top: 50px;
}

/* Skill Node (Circles) */
.skill-node {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.skill-node:hover {
  transform: scale(1.2);
}

/* Skill Labels */
.skill-label {
  text-align: center;
  color: white;
  font-size: 18px;
  margin-top: 10px;
}
</style>

