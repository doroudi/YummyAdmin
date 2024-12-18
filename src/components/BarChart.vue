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
  colors: ['var(--primary-color)', ...buildThemeSeries()],
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
  return createThemeColors(useLayoutStore().themeColor, 4)
}

function createThemeColors(color, count) {
  const result = []
  for (let i = 0; i < count; i++)
    result.push(makeLighter(color))

  return result
}

function makeLighter(color) {
  const colorHex = color.replace('#', '')
  const colorR = Number.parseInt(colorHex.substring(0, 2), 16)
  const colorG = Number.parseInt(colorHex.substring(2, 4), 16)
  const colorB = Number.parseInt(colorHex.substring(4, 6), 16)
  const lighterColor = `rgba(${colorR}, ${colorG}, ${colorB}, .4)`
  return lighterColor
}
</script>

<template>
  <VueApexCharts type="bar" :options="chartOptions" height="460" :series="series" />
</template>

<style lang="scss" scoped>

</style>
