import {
  chartColors,
  mergeOptionBlock,
  resolveCssColor,
} from '~/components/ui/charts/useChartTheme'
import type { ChartData } from '~/models/ChartData'
import type { ChartOption, ChartProps } from '~/models/ChartsProps'

/**
 * Builds everything the vendored uipkge cartesian wrappers (line / area / bar /
 * radar) need out of this project's `ChartData` shape:
 *
 *   { labels: string[], series: [{ name, data: number[] }] }
 *     ->
 *   rows = [{ x: 'Jan', s0: 12, s1: 4 }, ...] with xField 'x', yField ['s0','s1']
 *
 * Series keys are positional (`s0`, `s1`, ...) so arbitrary series names stay
 * safe as object keys; the human-readable names reach the legend/tooltip
 * through the per-index series merge in `chartOption`.
 */
export function useChartOptions(props: ChartProps) {
  const { makeLighter } = useColors()

  const safeLabels = computed<string[]>(() => {
    if (!props.data?.labels) return []
    try {
      return props.data.labels.map((label: any) =>
        label === null || label === undefined ? '' : String(label),
      )
    } catch {
      return []
    }
  })

  const seriesNames = computed<string[]>(() => {
    if (!props.data?.series || !Array.isArray(props.data.series)) return []
    return props.data.series.map(
      (series: any, index: number) => series?.name || `Series ${index + 1}`,
    )
  })

  /** Positional field keys handed to the ECharts wrapper. */
  const fields = computed<string[]>(() =>
    seriesNames.value.map((_, i) => `s${i}`),
  )

  const palette = computed<string[]>(() => {
    if (props.colors && props.colors.length > 0)
      return props.colors.map(resolveCssColor)

    if (props.colorScheme) {
      return seriesNames.value.map((_, i) =>
        makeLighter(props.colorScheme ?? '', 1 - i * 0.25),
      )
    }

    return chartColors.value
  })

  const rows = computed<Record<string, any>[]>(() => {
    const series = props.data?.series
    if (!Array.isArray(series)) return []

    return safeLabels.value.map((label, rowIndex) => {
      const row: Record<string, any> = { x: label }
      series.forEach((item: any, seriesIndex: number) => {
        const value = Number(item?.data?.[rowIndex])
        row[`s${seriesIndex}`] = Number.isNaN(value) ? 0 : value
      })
      return row
    })
  })

  /** Kept for the previous public shape of this composable. */
  const safeSeries = computed<number[][]>(() =>
    fields.value.map((field) => rows.value.map((row) => row[field])),
  )

  /** Radar needs an explicit `<indicator>` per axis with a computed maximum. */
  const radarIndicators = computed(() =>
    safeLabels.value.map((label, index) => {
      let max = 0
      for (const field of fields.value)
        max = Math.max(max, Number(rows.value[index]?.[field]) || 0)

      return { name: label, max: max > 0 ? Math.ceil(max * 1.1) : 1 }
    }),
  )

  const radarData = computed(() =>
    fields.value.map((field, index) => ({
      name: seriesNames.value[index] ?? field,
      value: rows.value.map((row) => row[field]),
    })),
  )

  /**
   * Legend overrides.
   *
   * Cartesian charts have always shipped without a legend in this project, so
   * the wrappers default `showLegend` to `false` and callers opt in.
   * `undefined` means "leave the wrapper's default alone" (a bottom-anchored
   * legend for multi-series, hidden for single-series).
   */
  function legendOption(): ChartOption | undefined {
    if (props.showLegend !== true) return { show: false }

    // `'auto'` clears the wrapper's default anchor on the opposite edge.
    switch (props.legendPosition) {
      case 'top':
        return { show: true, top: 0, bottom: 'auto' }
      case 'left':
        return {
          show: true,
          left: 0,
          right: 'auto',
          top: 'middle',
          orient: 'vertical',
        }
      case 'right':
        return {
          show: true,
          right: 0,
          left: 'auto',
          top: 'middle',
          orient: 'vertical',
        }
      default:
        return undefined
    }
  }

  /**
   * App-level overrides handed to the wrapper as its `option` prop. The wrapper
   * merges these per-series (by index) and one level deep for axis blocks, so
   * partial overrides never clobber the computed `type` / `data`.
   */
  const chartOption = computed<ChartOption>(() => {
    const user: ChartOption = props.options ?? {}

    const baseSeries = seriesNames.value.map((name, index) => ({
      name,
      itemStyle: { color: palette.value[index % palette.value.length] },
    }))

    const userSeries = Array.isArray(user.series) ? user.series : null
    const seriesCount = Math.max(baseSeries.length, userSeries?.length ?? 0)
    const series = Array.from({ length: seriesCount }, (_, index) => ({
      ...(baseSeries[index] ?? {}),
      ...(userSeries?.[index] ?? {}),
    }))

    const base: ChartOption = {
      color: palette.value,
      series,
      yAxis: {
        axisLabel: {
          formatter: (value: number) =>
            value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}`,
        },
      },
      tooltip: {
        valueFormatter: (value: any) =>
          typeof value === 'number' ? value.toLocaleString() : `${value}`,
      },
    }

    const legend = user.legend ?? legendOption()

    return {
      ...base,
      ...user,
      series,
      legend,
      color: user.color ?? base.color,
      yAxis: mergeOptionBlock(base.yAxis, user.yAxis),
      tooltip: mergeOptionBlock(base.tooltip, user.tooltip),
    }
  })

  const validateChartData = (data: ChartData | null): boolean => {
    if (!data) return false
    if (!data.series || !Array.isArray(data.series) || data.series.length === 0)
      return false
    if (!data.labels || !Array.isArray(data.labels)) return false

    return data.series.every(
      (series: any) =>
        series && typeof series === 'object' && Array.isArray(series.data),
    )
  }

  const showChart = computed(
    () =>
      !props.loading &&
      !props.error &&
      validateChartData(props.data) &&
      safeSeries.value.length > 0,
  )

  watch(
    () => props.data,
    (newData: any) => {
      if (newData && !validateChartData(newData)) {
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
    safeLabels,
    seriesNames,
    fields,
    rows,
    radarIndicators,
    radarData,
    validateChartData,
  }
}
