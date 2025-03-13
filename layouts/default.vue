<template>
    <body>
        <Header enable=socialEnabled />
        <div class="content">
            <VitruvianBackground v-bind:reversed="false" class="background-left" />
            <VitruvianBackground v-bind:reversed="true" class="background-right" />
            <div class="main-content">
                <slot />
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
    background: white;
    flex-direction: column;
}
.content {
    padding-top: var(--headerHeight);
    flex: 1;
}

@media (max-width: 859px) {
    .background-left, 
    .background-right {
        display: none;
    }
}


</style>
