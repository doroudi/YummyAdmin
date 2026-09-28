<!--
  Vendored from the uipkge registry - https://uipkge.dev/vue/charts/pie-chart
  MIT licensed. Adapted for YummyAdmin: UnoCSS instead of Tailwind, and the
  theme tokens wired to this project's SCSS variables (see ../useChartTheme.ts).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart as EChartsPieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { cn } from '~/common/utils/cn'
import { chartColors, chartTooltipBg, chartTooltipBorder, chartTooltipText } from '../useChartTheme'

use([CanvasRenderer, EChartsPieChart, TooltipComponent, LegendComponent])

interface Props {
  data: Record<string, any>[]
  nameField?: string
  valueField?: string
  height?: number | string
  donut?: boolean
  option?: any
  class?: string
  /** Accessible name announced for the chart image. Defaults to "Chart". */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  nameField: 'name',
  valueField: 'value',
  height: 300,
  donut: false,
})

const mergedOption = computed(() => {
  const chartData = props.data.map((d) => ({
    name: d[props.nameField!],
    value: d[props.valueField!],
  }))

  const series = [
    {
      type: 'pie',
      radius: props.donut ? ['45%', '70%'] : '65%',
      center: ['50%', '45%'],
      itemStyle: { borderWidth: 0 },
      label: { show: false },
      data: chartData,
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
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { fontSize: 11 },
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
