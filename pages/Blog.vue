<script setup>
import Header from '../components/Header.vue'
import Glitched from '../components/Glitched.vue'
import Background from '../components/vitruvian-background.vue'
import Footer from '../components/Footer.vue'



</script>
<template>
        <div id="content">
            <div id="main-title">
                <h1>Notes and thoughts</h1>
                <router-link to="fitness">Fitness</router-link>
                <hr>
            </div>
            <div id="timeline">
            </div>
        </div>
</template>
<style scoped>
#content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.main-title {
    align-self: center;
}

</style>
