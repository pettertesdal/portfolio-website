<template>
    <div class="borderimage">
        <slot />
    </div>
</template>
<style>
.borderimage img {
  width: 75%;
  height: auto;
  margin: 20px auto; /* Horizontally center the image */
  display: block; /* Ensure it’s treated as a block element for centering */
  border-radius: 8px;
  border-style: solid;
  border-width: 1.5px;
}
</style>
