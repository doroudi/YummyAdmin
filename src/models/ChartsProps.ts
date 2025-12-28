import type { ApexOptions } from 'apexcharts'
import type { ChartData, SimpleChartSeries } from './ChartData.ts'

export type ChartProps = {
  data: ChartData | null
  colors: string[]
  colorScheme?: string
  height?: number
  loading?: boolean
  showLegend?: boolean
  options?: ApexOptions
  legendPosition?: 'top' | 'right' | 'bottom' | 'left'
  error?: string | null
  type?:
    | 'line'
    | 'area'
    | 'bar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'
}

export interface SimpleChartProps {
  data: SimpleChartSeries[] | null
  colors: string[]
  colorScheme?: string
  height?: number
  loading?: boolean
  options?: ApexOptions
  error?: string | null
  showLegend?: boolean
  legendPosition?: 'top' | 'right' | 'bottom' | 'left'
  type?: 'pie' | 'donut' | 'radialBar' | 'polarArea'
}
