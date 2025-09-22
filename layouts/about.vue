<template>
    <body>
        <Header enable=socialEnabled />
        <HeroSection />
        <div class="content">
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
    flex-direction: column;
    background: black;
}
.content {
    flex: 1;
}
</style>

