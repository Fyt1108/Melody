<template>
    <div class="player">
        <div class="player_disk">
            <disk />
        </div>
        <div class="player_control">
            <control />
        </div>
        <div class="player_progress">\
            <progressBar />
        </div>
    </div>
</template>

<script setup lang="ts" name="player">
import disk from './Disk.vue'
import control from './Control.vue'
import progressBar from './ProgressBar.vue'

</script>

<style lang="scss" scoped>
.player {
    position: relative;
    display: flex;
    max-width: 300px;
    max-height: 75px;
    width: 300px;
    height: 75px;
    border-radius: 8px;
    background-color: white;
}

.player_disk {
    flex: 1.2;
    padding: 12px;
}

.player_control {
    flex: 2;
    padding: 12px 0;
    padding-right: 12px;
}

.player_progress {
    position: absolute;
    left: 9px;
    right: 9px;
    top: 0;
    bottom: 25px;
    z-index: -1;
}
</style>