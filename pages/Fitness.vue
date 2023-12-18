<script setup>
import Header from '../components/Header.vue'
import Glitched from '../components/Glitched.vue'
import Background from '../components/vitruvian-background.vue'
import Footer from '../components/Footer.vue'



</script>
<template>
    <body>
        <Header enable=socialEnabled />
        <div class="content">
            <Background v-bind:reversed="false" class="background-left" />
            <Background v-bind:reversed="true" class="background-right" />
            <div class="main-content">
                <div class="opening-container">
                    <span>Hi! </span>
                    <div class="opening_first_line">
                    <span>My</span><span>name</span><span>is</span>
                    </div>
                    <div class="opening_line">
                        <span>Petter</span><Glitched id="glitched" string="T" /><span class="opening_third_line">esdal</span>
                    </div>
                </div>
                <p class="opening_description">And this is my portfolio-website, where I can showcase my projects, nerdout and have fun</p>
            </div>
        </div>
        <Footer />
    </body>
</template>
<style scoped>
body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}
.opening-container {
    flex-wrap: wrap;
    margin-top: 1rem;
    max-width: 55rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
span {
    font-family: "Rondal", sans-serif;
    font-weight: bold;
    font-size: 3rem;
}
.opening_first_line {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;

}
#glitched {
    font-size: 3rem;
}
.opening_third_line {
    padding-left: 1rem;
}
.opening_line {
    gap: 0.5rem;
    display: flex;
}


.content {
    padding-top: var(--headerHeight);
    flex: 1;
}
</style>
