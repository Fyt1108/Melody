<template>
    <div class="disk" :class="{ disk__playing: isPlaying }">
        <label class="disk_cover" ref="cover" for="file" :style="{
            backgroundImage: coverUrl ? `url(${coverUrl})` : ''
        }" />
        <input id="file" ref="file" type="file" accept=".mp3" multiple @change="handleChange" />
    </div>
</template>

<script setup lang="ts" name="disk">
import { ref, watch, computed } from 'vue'
import { usePlayerStore } from '../store/playerStore.ts'
import { player } from '../utils/player'

const cover = ref<HTMLElement | null>(null)
const file = ref(null)

const store = usePlayerStore()
const isPlaying = computed(() => store.isPlaying)
const coverUrl = computed(() => store.coverUrl)

watch(isPlaying, (newVal) => {
    if (cover.value) {
        cover.value.style.animationPlayState = newVal ? 'running' : 'paused';
    }
})

const handleChange = async () => {
    // 假设 file 是一个 ref，它的 value 是 HTMLInputElement
    const inputElement: HTMLInputElement = file.value as unknown as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
        for (let i = 0; i < inputElement.files.length; i++) {
            const fileItem = inputElement.files[i];
            await player.append(fileItem);
        }
    }
    inputElement.value = '';
}

player.onReady.listen(() => {
    store.changeCover(player.currentCover)
})
player.onChange.listen(() => {
    store.changeCover(player.currentCover)
})
</script>


<style lang="scss" scoped>
.disk {
    position: relative;
    padding-top: 100%;
    border-radius: 100%;
    overflow: hidden;
    transform: translateY(-50%) scale(0.88);
    transform-origin: center bottom;
    transition: all 0.6s ease;
}

.disk input {
    display: none;
}

.disk_cover {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-image: radial-gradient(circle, #444 0%, #333 100%);
    background-size: cover;
    background-position: center;
    animation: rotate infinite 6s linear;
    animation-play-state: paused;
}

.disk_cover::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-image: linear-gradient(45deg, white, #dabad1);
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.disk__playing {
    transform: translateY(-50%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
        0 20px 20px -10px rgba(108, 29, 171, 0.3);
}

.disk__playing .disk_cover {
    animation-play-state: running;
}

@keyframes rotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>