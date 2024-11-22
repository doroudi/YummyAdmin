<script setup lang="ts">
</script>

<template>
  <n-page-header class="p-2 navbar">
    <template #extra>
      <div class="flex items-center">
        <ThemeSwitch class="mx-4" />
        <LanguageSelect class="mx-4" />
        <UserProfile class="mx-4" />
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
