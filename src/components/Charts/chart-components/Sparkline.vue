<script setup lang="ts">
import { ChartSparkline } from '~/components/ui/charts'
import { resolveCssColor } from '~/components/ui/charts/useChartTheme'

interface Props {
  data: number[]
  color?: string
  /** Box width. Numbers become px; strings pass through (e.g. `'190px'`, `'100%'`). */
  width?: number | string
  height?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'var(--primary-color)',
  width: 200,
  height: 50,
})

// ECharts paints on a canvas, so `var(--primary-color)` has to be resolved to
// a concrete colour before it reaches the option.
const strokeColor = computed(() => resolveCssColor(props.color))

const boxStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))
</script>

<template>
  <div class="chart-sparkline" :style="boxStyle">
    <ChartSparkline :data="data" :color="strokeColor" :height="height" />
  </div>
</template>

<style scoped>
.chart-sparkline {
  display: inline-block;
  min-width: 0;
}
</style>
