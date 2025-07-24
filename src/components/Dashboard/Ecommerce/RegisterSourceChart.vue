<script setup lang="ts">
const registersSource = ref<any[]>([
  { name: 'Email', value: 60 },
  { name: 'Google', value: 120 },
  { name: 'Apple', value: 10 },
])
const { t } = useI18n()
const total = computed(() =>
  registersSource.value.reduce((a: any, b: any) => a + b.value, 0),
)
</script>

<template>
  <Card stretch-height class="p-2" title-small :title="t('dashboard.registerSource.title')">
    <h3 class="text-3xl font-bold">
      <n-number-animation :from="0" :to="total" />
    </h3>
    <p class="text-xsm text-coolgray font-light pb-2">
      {{ t('dashboard.registerSource.subtitle') }}
    </p>
    <DonutChart :data="registersSource" color-scheme="#DB0B51" />
  </Card>
</template>