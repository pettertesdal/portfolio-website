<script setup lang="ts">
const { data: posts } = await useAsyncData('workposts', async () => {
  const allPosts = await queryCollection('workposts').all();

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

const getReadingTime = (content) => {
  // Remove YAML front matter
  const cleanContent = content.replace(/^---[\s\S]*?---/, '');

  // Remove HTML comments
  const textContent = cleanContent.replace(/<!--.*?-->/g, '');

  // Split text into words
  const words = textContent.trim().split(/\s+/).length;

  // Calculate reading time (200 words per minute)
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);

  return minutes;
};


function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',  // Use 'short' for abbreviated month name (e.g., APR)
    day: 'numeric',
  });
}

</script>
<template>
  <h1>This is work</h1>
  <p>This will be another content site that uses clickable links (Maybe floating aroung animation) that links to an html site about that work and what it entailed</p>
  <div class="work-container">
    <div v-if="posts && posts.length > 0" class="content">
      <div v-for="post in posts" :key="post.id" >
        <NuxtLink :to="post.path" class="work-link">
          <div class="project">
                        <span class="post-date">
              {{ formatDate(post.date)}}
            </span>

            <ContentRenderer v-if="post" :value="post" :excerpt=true />
          </div>
        </NuxtLink>
      </div>
    </div>
    <p v-else class="no-posts">No posts available at the moment.</p>
    </div>
</template>
<style>
.content a  {
    text-decoration: none;
    color: black;
}
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
    width: 100%;
    margin-bottom: 0.8rem;
}
.project h1 {
    font-size: 1.4rem;
    margin-top: 0;
    align-self: center;
    text-align: center;
}

.project a,.project p {
    color: inherit;
    text-decoration: none;
    margin: 0;
    align-self: center;
    text-align: center;
}

</style>
