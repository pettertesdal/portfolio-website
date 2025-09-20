<script setup lang="ts">

const { data: posts } = await useAsyncData('workposts', async () => {
  const allPosts = await queryCollection('workposts').all();

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
  <div id="precontent">
    <h1>Work experience</h1>
    <p>Here I've put I've recorded my relevant work experience in chronological order. Feel free to click the links to gain more information</p>
  </div>
  <div class="work-container">
    <div v-if="posts && posts.length > 0" class="content">
      <TimeLine />
            <div class="wrapper">
      <div v-for="post in posts" :key="post.id" id="post-container">
        <NuxtLink :to="post.path" class="work-link">
          <div class="work-post">
            <div class="post-date">
              {{ formatDate(post.date) }}
            </div>
            <img :src="`/work/${post.title}.svg`" alt="Work image">
          </div>
        </NuxtLink>
      </div>
            </div>
    </div>
    <p v-else class="no-posts">No posts available at the moment.</p>
  </div>
</template>

<style scoped>
.work-container {
  position: relative;
  width: 100%;
}

.wrapper{
    flex-direction: column;
  text-decoration: none;
}

.main-content {
  margin-top: 0;
}

#precontent {
      margin-top: -50px; /* Move it upwards */
    padding-top: 50px;
  z-index: 4;
  background: white;
  position: relative;
}

#post-container {
  position: relative; /* Ensure the line is positioned relative to this container */
  margin-bottom: 2rem; /* Add spacing between posts */
}

.work-post {
  display: flex;
  flex-direction: row; /* Stack elements vertically */
  align-items: center;
  gap: 1vh; /* Small gap between date and image */
  width: 100%; /* Ensure consistent width */
  height: 15vh;
  border-radius: 8px;
    background-color: var(--background);
  border-style: solid;
  border-width: 1.5px;
    z-index: 9;
    padding: 10px;
}
.work-post:hover {
  transform: scale(1.05);
  text-decoration: none;
}


.post-date {
  font-size: 0.7rem;
  font-weight: bold;
  text-align: center;
  width: 100%;/* Match image width */
}

.work-post img {
  width: 100%; /* Ensure image takes up full width */
}

.content a {
    display:flex;
  color: black;
}



.work-post h1 {
  font-size: 1.4rem;
  margin-top: 0;
  align-self: center;
  text-align: center;
}

.work-post a,
.work-post p {
  color: inherit;
  text-decoration: none;
  margin: 0;
  align-self: center;
  text-align: center;
}
</style>
