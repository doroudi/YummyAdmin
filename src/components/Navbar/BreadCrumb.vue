<script lang="ts" setup>
const route = useRoute()
const { t } = useI18n()
</script>

<template>
  <n-breadcrumb class="hidden md:block">
    <n-breadcrumb-item>
      <RouterLink to="/">
        {{ t('home') }}
      </RouterLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item v-for="item in route.meta.breadcrumb" :key="item">
      {{ t(`menu.${item}`) }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
