<!--
  Vendored from the uipkge registry - https://uipkge.dev/vue/charts/polar-bar-chart
  MIT licensed. Adapted for YummyAdmin: UnoCSS instead of Tailwind, and the
  theme tokens wired to this project's SCSS variables (see ../useChartTheme.ts).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart as EChartsBarChart } from 'echarts/charts'
import { PolarComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '~/common/utils/cn'
import {
  chartColors,
  chartTextColor,
  chartTooltipBg,
  chartTooltipBorder,
  chartTooltipText,
  mergeOptionBlock,
} from '../useChartTheme'

use([CanvasRenderer, EChartsBarChart, PolarComponent, TooltipComponent, LegendComponent])

interface Props {
  data: { category: string; value: number }[]
  height?: number | string
  option?: any
  class?: string
  /** Accessible name announced for the chart image. Defaults to "Chart". */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: 320,
})

const mergedOption = computed(() => {
  const series = [
    {
      type: 'bar',
      coordinateSystem: 'polar',
      data: props.data.map((d) => d.value),
      colorBy: 'data',
      roundCap: true,
      itemStyle: { borderRadius: 6 },
    },
  ]

  const userOption: any = props.option ?? {}
  const {
    series: userSeries,
    polar: userPolar,
    angleAxis: userAngle,
    radiusAxis: userRadius,
    tooltip: userTooltip,
    legend: userLegend,
    ...userRest
  } = userOption
  const mergedSeries = Array.isArray(userSeries) ? series.map((s, i) => ({ ...s, ...(userSeries[i] ?? {}) })) : series

  return {
    color: chartColors.value,
    polar: mergeOptionBlock({ radius: ['18%', '78%'] }, userPolar),
    angleAxis: mergeOptionBlock(
      { type: 'value', startAngle: 90, axisLabel: { color: chartTextColor.value, fontSize: 10 } },
      userAngle,
    ),
    radiusAxis: mergeOptionBlock(
      {
        type: 'category',
        data: props.data.map((d) => d.category),
        axisLabel: { color: chartTextColor.value, fontSize: 11 },
      },
      userRadius,
    ),
    tooltip: mergeOptionBlock(
      {
        trigger: 'item',
        backgroundColor: chartTooltipBg.value,
        borderColor: chartTooltipBorder.value,
        textStyle: { color: chartTooltipText.value, fontSize: 12 },
      },
      userTooltip,
    ),
    // NOTE (vendored): see AreaChart — `undefined` here would hand the legend
    // back to ECharts' defaults instead of honouring `show: false`.
    legend: mergeOptionBlock({ show: false }, userLegend),
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
