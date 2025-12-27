<script setup lang="ts">
import BaseChart from './BaseChart.vue'

interface Props {
  data: any[]
  colorScheme?: string
  colors: string[]
  showLegend?: boolean
  legendPosition?: 'bottom' | 'right' | 'left'
}
const props = withDefaults(defineProps<Props>(), {
  showLegend: true,
  legendPosition: 'bottom',
})
</script>

<template>
  <BaseChart v-bind="$attrs" :data="data" :show-legend="showLegend" :loading="loading" :legend-position="legendPosition"
    type="pie" :height="height" :colors="colors" />
</template>
