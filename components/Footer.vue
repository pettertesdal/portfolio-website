<script setup>
import SocialLinks from "./Header/SocialLinks.vue"

const socialLinks = [
    { altText: 'X', img: '/assets/twitter-x-seeklogo.com-4.svg', href: 'https://twitter.com/Tesdap' },
    { altText: 'Github', img: '/assets/icons8-github.svg', href: 'https://github.com/pettertesdal' },
]
</script>
<template>
    <div id="footer">
        <div id="wrapper">
        <p id="endComment">Designed and coded by: Petter Tesdal</p>
        <SocialLinks :links="socialLinks" />
        </div>
    </div>
</template>
<style scoped>
#footer {
    background-color: var(--background);
    width: 100%;
    min-height: 4.5rem;
    font-size: 15px;
    z-index: 700;
}
#wrapper {
    opacity: 0.5;
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    align-items: center;
}
</style>
