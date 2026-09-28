<script setup lang="ts">
import type { ChartData, SimpleChartSeries } from '~/models/ChartData'
import type {
  ChartLegendPosition,
  ChartOption,
  ChartType,
  ChartProps,
  SimpleChartProps,
} from '~/models/ChartsProps'
import {
  AreaChart as UipkgeAreaChart,
  BarChart as UipkgeBarChart,
  DonutChart as UipkgeDonutChart,
  LineChart as UipkgeLineChart,
  PieChart as UipkgePieChart,
  PolarBarChart as UipkgePolarBarChart,
  RadarChart as UipkgeRadarChart,
} from '~/components/ui/charts'
import { cn } from '~/common/utils/cn'

const { t } = useI18n()

type LocalChartProps = {
  data?: ChartData | SimpleChartSeries[] | null
  colors?: string[] | null
  colorScheme?: string | null
  height?: number | string
  type?: ChartType
  error?: string | null
  options?: ChartOption | null
  showLegend?: boolean
  loading?: boolean
  legendPosition?: ChartLegendPosition
}

const props = withDefaults(defineProps<LocalChartProps>(), {
  data: null,
  colors: null,
  colorScheme: null,
  height: 400,
  type: 'line',
  error: null,
  options: null,
  showLegend: true,
  loading: false,
  legendPosition: 'bottom',
})

/** Numbers become px; strings pass through, so `height="100%"` works. */
const heightStyle = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height,
)

// `ChartData` drives the cartesian wrappers, `SimpleChartSeries[]` the
// share-of-total ones. Both models are built unconditionally (they are just
// computeds) and the template picks the matching one.
const isSimpleData = computed(() => Array.isArray(props.data))

const cartesian = useChartOptions(props as unknown as ChartProps)
const simple = useSimpleChartOptions(props as unknown as SimpleChartProps)

// `any` is deliberate: the runtime component is one of several wrappers with
// different required props, and `chartProps` is built to match whichever one is
// picked. A union type here would make `v-bind` unprovable for all of them.
const chartComponent = computed<any>(() => {
  if (isSimpleData.value) {
    switch (props.type) {
      case 'donut':
        return UipkgeDonutChart
      case 'polarArea':
        return UipkgePolarBarChart
      default:
        return UipkgePieChart
    }
  }

  switch (props.type) {
    case 'area':
      return UipkgeAreaChart
    case 'bar':
      return UipkgeBarChart
    case 'radar':
      return UipkgeRadarChart
    default:
      return UipkgeLineChart
  }
})

const chartProps = computed<Record<string, any>>(() => {
  const height = props.height
  const common = { height }

  if (isSimpleData.value) {
    const option = simple.chartOption.value
    const data = simple.simpleData.value

    return props.type === 'polarArea'
      ? {
          ...common,
          data: data.map((item: { name: string; value: number }) => ({
            category: item.name,
            value: item.value,
          })),
          option,
        }
      : { ...common, data, option }
  }

  const option = cartesian.chartOption.value

  if (props.type === 'radar') {
    return {
      ...common,
      data: cartesian.radarData.value,
      indicators: cartesian.radarIndicators.value,
      option,
    }
  }

  return {
    ...common,
    data: cartesian.rows.value,
    xField: 'x',
    yField: cartesian.fields.value,
    option,
  }
})

const hasData = computed(() =>
  isSimpleData.value ? simple.showChart.value : cartesian.showChart.value,
)

// A single object `v-bind` is required - two `v-bind` (one with no argument)
// on the same element is a compile error. Caller attributes win, and their
// class is merged rather than replaced.
const attrs = useAttrs()

const chartBindings = computed(() => ({
  ...chartProps.value,
  ...attrs,
  class: cn('chart-component', attrs.class as string | undefined),
}))
</script>

<template>
    <div class="chart-container">
        <div v-if="loading" class="chart-loading">
            <div class="loading-spinner"></div>
            <p class="loading-text">{{ t('charts.loading') }}</p>
        </div>

        <div v-else-if="error" class="chart-error">
            <div class="error-icon">⚠️</div>
            <p class="error-text">{{ error }}</p>
            <button v-if="$slots['error-action']" class="error-action" @click="$emit('error-action')">
                <slot name="error-action"></slot>
            </button>
        </div>

        <div v-else-if="!hasData" class="chart-no-data">
            <div class="no-data-icon">📊</div>
            <p class="no-data-text">{{ t('charts.notData') }}</p>
        </div>

        <div v-else class="chart-wrapper">
            <component :is="chartComponent" v-bind="chartBindings" />
        </div>

        <div v-if="$slots.footer" class="chart-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    min-height: 200px;
}

.chart-loading,
.chart-error,
.chart-no-data,
.chart-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: v-bind(heightStyle);
    border-radius: var(--border-radius);
    ;
    padding: 2rem;
    text-align: center;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e0e0e0;
    border-top-color: var(--primary-color, #7367f0);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-text,
.error-text,
.no-data-text {
    color: #6E6B7B;
    margin: 0.5rem 0;
    font-size: 0.875rem;
}

.error-icon,
.no-data-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.error-action {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: var(--primary-color, #7367f0);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 0.875rem;
    transition: opacity 0.2s;
}

.error-action:hover {
    opacity: 0.9;
}

.chart-wrapper {
    position: relative;
    transition: opacity 0.3s ease;
}

.chart-component {
    width: 100%;
}

.chart-footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
    font-size: 0.75rem;
    color: #6E6B7B;
    text-align: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {

    .chart-loading,
    .chart-error,
    .chart-no-data,
    .chart-fallback {
        height: auto;
        min-height: 200px;
        padding: 1rem;
    }
}
</style>
