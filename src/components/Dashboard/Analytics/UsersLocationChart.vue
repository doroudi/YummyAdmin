<script setup lang="ts">
import 'vue3-map-chart/dist/style.css'
import { storeToRefs } from 'pinia'
import { MapChart } from 'vue3-map-chart'
import type { MapData } from 'vue3-map-chart/types/types'
import type { LocationChartSeries } from '~/models/ChartData'

const { t } = useI18n()
const store = useDashboardStore()
const { usersLocationData, isLoading } = storeToRefs(store)
const locationData = computed(() => {
  if (!usersLocationData.value) return {}
  return arrayToKeyValue(usersLocationData.value!)
})
onMounted(() => {
  store.getLocationStat()
})

function arrayToKeyValue(arr: LocationChartSeries[]) {
  return arr.reduce((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {} as MapData)
}

function onMapItemClick(areaId: string) {
  if (areaId === 'IR') window.open('https://www.visitiran.ir/')
}
</script>

<template>
  <Card class="p-2" :title="t('dashboard.locationChart.title')">
    <MapChart
      v-if="!isLoading" :data="locationData" base-color="var(--primary-color)"
      @map-item-click="onMapItemClick"
    />
  </Card>
</template>

<style lang="scss" scoped>

</style>
