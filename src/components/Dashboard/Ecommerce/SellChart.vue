<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

const revenueFlow = [100, 500, 480, 590, 780, 900, 880]

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

const series = [{ data: revenueFlow }]
const period = ref('day')
</script>

<template>
  <div class="p-2">
    <Card stretch-height title-size="normal" title="Revenue">
      <div class="h-full flex flex-col justify-between">
        <div>
          <p class="text-xsm text-coolgray font-light pb-2">
            Total Registered users
          </p>
        </div>

        <div class="flex justify-center">
          <n-radio-group v-model:value="period" size="small" name="radiobuttongroup1">
            <n-radio-button value="day" label="Day" />
            <n-radio-button value="week" label="Week" />
            <n-radio-button value="month" label="Month" />
          </n-radio-group>
        </div>
        <div class="-mx-4">
          <VueApexCharts type="area" width="100%" height="150" :options="chartOptions" :series="series" />
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped></style>
