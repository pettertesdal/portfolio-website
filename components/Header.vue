<template>
    <header ref="header" class="header">
        <div class="wrapper">
            <HeaderLogo />
            <NavigationMenu :links="navLinks" />
            <div id="socialwrapper"><SocialLinks  :links="socialLinks" /></div>
        </div>
    </header>
</template>

<script>
import HeaderLogo from './Header/HeaderLogo.vue';
import NavigationMenu from './Header/NavigationMenu.vue';
import SocialLinks from './Header/SocialLinks.vue';

export default {
    components: { HeaderLogo, NavigationMenu, SocialLinks },
    data() {
        return {
            navLinks: [
                { title: 'Work', to: '/work' },
                { title: 'Skills', to: '/skills' },
                { title: 'Blog', to: '/blog' },
                { title: 'Projects', to: '/projects' },
                { title: 'About', to: '/about' },
            ],
            socialLinks: [
                { altText: 'X', img: '/assets/twitter-x-seeklogo.com-4.svg', href: 'https://twitter.com/Tesdap' },
                { altText: 'Github', img: '/assets/icons8-github.svg', href: 'https://github.com/h584903' },
            ]
        };
    },
};


</script>

<style scoped>
header {
    font-size: 15px;
    min-height: var(--headerHeight);
    position: fixed;
    background-color: var(--background);
    width: 100%;
    left: 0;
    top: 0;
    z-index: 700;
}

.wrapper {
    margin: 0 auto;
    height: 4.5rem;
    width: 100%;
    display: flex;
    justify-content:space-between;
    align-items: center;
}

@media (max-width: 1200px) {

}

@media (min-width: 1201px) {
    .wrapper {
        width: 80%;
    }

}

NavigationMenu {
    padding: 0;
}
</style>

