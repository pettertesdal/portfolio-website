<script setup>
import { ref } from 'vue';
defineProps(['string']);

const lineCount = ref(0);
</script>
<script>

</script>
<template>
    <div class="glitched_wrapper">
        <span class="glitched_layer1">{{ string }}</span>
        <span class="glitched_layer2">{{ string }}</span>
        <span class="glitched_layer3">{{ string }}</span>
    </div>
</template>
<style>

.glitched_wrapper {
    position: relative;
}
.glitched_wrapper span {
    font-family: "Rondal";
    position: absolute;
}

.glitched_layer1 {
    animation-name: glitched_layer1;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    clip-path: polygon(0% 0%,100% 0%,100% 10%,0% 10%,0% 20%,100% 20%,100% 30%,0% 30%,0% 40%,100% 40%,100% 50%,0% 50%,0% 60%,100% 60%,100% 70%,0% 70%,0% 80%,100% 80%,100% 90%,0% 90%,0% 100%,100% 100%);
}

.glitched_layer2 {
    color: red;
    clip-path: polygon(0% 0%,100% 0%,100% 10%,0% 10%,0% 20%,100% 20%,100% 30%,0% 30%,0% 40%,100% 40%,100% 50%,0% 50%,0% 60%,100% 60%,100% 70%,0% 70%,0% 80%,100% 80%,100% 90%,0% 90%,0% 100%,100% 100%);
    animation-name: glitched_layer2;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
.glitched_layer3 {
    animation-name: glitched_layer3;
    animation-duration: 2s;
    animation-iteration-count: infinite;

}


@keyframes glitched_layer1 {
    0% {opacity: 0% ;left: 4px; top: 4px }
    24.999% {opacity: 0%}
    25% {opacity: 100%}
    30% {opacity: 100%}
    30.001% {opacity: 0%; left: 4px; top: 4px }
    49.999% {opacity: 0%; left: 4px; top: -4px}
    50% {opacity: 100%;}
    55% {opacity: 100%;}
    55.001% {opacity: 0%; left: 4px; top: -4px}
    74.999% {opacity: 0%; left: -4px; top: 4px}
    75% {opacity: 100%;}
    80% {opacity: 100%;}
    80.001% {opacity: 0%; left: -4px; top: 4px}
    100% {opacity: 0%; left: 4px; top: 4px;}
}

@keyframes glitched_layer2 {
    0% {opacity: 0% ;left: -4px; top: -4px }
    24.999% {opacity: 0%}
    25% {opacity: 100%}
    30% {opacity: 100%}
    30.001% {opacity: 0%; left: -4px; top: -4px }
    49.999% {opacity: 0%; left: -4px; top: 4px}
    50% {opacity: 100%;}
    55% {opacity: 100%;}
    55.001% {opacity: 0%; left: -4px; top: 4px}
    74.999% {opacity: 0%; left: 4px; top: -4px}
    75% {opacity: 100%;}
    80% {opacity: 100%;}
    80.001% {opacity: 0%; left: 4px; top: -4px}
    100% {opacity: 0%; left: -4px; top: -4px;}
}

@keyframes glitched_layer3 {
    0% {opacity: 100%}
    24.999% {opacity: 100%}
    25% {opacity: 0%}
    30% {opacity: 0%}
    30.001% {opacity: 100%;}
    49.999% {opacity: 100%;}
    50% {opacity: 0%;}
    55% {opacity: 0%;}
    55.001% {opacity: 100%}
    74.999% {opacity: 100%}
    75% {opacity: 0%;}
    80% {opacity: 0%;}
    80.001% {opacity: 100%}
    100% {opacity: 100%;}
}

</style>
