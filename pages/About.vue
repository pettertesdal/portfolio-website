<script>
definePageMeta({
  layout: 'empty'
})

</script>
<template>
    <div id="content">
        <AboutSection />
    </div>
</template>
<style scoped>
#content {
    flex: 1;
    display: flex;
    flex-direction: column;
}
/* The about section*/
#about {
    position:relative;
    height: 33rem;
}
#aboutTitle {
}
#aboutLine {
    top: 3rem;
    position: absolute;
    width: 35rem;
    height: 30rem;
    background-image: url("/public/assets/test-line.svg");
    background-size: contain;
    background-repeat: no-repeat;
}
#about p {
    margin: 0;
}
#aboutP {
    margin-top: 1rem;
    width: 18rem;
}
#aboutP2 {
}


/* Personal section */
#personal {
    position: relative;
}
#personal h1 {
    position: absolute;
    bottom: 2rem;
    left: 1.5rem;
    rotate: -3deg;
}
h1 {
    font-family: 'Sacramento', sans-serif;
    margin-bottom: 0;
}
p {
    font-size: 28px;
}

</style>
