<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Layout class="flex justify-center items-center h-100vh">
    <div class="error-message z-10">
      <img src="@/assets/images/404.svg" class="w-130" />

      <p class="text-lg mt-8 dark:text-white">
        {{ t('common.404Message') }}
      </p>

      <BackHomeButton />
    </div>
  </Layout>
</template>

<route lang="yaml">
meta:
  layout: ErrorLayout
</route>
