<!--
  Vendored from the uipkge registry - https://uipkge.dev/vue/charts/line-chart
  MIT licensed. Adapted for YummyAdmin: UnoCSS instead of Tailwind, and the
  theme tokens wired to this project's SCSS variables (see ../useChartTheme.ts).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart as EChartsLineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '~/common/utils/cn'
import {
  chartColors,
  chartTextColor,
  chartAxisColor,
  chartSplitLineColor,
  chartTooltipBg,
  chartTooltipBorder,
  chartTooltipText,
  mergeOptionBlock,
} from '../useChartTheme'

use([
  CanvasRenderer,
  EChartsLineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
])

interface Props {
  data: Record<string, any>[]
  xField?: string
  yField?: string | string[]
  /** Line interpolation. Default 'smooth'. */
  curve?: 'smooth' | 'linear' | 'step' | 'stepStart' | 'stepEnd'
  /** Stack series cumulatively. Default false. */
  stacked?: boolean
  /** Show point markers. Default true. */
  markers?: boolean
  /** Dashed stroke on all series (forecast look). Default false. */
  dashed?: boolean
  height?: number | string
  option?: any
  class?: string
  /** Accessible name announced for the chart image. Defaults to "Chart". */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  xField: 'x',
  yField: 'y',
  curve: 'smooth',
  stacked: false,
  markers: true,
  dashed: false,
  height: 300,
})

const mergedOption = computed(() => {
  const fields = Array.isArray(props.yField) ? props.yField : [props.yField]
  const xData = props.data.map((d) => d[props.xField!])

  const series = fields.map((field, i) => ({
    name: field,
    type: 'line',
    smooth: props.curve === 'smooth',
    step:
      props.curve === 'step'
        ? 'middle'
        : props.curve === 'stepStart'
          ? 'start'
          : props.curve === 'stepEnd'
            ? 'end'
            : false,
    stack: props.stacked ? 'lines' : undefined,
    symbol: props.markers ? 'circle' : 'none',
    symbolSize: 6,
    lineStyle: { width: 2, type: props.dashed ? 'dashed' : 'solid' },
    itemStyle: { color: chartColors.value[i % chartColors.value.length] },
    data: props.data.map((d) => d[field]),
  }))

  // Per-index series merge + 2-level deep merge for axis blocks.
  const userOption: any = props.option ?? {}
  const {
    series: userSeries,
    xAxis: userXAxis,
    yAxis: userYAxis,
    grid: userGrid,
    tooltip: userTooltip,
    legend: userLegend,
    ...userRest
  } = userOption
  const mergedSeries = Array.isArray(userSeries) ? series.map((s, i) => ({ ...s, ...(userSeries[i] ?? {}) })) : series

  const baseLegend =
    fields.length > 1
      ? {
          bottom: 0,
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          textStyle: { fontSize: 11, color: chartTextColor.value },
        }
      : undefined

  return {
    color: chartColors.value,
    grid: mergeOptionBlock(
      { left: 16, right: 16, top: 24, bottom: fields.length > 1 ? 32 : 24, containLabel: true },
      userGrid,
    ),
    tooltip: mergeOptionBlock(
      {
        trigger: 'axis',
        backgroundColor: chartTooltipBg.value,
        borderColor: chartTooltipBorder.value,
        textStyle: { color: chartTooltipText.value, fontSize: 12 },
      },
      userTooltip,
    ),
    // NOTE (vendored): upstream read `userLegend?.show === false ? undefined : …`,
    // which made "hide the legend" impossible — `undefined` lets ECharts fall
    // back to its own default legend for multi-series charts. Merging instead
    // keeps the wrapper's base legend and honours an explicit `show: false`.
    legend: mergeOptionBlock(baseLegend ?? {}, userLegend),
    xAxis: mergeOptionBlock(
      {
        type: 'category',
        data: xData,
        axisLine: { lineStyle: { color: chartAxisColor.value } },
        axisLabel: { color: chartTextColor.value, fontSize: 11 },
        axisTick: { show: false },
      },
      userXAxis,
    ),
    yAxis: mergeOptionBlock(
      {
        type: 'value',
        splitLine: { lineStyle: { color: chartSplitLineColor.value } },
        axisLabel: { color: chartTextColor.value, fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      userYAxis,
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
    :aria-label="ariaLabel || 'Chart'"
    :style="{ height: /^\d+$/.test(String(height)) ? `${height}px` : String(height) }"
    :class="cn('w-full focus-visible:ring-2 focus-visible:outline-none', props.class)"
  >
    <VChart :option="mergedOption" :autoresize="true" class="w-full h-full" />
  </div>
</template>
