<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

interface Props {
  data: number[]
}
const props = defineProps<Props>()

const chartOptions = {
  chart: {
    type: 'line',
    sparkline: {
      enabled: true,
    },
    group: 'sparks',
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
      shade: 'dark',
      gradientToColors: ['var(--primary-color-shade2)'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100],
    },
  },
  colors: ['var(--primary-color)'],

  grid: {
    padding: {
      top: 5,
      bottom: 5,
      left: 80,
      right: 20,
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
  <VueApexCharts type="line" height="50" :options="chartOptions" :series="series" />
</template>

<style lang="scss" scoped></style>
