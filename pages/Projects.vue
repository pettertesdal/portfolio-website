<template>
    <div class="content">
        <div class="project">
            <a href="https://dooms-day-game.vercel.app/">
                <img src="/projects/therefore-mathematical-symbol-svgrepo-com.svg">
                <h1>Doomsday</h1>
                <p>A browser game based on the doomsday algorithm.</p>
            </a>
        </div>
    </div>
</template>
<style scoped>
.project {
    height: 15rem;
    width: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 0.5rem;

}

.project img {
    align-self: center;
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.8rem;
}
.project h1 {
    font-size: 1.4rem;
    margin-top: 0;
}

.project a,.project p {
    color: inherit;
    text-decoration: none;
    margin: 0;
    align-self: center;
    text-align: center;
}
</style>
