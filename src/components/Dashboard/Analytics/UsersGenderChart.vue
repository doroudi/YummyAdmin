<script setup lang="ts">
const registersSource = ref<any[]>([
  { name: 'Male', value: 1500 },
  { name: 'Female', value: 1400 },
  { name: 'Unknown', value: 820 },
])
const { t } = useI18n()
</script>

<template>
  <Card class="p-2" :title="t('dashboard.summary')">
    <DonutChart :data="registersSource" />
  </Card>
</template>

<style scoped></style>
