<template>
    <div class="social_container">
        <ul class="social-links">
            <li v-for="link in links" :key="link.href">
                <a :href="link.href" target="_blank" rel="noopener">
                    <img :src="link.img" :alt="link.altText" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SocialLinks',
    props: {
        links: {
            type: Array,
            required: true
        },
    },
}
</script>

<style scoped>
.social_container {
    order: 3;
}

.social-links {
    list-style: none;
    display: flex;
}

.social_container ul li {
    margin: 2rem;
    text-decoration: none;
}

.social-links img {
    height: 20px;
    width: 20px;
}

</style>

