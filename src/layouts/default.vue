<script setup lang="ts">
// const layout = useLayoutStore()
</script>

<template>
  <n-layout :native-scrollbar="false" has-sider position="absolute">
    <Sidebar />

    <n-layout-content :native-scrollbar="false">
      <div class="main-content flex-1 bg-slate-100 dark:bg-slate-800 dark:text-white my-2 mr-2">
        <Navbar />
        <div class="p-3">
          <RouterView />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style lang="scss">
.n-layout {
  // padding: 0.7rem .7rem .7rem 0 !important;
  background-color: transparent !important;
}

.n-layout-content {
  // height: 100vh !important;
}
</style>
