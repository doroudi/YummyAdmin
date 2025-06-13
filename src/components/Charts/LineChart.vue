<script lang="ts" setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const barChartOptions = ref({
  chart: {
    type: 'line',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  grid: {
    borderColor: '#ccc',
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    padding: {
      top: -30,
      bottom: -10,
    },
  },
  stroke: {
    width: 3,
  },
  colors: ['var(--primary-color)'],
  markers: {
    size: 3,
    colors: ['var(--primary-color)'],
    strokeColors: ['var(--primary-color)'],
    strokeWidth: 3,
    strokeOpacity: 1,
    strokeDashArray: 0,
    fillOpacity: 1,
    shape: 'circle',
    radius: 2,
    hover: {
      size: 6,
    },
  },
  xaxis: {
    labels: {
      show: true,
      style: {
        fontSize: '0px',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  tooltip: {
    x: {
      show: false,
    },
  },
})

const series = ref([
  {
    name: 'series-1',
    data: [30, 12, 35, 25, 49, 51, 39, 55],
  },
])
</script>

<template>
  <VueApexCharts type="line" height="180" :options="barChartOptions" :series="series" />
</template>

<style lang="scss" scoped>

</style>
