import type { ApexOptions } from 'apexcharts'
import type { ChartData } from './ChartData'

export interface ChartProps {
  data: ChartData | null
  colors: string[]
  height?: number
  loading?: boolean
  options?: ApexOptions
  error?: string | null
  type?:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'
}
