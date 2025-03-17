<script setup lang="ts">
const { data: posts } = await useAsyncData('projectposts', async () => {
  const allPosts = await queryCollection('projectposts').all();

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});


function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',  // Use 'short' for abbreviated month name (e.g., APR)
    day: 'numeric',
  });
}

</script>
<template>
  <h1>Projects</h1>
  <p>Here you can read about projects that I have done</p>
  <div class="projectposts-container">
    <div v-if="posts && posts.length > 0" class="projectposts-content">
      <div v-for="post in posts" :key="post.id">
        <NuxtLink :to="post.path" class="projectposts-link">
          <div class="projectposts-item">
            <ContentRenderer v-if="post" :value="post" :excerpt="true" />
          </div>
        </NuxtLink>
      </div>
    </div>
    <p v-else class="projectposts-no-posts">No posts available at the moment.</p>
  </div>
</template>

<style>
.projectposts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.projectposts-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
}

.projectposts-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.projectposts-item:hover {
  transform: scale(1.05);
  text-decoration: none;
}

.projectposts-item img {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}

.projectposts-item p {
  font-size: 0.7rem;
  text-decoration: none;
  color: #333;
  margin-top: 0.5rem;
  text-align: left;
}

.projectposts-item h1 {
  font-size: 1rem;
  text-decoration: none;
  color: #333;
  margin-top: 0.5rem;
}
.projectposts-link {
  text-decoration: none;

}

@media (max-width: 768px) {
  .projectposts-content {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .projectposts-content {
    grid-template-columns: 1fr;
  }
}
</style>

