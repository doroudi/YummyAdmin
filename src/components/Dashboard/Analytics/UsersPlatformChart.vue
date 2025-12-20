<script setup lang="ts">
const registersSource = ref<any[]>([
  { name: 'Desktop', value: 1800 },
  { name: 'Mobile', value: 5001 },
  { name: 'Tablet', value: 50 },
  { name: 'Others', value: 12 },
])

const total = computed(() =>
  registersSource.value.reduce((a: any, b: any) => a + b.value, 0),
)
const { t } = useI18n()
</script>

<template>
  <Card stretch-height class="p-2" title-small :title="t('dashboard.userPlatforms.title')">
    <h3 class="text-3xl font-bold">
      <n-number-animation :from="0" :to="total" />
    </h3>
    <p class="text-xsm text-coolgray font-light pb-2">
      {{ t('dashboard.userPlatforms.subtitle') }}
    </p>
    <DonutChart :data="registersSource" color-scheme="#FFCC00" legend-position="bottom" />
  </Card>
</template>

<style scoped></style>
