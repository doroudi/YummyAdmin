<script setup lang="ts">
// const layout = useLayoutStore()
</script>

<template>
  <n-layout has-sider>
    <Sidebar />

    <div class="main-content flex-1 bg-slate-100 dark:bg-slate-800 dark:text-white">
      <Navbar />
      <div class="p-3">
        <RouterView />
      </div>
    </div>
  </n-layout>
</template>

<style lang="scss">
.n-layout {
  padding: 0.7rem .7rem .7rem 0!important;
  background-color: transparent!important;
}
.main {
  // padding-left: var(--sidebar-width);
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
