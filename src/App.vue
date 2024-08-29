<template>
  <div class="ui-app">
    <router-view #="{ Component }">
      <keep-alive :include="include">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  // 需要缓存的页面
  const include = ref<any[]>(['Home']);

  onMounted(() => {});
</script>

<style lang="scss">
  html,
  body,
  #app {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  body {
    overflow: hidden;
    position: relative;
  }

  img {
    display: block;
    object-fit: cover;
    object-position: center;
  }

  .ui-app {
    --container-height: 100vh;
    height: 100vh;
    overflow: auto;
  }

  .van-pull-refresh {
    min-height: 100vh;
    overflow: auto;
  }
</style>
