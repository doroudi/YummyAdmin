import {
  chartColors,
  resolveCssColor,
} from '~/components/ui/charts/useChartTheme'
import type { SimpleChartSeries } from '~/models/ChartData'
import type { ChartOption, SimpleChartProps } from '~/models/ChartsProps'

/**
 * Builds options for the vendored uipkge share-of-total wrappers
 * (`PieChart`, `DonutChart`, `PolarBarChart`) out of this project's
 * `SimpleChartSeries[]` shape.
 */
export function useSimpleChartOptions(props: SimpleChartProps) {
  const { makeLighter } = useColors()

  const labels = computed(() =>
    Array.isArray(props.data)
      ? props.data.map((item: any) => String(item.name))
      : [],
  )

  const safeSeries = computed<number[]>(() =>
    Array.isArray(props.data)
      ? props.data.map((item: any) => Number(item.value) || 0)
      : [],
  )

  const palette = computed<string[]>(() => {
    if (props.colors && props.colors.length > 0)
      return props.colors.map(resolveCssColor)

    if (props.colorScheme) {
      return (Array.isArray(props.data) ? props.data : []).map((_, i) =>
        makeLighter(props.colorScheme ?? '', 1 - i * 0.25),
      )
    }

    return chartColors.value
  })

  const total = computed(() =>
    safeSeries.value.reduce((acc, value) => acc + value, 0),
  )

  /** `DonutChart` / `PieChart` / `PolarBarChart` all accept `{ name, value }`. */
  const simpleData = computed(() =>
    labels.value.map((name, index) => ({
      name,
      value: safeSeries.value[index] ?? 0,
    })),
  )

  /**
   * Legend overrides.
   *
   * A `legend` key can only be honoured or overridden wholesale - `PieChart`
   * and `RadarChart` replace the block outright - so every branch returns a
   * complete, self-sufficient legend and `show: false` reliably hides it.
   * `PolarBarChart` hides its legend by default, which is why the bottom case
   * has to be spelled out rather than left to the wrapper.
   */
  function legendOption(): ChartOption {
    if (props.showLegend === false) return { show: false }

    switch (props.legendPosition) {
      case 'left':
        return {
          show: true,
          orient: 'vertical',
          left: 0,
          right: 'auto',
          top: 'middle',
          bottom: 'auto',
        }
      case 'right':
        return {
          show: true,
          orient: 'vertical',
          right: 0,
          left: 'auto',
          top: 'middle',
          bottom: 'auto',
        }
      case 'top':
        return { show: true, top: 0, bottom: 'auto' }
      default:
        return { show: true, bottom: 0, left: 'center' }
    }
  }

  const chartOption = computed<ChartOption>(() => {
    const user: ChartOption = props.options ?? {}

    const base: ChartOption = {
      color: palette.value,
      tooltip: {
        valueFormatter: (value: any) =>
          typeof value === 'number' ? value.toLocaleString() : `${value}`,
      },
    }

    return {
      ...base,
      ...user,
      // Keep the theme palette unless the caller supplied their own.
      color: user.color ?? palette.value,
      legend: user.legend ?? legendOption(),
    }
  })

  const validateChartData = () => true

  const showChart = computed(
    () =>
      !props.loading &&
      !props.error &&
      Array.isArray(props.data) &&
      props.data.length > 0,
  )

  watch(
    () => props.data,
    (newData: SimpleChartSeries[] | null) => {
      if (newData && newData.length === 0) {
        // emit('data-error', 'Invalid chart data structure')
      }
    },
    { immediate: true },
  )

  return {
    props,
    palette,
    chartOption,
    showChart,
    safeSeries,
    safeLabels: labels,
    simpleData,
    total,
    validateChartData,
  }
}
