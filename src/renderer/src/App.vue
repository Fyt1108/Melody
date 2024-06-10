<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts" name="app">

</script>

<style lang="scss">
@import url('./assets/font.scss');

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: inherit;
}

ul,
ol {
  list-style: none;
}

h1,
h2,
h3,
h4 {
  font: inherit;
}

input,
select,
button {
  font: inherit;
}

html,
body {
  height: 100%;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: Misans;
}

#app {
  height: 100%;
  overflow: hidden;
}
</style>
