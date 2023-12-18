<template>
    <div class="header_logo_container">
        <router-link to="/" class="logo">
            <img src="/assets/Symbol.svg" alt="Logo" width="50" height="50" />
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'HeaderLogo'
};
</script>

<style scoped>
@media (min-width: 801px) {

    .header_logo_container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
@media (max-width: 800px) {
    .header_logo_container {
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translate(-100%, -50%);
        padding: 10px;
    }
}
</style>

