<script setup lang="ts">
const registersSource = ref<any[]>([
  { name: 'Android', value: 2000 },
  { name: 'Windows', value: 500 },
  { name: 'iOS', value: 820 },
])
const { t } = useI18n()
</script>

<template>
  <Card class="p-2" :title="t('dashboard.summary')">
    <DonutChart :data="registersSource" color-scheme="#4FC3F7" />
  </Card>
</template>

<style scoped></style>
