<script setup lang="ts">
const registersSource = ref<any[]>([
  //TODO: use translations
  { name: 'Desktop', value: 4321 },
  { name: 'Mobile', value: 5001 },
  { name: 'Tablet', value: 1112 },
  { name: 'Unknown', value: 880 },
])

const total = computed(() =>
  registersSource.value.reduce((a: any, b: any) => a + b.value, 0),
)
const { t } = useI18n()

const legendPosition = computed(() =>
  useLayoutStore().isRtl ? 'left' : 'right',
)
</script>

<template>
  <Card stretch-height class="p-2" title-small :title="t('dashboard.userPlatforms.title')">
    <h3 class="text-3xl font-bold">
      <n-number-animation :from="0" :to="total" />
    </h3>
    <p class="text-xsm text-coolgray font-light pb-2">
      {{ t('dashboard.userPlatforms.subtitle') }}
    </p>
    <DonutChart height="200" 
      show-legend
      :colors="['#da2c38', '#226f54', '#87c38f', '#f4f0bb']"
      :data="registersSource" 
      :legend-position="legendPosition" />
  </Card>
</template>

<style scoped></style>
