<!--
  Vendored from the uipkge registry - https://uipkge.dev/vue/charts/raw-chart
  MIT licensed. Adapted for YummyAdmin: UnoCSS instead of Tailwind, and the
  theme tokens wired to this project's SCSS variables (see ../useChartTheme.ts).
-->
<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { cn } from '~/common/utils/cn'

// Raw escape hatch. The opinionated wrappers (AreaChart, BarChart,
// FunnelChart, ...) cover the common cases with sensible defaults +
// a `data` prop. When you need a chart type they don't wrap
// (Sankey, Sunburst, Graph, Candlestick, ThemeRiver, Tree, Parallel,
// Custom) -- or when you need a level of customisation the wrappers
// can't expose without leaking ECharts internals -- reach for this
// component and pass a complete ECharts option object.
//
// You're responsible for `use()`-registering the chart types and
// components you need before this component renders. The canvas
// renderer is registered here so you don't have to:
//
//   import { use } from 'echarts/core'
//   import { SankeyChart } from 'echarts/charts'
//   import { TooltipComponent, LegendComponent } from 'echarts/components'
//   import { RawChart } from '@/components/ui/charts'
//
//   use([SankeyChart, TooltipComponent, LegendComponent])
//
//   const option = { /* full ECharts option for sankey */ }
//
//   <RawChart :option="option" :height="400" />
//
// Theme tokens (chartColors, chartTextColor, chartTooltipBg, etc.)
// are exported from `useChartTheme.ts` -- import and weave them into
// your option for visual consistency with the rest of the registry's
// charts.

use([CanvasRenderer])

withDefaults(
  defineProps<{
    option: any
    height?: number | string
    /** Auto-resize on container width change. Default true. */
    autoresize?: boolean
    class?: string
    /** Accessible name announced for the chart image. Defaults to "Chart". */
    ariaLabel?: string
  }>(),
  { height: 300, autoresize: true },
)
</script>

<template>
  <div
    role="img"
    tabindex="0"
    :aria-label="ariaLabel || 'Chart'"
    :style="{ height: /^\d+$/.test(String(height)) ? `${height}px` : String(height) }"
    :class="cn('w-full focus-visible:ring-2 focus-visible:outline-none', $props.class)"
  >
    <VChart :option="option" :autoresize="autoresize" class="w-full h-full" />
  </div>
</template>
