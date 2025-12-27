export interface ChartData {
  labels: string[]
  series: ChartSeries[]
}
export interface ChartSeries {
  name: string
  data: number[]
}

export interface SimpleChartSeries {
  name: string
  value: number
}

export interface LocationChartSeries {
  key: string
  value:
    | {
        value: number
        color?: string
      }
    | number
}
