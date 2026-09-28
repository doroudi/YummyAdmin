<!--
  Vendored from the uipkge registry - https://uipkge.dev/vue/charts/donut-chart
  MIT licensed. Adapted for YummyAdmin: UnoCSS instead of Tailwind, and the
  theme tokens wired to this project's SCSS variables (see ../useChartTheme.ts).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart as EChartsPieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
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

use([CanvasRenderer, EChartsPieChart, TooltipComponent, LegendComponent, TitleComponent])

interface Props {
  data: { name: string; value: number }[]
  /** 'full' ring or 'half' semicircle gauge. Default 'full'. */
  type?: 'full' | 'half'
  /** Ring thickness as a fraction of the outer radius (0 = filled pie). Default 0.32. */
  thickness?: number
  /** Segment corner rounding in px. Default 6. */
  rounded?: number
  /** Gap between segments in degrees. Default 2. */
  gap?: number
  /** Show the summed total in the centre. Default true. */
  showTotal?: boolean
  /** Centre label override (replaces the auto total). */
  centerLabel?: string
  height?: number | string
  option?: any
  class?: string
  /** Accessible name announced for the chart image. Defaults to "Chart". */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'full',
  thickness: 0.32,
  rounded: 6,
  gap: 2,
  showTotal: true,
  height: 300,
})

const total = computed(() => props.data.reduce((s, d) => s + d.value, 0))
const summary = computed(() => props.centerLabel ?? String(total.value))

const mergedOption = computed(() => {
  const half = props.type === 'half'
  const outer = half ? 82 : 78
  const inner = Math.max(0, +(outer * (1 - Math.max(0, Math.min(0.95, props.thickness)))).toFixed(1))
  const series = [
    {
      type: 'pie',
      radius: [`${inner}%`, `${outer}%`],
      center: half ? ['50%', '68%'] : ['50%', '46%'],
      startAngle: half ? 180 : 90,
      endAngle: half ? 360 : undefined,
      padAngle: props.gap,
      itemStyle: { borderRadius: props.rounded, borderColor: chartTooltipBg.value, borderWidth: 2 },
      label: { show: !half, color: chartTextColor.value, fontSize: 11 },
      labelLine: { show: !half, lineStyle: { color: chartTextColor.value } },
      emphasis: { scale: true, scaleSize: 3 },
      data: props.data,
    },
  ]
  const userOption: any = props.option ?? {}
  const { series: userSeries, tooltip: userTooltip, legend: userLegend, title: userTitle, ...userRest } = userOption
  const mergedSeries = Array.isArray(userSeries) ? series.map((s, i) => ({ ...s, ...(userSeries[i] ?? {}) })) : series
  return {
    color: chartColors.value,
    title: props.showTotal
      ? mergeOptionBlock(
          {
            text: summary.value,
            left: 'center',
            top: half ? '62%' : '42%',
            textStyle: { fontSize: 26, fontWeight: 700, color: chartTextColor.value },
          },
          userTitle,
        )
      : undefined,
    tooltip: mergeOptionBlock(
      {
        trigger: 'item',
        backgroundColor: chartTooltipBg.value,
        borderColor: chartTooltipBorder.value,
        textStyle: { color: chartTooltipText.value, fontSize: 12 },
        valueFormatter: (v: any) => `${v} (${((v / (total.value || 1)) * 100).toFixed(1)}%)`,
      },
      userTooltip,
    ),
    legend: mergeOptionBlock(
      {
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: { fontSize: 11, color: chartTextColor.value },
      },
      userLegend,
    ),
    series: mergedSeries,
    ...userRest,
  }
})
</script>

<template>
  <div
    role="img"
    tabindex="0"
    :aria-label="ariaLabel || `Donut chart, total ${total}`"
    :style="{ height: /^\d+$/.test(String(height)) ? `${height}px` : String(height) }"
    :class="cn('w-full focus-visible:ring-2 focus-visible:outline-none', props.class)"
  >
    <VChart :option="mergedOption" :autoresize="true" class="w-full h-full" />
  </div>
</template>
