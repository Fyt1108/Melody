<template>
    <div class="control" :class="{ control__playing: isPlaying }">
        <div class="control_btn control_btn__side" :class="{ movingLeft: isMovingLeft }" @click="handlePrev"
            @animationend="endAnimationLeft">
            <img class="prev" src="../assets/next.svg"></img>
        </div>
        <div class="control_btn" @click="handlePlay">
            <span class="play-btn" />
        </div>
        <div class="control_btn control_btn__side" :class="{ movingRight: isMovingRight }" @click="handleNext"
            @animationend="endAnimationRight">
            <img class="next" src="../assets/next.svg"></img>
        </div>
    </div>
</template>

<script setup lang="ts" name="control">
import { computed, ref } from 'vue'
import { usePlayerStore } from '../store/playerStore.ts'
import { player } from '../utils/player'

const playerStore = usePlayerStore()
const isMovingRight = ref(false);
const isMovingLeft = ref(false);
const isPlaying = computed(() => playerStore.isPlaying)

const handlePlay = () => {
    if (!player.isEmpty) {
        if (!isPlaying.value) {
            player.play()
        } else {
            player.pause()
        }
    }
}

const handlePrev = () => {
    if (isPlaying.value) {
        isMovingLeft.value = true;
        player.prev()
    }
}

const handleNext = () => {
    if (isPlaying.value) {
        isMovingRight.value = true;
        player.next()
    }
}

const endAnimationLeft = (): void => {
    isMovingLeft.value = false;
}

const endAnimationRight = (): void => {
    isMovingRight.value = false;
}

player.onPlay.listen(() => {
    playerStore.togglePlay(true)
})
player.onPause.listen(() => {
    playerStore.togglePlay(false)
})
</script>

<style lang="scss" scoped>
.control {
    display: flex;
    height: 100%;
}

.next {
    width: 35%;
    animation: moveAndBack 2s ease-in-out;
}

.prev {
    width: 35%;
    transform: scaleX(-1);
}

.control_btn:hover .next,
.control_btn:hover .prev {
    filter: brightness(0) invert(1);
}

.next:active {
    animation: moveAndBack 2s ease-in-out;
}

.control_btn {
    display: flex;
    margin: 2px;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-radius: 4px;
    color: #ccc;
    font-size: 16px;
    transition: background-color 0.6s ease;
    border-radius: 10px;
}

.control_btn:hover {
    background-color: #ddd;
    color: white;
}

.control_btn__side {
    font-size: 14px;
}

.play-btn {
    position: relative;
    width: 20px;
    height: 20px;
}

.play-btn::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 50%;
    margin-left: -4px;
    margin-top: -10px;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-left-color: #ccc;
    border-top-width: 10px;
    border-bottom-width: 10px;
    transition: all 0.2s ease;
}

.play-btn::after {
    content: '';
    position: absolute;
    right: 5px;
    top: 50%;
    margin-right: -4px;
    margin-top: -10px;
    width: 0;
    height: 20px;
    border: 0 solid transparent;
    border-width: 0 0 0 6px;
    border-left-color: #ccc;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease;
}

.control__playing .play-btn::before {
    border-width: 0 0 0 6px;
    height: 20px;
    left: 5px;
}

.control__playing .play-btn::after {
    opacity: 1;
    transform: scale(1);
}

.control_btn:hover .play-btn::before {
    border-left-color: white;
}

.control_btn:hover .play-btn::after {
    border-color: white;
}

@keyframes moveAndBackRight {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(4px);
        /* 向右移动3px */
    }

    100% {
        transform: translateX(0);
        /* 返回原位 */
    }
}

@keyframes moveAndBackLeft {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(-4px);
        /* 向右移动3px */
    }

    100% {
        transform: translateX(0);
        /* 返回原位 */
    }
}

.movingRight {
    animation: moveAndBackRight 0.4s ease-in-out;
}

.movingLeft {
    animation: moveAndBackLeft 0.4s ease-in-out;
}
</style>