import type { ChartData, SimpleChartSeries } from './ChartData.ts'

/**
 * Axis / cartesian chart families exposed by the vendored uipkge primitives.
 * `polarArea`, `pie` and `donut` are fed by {@link SimpleChartProps}.
 */
export type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'radar'
  | 'pie'
  | 'donut'
  | 'polarArea'

export type ChartLegendPosition = 'top' | 'right' | 'bottom' | 'left'

/**
 * Escape hatch passed straight through to the underlying ECharts wrapper.
 * Everything is optional - whatever you set here is merged on top of the
 * wrapper's computed option (series merge per index, axis blocks merged one
 * level deep). See `src/components/ui/charts/README.md`.
 */
export type ChartOption = Record<string, any>

export type ChartProps = {
  data: ChartData | null
  colors?: string[] | null
  colorScheme?: string | null
  height?: number
  loading?: boolean
  showLegend?: boolean
  options?: ChartOption | null
  legendPosition?: ChartLegendPosition
  error?: string | null
  type?: ChartType
}

export interface SimpleChartProps {
  data: SimpleChartSeries[] | null
  colors?: string[] | null
  colorScheme?: string | null
  height?: number
  loading?: boolean
  options?: ChartOption | null
  error?: string | null
  showLegend?: boolean
  legendPosition?: ChartLegendPosition
  type?: 'pie' | 'donut' | 'polarArea'
}
