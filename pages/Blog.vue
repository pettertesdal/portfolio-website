<script setup lang="ts">
const { data: posts } = await useAsyncData('blogposts', async () => {
  const allPosts = await queryCollection('blogposts').all();

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Function to calculate estimated reading time (assuming 200 words per minute)
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
  <div class="blog-container">
    <h1 class="blog-title">Blog</h1>

    <div v-if="posts && posts.length > 0" class="blog-list">
      <div v-for="post in posts" :key="post.id" >
        <NuxtLink :to="post.path" class="blog-link">
          <div class="blog-post">
            <span class="post-date">
              {{ formatDate(post.date)}} •
            </span>
            <span class="post-meta">{{ getReadingTime(post.rawbody) }} min read</span>
            <ContentRenderer v-if="post" :value="post" :excerpt=true />
          </div>
        </NuxtLink>
      </div>
    </div>

    <p v-else class="no-posts">No posts available at the moment.</p>
  </div>
</template>

<style>
.blog-post p{
  margin-bottom: 0;
  margin-top: 0;
  font-size: 0.9rem;
}
.blog-container {
  max-width: 600px;
  margin: 0 auto;
}

.blog-title {
  font-size: 2rem;
  text-align: center;
}


.blog-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}


.blog-post {
  height: 100%;
  border-radius: 8px;
  background: var(--background);
  box-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  transition: background 0.2s ease-in-out;
  padding: 15px;
}
.blog-link{
  text-decoration: none;
  color: #333;
}
.blog-post:hover {
  background: #ececec;
}

.blog-post h1 {
  margin: 0.2em 0em;
  font-size: 1.3rem;
  line-height: 1.2;
  font-weight: bold;
  color: #333;
}
.blog-post h2 {
  font-size: 1.1rem;
  line-height: 1.2;
  text-decoration: none;
  font-weight: bold;
  color: #333;
}

.post-meta {
  margin-top: 0;
  font-size: 0.7rem;
  text-transform: lowercase;
  font-weight: 700;
  font-variant: small-caps;
  color: #666;
  margin-bottom: 0em;
}

.post-date {
  margin-top: 0;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  font-variant: small-caps;
  color: #666;
  margin-bottom: 0em;
}

.no-posts {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}
</style>

