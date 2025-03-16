<template>
    <div class="freeimage">
        <slot />
    </div>
</template>
<style>
.freeimage img {
  width: 75%;
  height: auto;
  margin: 20px auto; /* Horizontally center the image */
  display: block; /* Ensure it’s treated as a block element for centering */
  border-radius: 8px;
  border-width: 0px;
}
</style>
