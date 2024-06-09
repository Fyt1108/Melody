<template>
    <div class="home">
        <div class="drag"></div>
        <player />
        <div class="drag2"></div>
    </div>
</template>

<script setup lang="ts" name="home">
import player from '../components/Player.vue'

</script>

<style lang="scss" scoped>
.drag {
    -webkit-app-region: drag;
    position: absolute;
    top: 50px;
    left: 105px;
    width: 200px;
    height: 25px;
    background-color: transparent;
    z-index: 1;
}

.drag2 {
    -webkit-app-region: drag;
    position: absolute;
    top: 125px;
    left: 0px;
    width: 300px;
    height: 25px;
    background-color: transparent;
    z-index: 1;
}

.home {
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-radius: 10px;
}
</style>