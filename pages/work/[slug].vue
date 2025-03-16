<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('workposts').path(route.path).first()
})

</script>

<template>
  <div class="page-content">
  <template v-if="page">
    <ContentRenderer :value="page" />
  </template>
  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
  </div>
</template>

<style>
/* General page content styling */
.page-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

.page-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.page-content a {
  text-decoration: none;
  color: #333;
}

.page-content p {
  font-size: 1.1rem;
  color: #555;
}

.page-content img {
  width: 75%;
  height: auto;
  border-style: solid;
  margin: 20px auto; /* Horizontally center the image */
  display: block; /* Ensure it’s treated as a block element for centering */
  border-radius: 8px;
  border-width: 1.5px;
}

.page-content .ContentRenderer {
  margin-top: 20px;
}

/* Empty page styling */
.empty-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
}

.empty-page h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #e74c3c;
  margin-bottom: 20px;
}

.empty-page p {
  font-size: 1.25rem;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.empty-page a {
  padding: 10px 20px;
  font-size: 1.1rem;
  color: white;
  background-color: #3498db;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.empty-page a:hover {
  background-color: #2980b9;
}

</style>

