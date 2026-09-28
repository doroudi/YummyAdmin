<!--
  Vendored from the uipkge registry - https://uipkge.dev/vue/charts/radar-chart
  MIT licensed. Adapted for YummyAdmin: UnoCSS instead of Tailwind, and the
  theme tokens wired to this project's SCSS variables (see ../useChartTheme.ts).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart as EChartsRadarChart } from 'echarts/charts'
import { RadarComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '~/common/utils/cn'
import { chartColors, chartTooltipBg, chartTooltipBorder, chartTooltipText } from '../useChartTheme'

use([CanvasRenderer, EChartsRadarChart, RadarComponent, TooltipComponent, LegendComponent])

interface Props {
  indicators: { name: string; max: number }[]
  data: { name: string; value: number[] }[]
  height?: number | string
  option?: any
  class?: string
  /** Accessible name announced for the chart image. Defaults to "Chart". */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: 300,
})

const mergedOption = computed(() => {
  const series = [
    {
      type: 'radar',
      data: props.data.map((d, i) => ({
        ...d,
        itemStyle: { color: chartColors.value[i % chartColors.value.length] },
        areaStyle: { opacity: 0.15 },
        lineStyle: { width: 2 },
      })),
    },
  ]

  // Per-index series merge — partial overrides keep computed `type`/`data`.
  const userOption: any = props.option ?? {}
  const { series: userSeries, ...userRest } = userOption
  const mergedSeries = Array.isArray(userSeries) ? series.map((s, i) => ({ ...s, ...(userSeries[i] ?? {}) })) : series

  return {
    color: chartColors.value,
    tooltip: {
      trigger: 'item',
      backgroundColor: chartTooltipBg.value,
      borderColor: chartTooltipBorder.value,
      textStyle: { color: chartTooltipText.value, fontSize: 12 },
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { fontSize: 11 },
    },
    radar: {
      indicator: props.indicators,
      radius: '60%',
      center: ['50%', '45%'],
      axisName: { fontSize: 11 },
      splitArea: { areaStyle: { color: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)'] } },
    },
    series: mergedSeries,
    ...userRest,
  }
})
</script>

<template>
  <div
    role="img"
    tabindex="0"
    :aria-label="ariaLabel || 'Chart'"
    :style="{ height: /^\d+$/.test(String(height)) ? `${height}px` : String(height) }"
    :class="cn('w-full focus-visible:ring-2 focus-visible:outline-none', props.class)"
  >
    <VChart :option="mergedOption" :autoresize="true" class="w-full h-full" />
  </div>
</template>
