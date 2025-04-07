<script setup>
</script>
<template>
        <div class="opening-container">
            <span>Hi! </span>
            <div class="opening_first_line">
                <span>My</span><span>name</span><span>is</span>
            </div>
            <div class="opening_line">
                <span>Petter</span><Glitched id="glitched" string="T" /><span class="opening_third_line">esdal</span>
            </div>
        </div>
        <p class="opening_description">And welcome to my portfolio-website, here you can see projects that I have worked on and general information about me and skills I possess.</p>
</template>
<style scoped>
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
</style>
