<script setup>
const props = defineProps({
    reversed: Boolean
})
</script>
<script>
</script>
<template>
    <div></div>
</template>
<style>

.content {
    display: flex;
    justify-content: space-evenly;
}

.background-left, .background-right {
    flex-grow: 1;
    max-width: 25rem;
    background-repeat: repeat;
    background-attachment: scroll;
    background-size: 744px, 1613px;
    animation: scrollBackground 30s linear infinite;
}
.background-left {
    background-image: url(~/assets/vitruvian-curves-onesided.svg);
    background-position: right;
    order: 1;
}
.main-content {
    margin: 1rem;
    flex-grow: 1;
    width: 45%;
    order:2
}
.background-right {
    background-image: url(~/assets/vitruvian-curves-onesided-flipped.svg);
    background-position: left;
    order: 3;
}

@keyframes scrollBackground {
from {
    background-position-y: 0;
}
to {
    background-position-y: -1613px;
}
}
@media (max-width: 800px) {
    .main-content {
        width: 50%;
    }

}
@media (max-width: 600px) {
    .main-content {
        width: 70%;
    }

}
</style>
