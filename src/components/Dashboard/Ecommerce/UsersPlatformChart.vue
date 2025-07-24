<script setup lang="ts">
const registersSource = ref<any[]>([
  { name: 'Android', value: 2000 },
  { name: 'Windows', value: 500 },
  { name: 'iOS', value: 820 },
])
const total = computed(() =>
  registersSource.value.reduce((a, b) => a + b.value, 0),
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
    <DonutChart :data="registersSource" color-scheme="#4FC3F7" legend-position="bottom" />
  </Card>
</template>

<style scoped></style>
