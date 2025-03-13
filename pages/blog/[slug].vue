<script setup>
const route = useRoute();
const { data: post } = await useAsyncData(() =>
  queryContent("/blog/" + route.params.slug).findOne()
);
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <p><em>{{ post.date }}</em> by {{ post.author }}</p>

    <img v-if="post.image" :src="post.image" alt="Post Image" style="max-width: 100%;" />

    <ContentRenderer :value="post" />
  </article>
</template>

