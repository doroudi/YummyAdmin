<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import type { ChartData } from '../../models/ChartData'

interface Props {
  data: ChartData
  colors: string[]
  height: number
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => [
    'var(--primary-color)',
    'var(--primary-color-shade1)',
    'var(--primary-color-shade2)',
  ],
  height: 480,
})
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
    categories: props.data.labels,
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
  colors: props.colors,
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
  responsive: [
    {
      breakpoint: 992,
      options: {
        plotOptions: {
          bar: {
            columnWidth: '29%',
            borderRadius: 3,
          },
          distributed: true,
        },
        chart: {
          height: 250,
        },
      },
    },
  ],
})
</script>

<template>
  <VueApexCharts type="bar" :options="chartOptions" :height="height" :series="data.series" />
</template>

<style lang="scss" scoped>

</style>
