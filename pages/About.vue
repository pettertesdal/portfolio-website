<template>
    <div id="content">
        <div id="about">
            <div id="aboutLine"></div>
            <h1 id="aboutTitle">About me</h1>
            <div id="aboutP">
                <p>I'm a fresh and</p>
                <p>new computer engineer</p>
                <p>from Norway I have a knack for picking up interests hobbies and I relish the oppurtunity for challenge.</p>
            </div>
        </div>
        <div id="personal">
            <h1>Personal info</h1>
        </div>
        <h1>Studies</h1>
        <h1>Experience</h1>
        <h1>Skills</h1>
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
