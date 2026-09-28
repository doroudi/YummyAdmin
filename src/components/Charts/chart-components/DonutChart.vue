<script setup lang="ts">
import BaseChart from './BaseChart.vue'
import type { SimpleChartSeries } from '~/models/ChartData'
import type { ChartLegendPosition, ChartOption } from '~/models/ChartsProps'

interface Props {
  data?: SimpleChartSeries[] | null
  colors?: string[] | null
  colorScheme?: string | null
  height?: number | string
  loading?: boolean
  error?: string | null
  options?: ChartOption | null
  showLegend?: boolean
  legendPosition?: ChartLegendPosition
}

withDefaults(defineProps<Props>(), {
  data: null,
  colors: null,
  colorScheme: null,
  height: 300,
  loading: false,
  error: null,
  options: null,
  showLegend: true,
  legendPosition: 'bottom',
})
</script>

<template>
  <BaseChart type="donut" v-bind="$attrs" :data="data" :colors="colors" :color-scheme="colorScheme" :height="height"
    :loading="loading" :error="error" :options="options" :show-legend="showLegend" :legend-position="legendPosition" />
</template>
