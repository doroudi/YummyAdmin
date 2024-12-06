<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const chartOptions = ref({
  chart: {
    stacked: true,
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  grid: {
    padding: {
      top: -20,
      bottom: -10,
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    labels: {
      style: {
        colors: '#6E6B7B',
        fontSize: '0.86rem',
      },
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  colors: buildThemeSeries(),
  plotOptions: {
    bar: {
      columnWidth: '17%',
      borderRadius: 5,
    },
    distributed: true,
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6E6B7B',
        fontSize: '0.86rem',

      },
    },
  },
})

const series = ref([
  {
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 6, 70],
  },
  {
    name: 'series-2',
    data: [3, 4, 15, 5, 4, 60, 10],
  },
])

function buildThemeSeries() {
  return ['#3db9af', '#37938d', '#276e6b', '#7fcdca']
}
</script>

<template>
  <VueApexCharts type="bar" :options="chartOptions" height="460" :series="series" />
</template>

<style lang="scss" scoped>

</style>
