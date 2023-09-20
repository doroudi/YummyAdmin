<script setup lang="ts">
const collapsed = ref(false)
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered collapse-mode="width" :collapsed-width="64" :width="300" :collapsed="collapsed" show-trigger
      @collapse="collapsed = true" @expand="collapsed = false"
    >
      <Sidebar />
    </n-layout-sider>
    <n-layout-content>
      <div class="main-content dark:text-white">
        <Navbar />
        <RouterView />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style lang="scss">
.n-layout-content {
  height: 100vh !important;
}
// .main {
//   // padding-left: var(--sidebar-width);
//   padding-right: 1rem;
//   transition: all 0.3s ease-in;

//   &.sidebar-collapsed {
//     padding-left: 5rem;
//     padding-right: 1rem;
//   }
// }

// .rtl {
//   .main {
//     padding-right: var(--sidebar-width);
//     padding-left: 1rem;

//     &.sidebar-collapsed {
//       padding-right: 5rem;
//       padding-left: 1rem;
//     }
//   }
// }
</style>
