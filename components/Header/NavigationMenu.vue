<template>
    <div class="navigation_container">
        <nav>
            <div id="menuToggle">
                <input ref="menuCheckbox" type="checkbox" />
                <span />
                <span />
                <span />

                <ul id="menu">
                    <li v-for="link in links" :key="link.to">
                        <router-link :to="link.to">{{ link.title }}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup>
defineProps({
    links: {
        type: Array,
        required: true
    }
})

const menuCheckbox = ref(null);

const closeMenu = () => {
    if (menuCheckbox.value) {
        menuCheckbox.value.checked = false;
    }
};

// Ensure menu closes when a link is clicked
onMounted(() => {
    document.querySelectorAll("#menu a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });
});
</script>
<script>

</script>

<style scoped>
.navigation_container {
    margin-right: 0;
}

.navigation_container ul li {
    margin-right: 2rem;
    list-style-type: none;
}
#menu {
    display: flex;
    flex-direction: row;
}

.navigation_container a {
    text-decoration: none;
    color: var(--foreground);
}
#menuToggle input {
    position: absolute;
    opacity: 0;
}
@media (max-width: 860px) {
    #menuToggle input
    {
        display: block;
        width: 40px;
        height: 32px;
        position: absolute;

        cursor: pointer;

        opacity: 0; /* hide this */
        z-index: 2; /* and place it over the hamburger */

        -webkit-touch-callout: none;
    }
    #menuToggle {
        display: block;
        position: relative;

        padding: 1em;
        z-index: 1;

        -webkit-user-select: none;
        user-select: none;
    }

    /* Burger
*/
    #menuToggle span
    {
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;

        background: #cdcdcd;
        border-radius: 3px;

        z-index: 1;

        transform-origin: 4px 0px;

        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
            background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
            opacity 0.55s ease;
    }

    #menuToggle span:first-child
    {
        transform-origin: 0% 0%;
    }

    #menuToggle span:nth-last-child(2)
    {
        transform-origin: 0% 100%;
    }

    #menuToggle input:checked ~ span
    {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: #232323;
    }

    /*
* But let's hide the middle one.
*/
    #menuToggle input:checked ~ span:nth-last-child(3)
    {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
    }

    /*
* Ohyeah and the last one should go the other direction
*/
    #menuToggle input:checked ~ span:nth-last-child(2)
    {
        transform: rotate(-45deg) translate(0, -1px);
    }

    #menu
    {
        flex-direction: column;
        position: absolute;
        width: 300px;
        height: 100vh;
        margin: -100px 0 0 -50px;
        padding: 50px;
        padding-top: 125px;

        background: #ededed;
        list-style-type: none;
        -webkit-font-smoothing: antialiased;
        /* to stop flickering of text in safari */

        transform-origin: 0% 0%;
        transform: translate(-100%, 0);

        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
    }

    #menu li
    {
        padding: 10px 0;
        font-size: 22px;
    }

    /*
* And let's slide it in from the left
*/
    #menuToggle input:checked ~ ul
    {
        transform: none;
    }


}
</style>

