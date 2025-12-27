<script setup lang="ts">
import type { ChartData } from '~/models/ChartData'
import BaseChart from './BaseChart.vue'

interface Props {
  data: ChartData
  colorScheme?: string
  colors: string[]
  showLegend?: boolean
  legendPosition?: 'bottom' | 'right' | 'left'
}
const props = withDefaults(defineProps<Props>(), {
  showLegend: true,
  legendPosition: 'bottom',
})

// const options = {
//     yaxis: {

//     },
// }
</script>

<template>
    <BaseChart v-bind="$attrs" :data="data" :show-legend="showLegend" :loading="loading"
        :legend-position="legendPosition" type="radar" :height="height" :colors="colors" />
</template>
