<script setup lang="ts">
const registersSource = ref<any[]>([
  { name: 'Email', value: 60 },
  { name: 'Google', value: 120 },
  { name: 'Apple', value: 10 },
])
const { t } = useI18n()
</script>

<template>
  <Card class="p-2" :title="t('dashboard.summary')">
    <DonutChart :data="registersSource" color-scheme="#DB0B51" />
  </Card>
</template>

<style scoped></style>
