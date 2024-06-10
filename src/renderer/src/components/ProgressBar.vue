<template>
    <div class="progress" :class="{ progress__playing: isPlaying }">
        <h2 class="progress_title">{{ formatName(name) }}</h2>
        <p class="progress_text">
            {{ formatTime(position) }} / {{ formatTime(duration) }}
        </p>
        <div class="progress_line">
            <span :style="{ width: progress }" />
        </div>
    </div>
</template>

<script setup lang="ts" name="progressbar">
import { ref, computed } from 'vue'
import { usePlayerStore } from '../store/playerStore.ts'
import { player } from '../utils/player'

const name = ref('')
const position = ref(0)
const duration = ref(0.001)
const progress = ref('')

const store = usePlayerStore()
const isPlaying = computed(() => store.isPlaying)

const formatTime = (val: number) => {
    const min = Math.floor(val / 60)
    const sec = Math.floor(val % 60)
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
}

const formatName = (val: string) => {
    const newName = val.replace(/\.mp3$/, '');
    if (newName.length > 10) {
        return newName.substring(0, 10) + '...'; // 取10个字符
    }
    return newName;
};

const draw = () => {
    requestAnimationFrame(draw)
    const progressValue = player.position / player.duration
    progress.value = `${(progressValue * 100).toFixed(2)}%`
    position.value = player.position
    duration.value = player.duration
    name.value = player.current.file ? player.current.file.name : ''
}

draw()
</script>

<style scoped>
.progress {
    padding-left: 123px;
    padding-right: 12px;
    height: 53px;
    border-radius: 6px 6px 0 0;
    background-color: rgba(255, 255, 255, 0.95);
    transition: all 0.6s ease;
}

.progress__playing {
    transform: translateY(-140%);
}

.progress_title {
    padding-top: 6px;
    font-size: 13px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
}

.progress_text {
    padding-top: 2px;
    padding-left: 2px;
    font-size: 16px;
    font-weight: bold;
    color: #a7a4a4;
    transform: scale(0.6);
    transform-origin: left top;
}

.progress_line {
    height: 3px;
    border-radius: 3px;
    overflow: hidden;
    background-color: #ddd;
}

.progress_line span {
    display: block;
    height: 100%;
    background-color: #ec51a5;
}
</style>