<script setup lang="ts">
import { storeToRefs } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

const store = useDashboardStore()
const { revenueStat } = storeToRefs(store)
const period = ref('day')

onMounted(() => {
  store.getRevenueStat(period.value)
})
const chartOptions = {
  chart: {
    type: 'area',
    sparkline: {
      enabled: true,
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  stroke: {
    width: 2,
    curve: 'smooth',
  },

  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      gradientToColors: ['var(--main-content)', 'var(--primary-color)'],
      type: 'vertical',
      shadeIntensity: 0,
      opacityFrom: 0.3,
      opacityTo: 0.1,
    },
  },
  colors: ['var(--primary-color)'],
  grid: {
    padding: {
      top: 0,
      bottom: 10,
      left: 0,
      right: 0,
    },
  },
  tooltip: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
}
const series = ref([{ data: [] }])
watch(
  () => revenueStat.value,
  () => {
    series.value = [
      {
        data: revenueStat.value,
      },
    ]
  },
)

watch(
  () => period.value,
  () => {
    store.getRevenueStat(period.value)
  },
)

const { t } = useI18n()
</script>

<template>
  <div class="p-2">
    <Card stretch-height title-size="normal" :title="t('dashboard.revenueChart.title')">
      <div class="h-full flex flex-col justify-between">
        <div>
          <p class="text-xsm text-coolgray font-light pb-2">
            {{ t('dashboard.revenueChart.subtitle') }}
          </p>
        </div>

        <SwitchSelect
          v-model:value="period"
          :ranges="[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]"
        />
        <div v-if="revenueStat.length > 0" class="-mx-4">
          <VueApexCharts type="area" width="100%" height="150" :options="chartOptions" :series="series" />
        </div>
      </div>
    </Card>
  </div>
</template>

<style lang="scss"></style>
