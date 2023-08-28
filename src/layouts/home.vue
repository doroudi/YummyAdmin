<script setup lang="ts">
// const layout = useLayoutStore()
const collapsed = ref(false)
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed" show-trigger
      @collapse="collapsed = true" @expand="collapsed = false"
    >
      <Sidebar />
    </n-layout-sider>
    <n-layout>
      <div class="main-content bg-slate-100 dark:bg-slate-800 dark:text-white">
        <Navbar />
        <RouterView />
      </div>
    </n-layout>
  </n-layout>
</template>

<style lang="scss">
.main {
  padding-left: var(--sidebar-width);
  padding-right: 1rem;
  transition: all 0.3s ease-in;

  &.sidebar-collapsed {
    padding-left: 5rem;
    padding-right: 1rem;
  }
}

.rtl {
  .main {
    padding-right: var(--sidebar-width);
    padding-left: 1rem;

    &.sidebar-collapsed {
      padding-right: 5rem;
      padding-left: 1rem;
    }
  }
}
</style>
