<script setup>

definePageMeta({
  layout: 'default'
})


const { data: posts } = await useAsyncData("posts", () =>
  queryContent("/blog").sort({ date: -1 }).find()
);
</script>
<template>
        <div id="content">
            <div id="main-title">
                <h1>Notes and thoughts</h1>
                <!-- <router-link to="fitness">Fitness</router-link> -->
                <hr>
            </div>
            <div id="timeline">
                <ul>
                  <li v-for="post in posts" :key="post._path">
                    <NuxtLink :to="post._path">
                      <h2>{{ post.title }}</h2>
                      <p>{{ post.excerpt }}</p>
                      <p><em>{{ post.date }}</em></p>
                    </NuxtLink>
                  </li>
                </ul>
            </div>
        </div>
</template>
<style scoped>
#content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
.main-title {
    align-self: center;
}

</style>

