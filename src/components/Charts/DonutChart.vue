<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { ref } from 'vue'

const donutChartOptions = ref({
  chart: {
    type: 'donut',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
    position: 'right',
    offsetX: -30,
    offsetY: 20,
    formatter: (value: any, opts: any): any => {
      return `${value} - ${opts.w.globals.series[opts.seriesIndex]}`
    },
    markers: {
      onClick: undefined,
      offsetX: 0,
      offsetY: 25,
    },
  },
  labels: ['Tech', 'Cloth', 'HH', 'Food'],
  stroke: {
    width: 0,
    show: false,
    curve: 'smooth',
    lineCap: 'round',
  },
  colors: ['var(--primary-color)', 'var(--primary-color-shade1)', 'var(--primary-color-shade2)', 'var(--primary-color-shade3)'],
  grid: {
    padding: {
      right: -20,
      bottom: -8,
      left: -20,
    },
  },
  plotOptions: {
    pie: {
      borderRadius: 10,
      startAngle: -20,
      donut: {
        borderRadius: 10,
        labels: {
          show: true,
          name: {
            offsetY: 15,
          },
          value: {
            offsetY: -15,
            formatter(t: string): any {
              return ''.concat(Number.parseInt(t).toString(), '%')
            },
          },
          total: {
            show: true,
            offsetY: 15,
            label: 'Sells',
            formatter() {
              return '100%'
            },
          },
        },
      },
    },
  },
  responsive: [{
    breakpoint: 1325,
    options: {
      chart: {
        height: 150,
      },
    },
  }, {
    breakpoint: 1200,
    options: {
      chart: {
        height: 120,
      },
    },
  }, {
    breakpoint: 1045,
    options: {
      chart: {
        height: 200,
      },
    },
  }, {
    breakpoint: 992,
    options: {
      chart: {
        height: 250,
      },
    },
  }],
},
)

const donutSeries = ref(
  [30, 40, 20, 10],
)
</script>

<template>
  <VueApexCharts :series="donutSeries" height="180" :options="donutChartOptions" />
</template>

<style lang="scss" scoped>

</style>
