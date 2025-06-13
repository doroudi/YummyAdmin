export interface ChartData {
  labels: string[]
  series: ChartSeries[]
}

export interface ChartSeries {
  name: string
  data: number[]
}

export interface DonutChartSeries {
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
