<script setup lang="ts">
</script>

<template>
  <n-page-header class="px-2 py-3 navbar">
    <template #extra>
      <div class="flex items-center">
        <ThemeSwitch class="mx-1.5" />
        <LanguageSelect class="mx-1.5" />
        <Notifications class="mx-1.5" />
        <UserProfile class="mx-1.5" />
      </div>
    </template>
  </n-page-header>
</template>

<style lang="scss">
.navbar {
  border-bottom: solid 1px #ececec;
  padding-bottom: 0.4rem;
}

.dark {
  .navbar {
    border-bottom-color: #2f3339;
  }
}
</style>
