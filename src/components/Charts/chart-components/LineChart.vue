<script setup lang="ts">
import BaseChart from './BaseChart.vue'
import type { ChartData } from '~/models/ChartData'
import type { ChartLegendPosition, ChartOption } from '~/models/ChartsProps'

interface Props {
  data?: ChartData | null
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
  height: 400,
  loading: false,
  error: null,
  options: null,
  // Cartesian charts have always rendered without a legend here; pass
  // `show-legend` to turn one on.
  showLegend: false,
  legendPosition: 'bottom',
})
</script>

<template>
  <BaseChart type="line" v-bind="$attrs" :data="data" :colors="colors" :color-scheme="colorScheme" :height="height"
    :loading="loading" :error="error" :options="options" :show-legend="showLegend" :legend-position="legendPosition" />
</template>
