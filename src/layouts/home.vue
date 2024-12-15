<script setup lang="ts">
const collapsed = ref(false)
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered collapse-mode="width" :collapsed-width="64" :width="300" :collapsed="collapsed"
      show-trigger @collapse="collapsed = true" @expand="collapsed = false"
    >
      <Sidebar />
    </n-layout-sider>
    <n-layout-content pb-5>
      <div class="main-content dark:text-white">
        <Navbar />
        <RouterView />
      </div>
    </n-layout-content>
  </n-layout>
</template>
