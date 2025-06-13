<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

interface Props {
  data: number[]
  color: string
  width?: number
}
const props = withDefaults(defineProps<Props>(), { width: 200 })

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
      gradientToColors: ['var(--main-content)', props.color],
      type: 'vertical',
      shadeIntensity: 0,
      opacityFrom: 0.3,
      opacityTo: 0.1,
    },
  },
  colors: [props.color],
  grid: {
    padding: {
      top: 10,
      bottom: 5,
      left: 10,
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

const series = [{ data: props.data }]
</script>

<template>
  <VueApexCharts type="area" :width="width" height="50" :options="chartOptions" :series="series" />
</template>

<style lang="scss" scoped></style>
