export interface ChartData {
  labels: string[]
  series: ChartSeries[]
}

export interface ChartSeries {
  name: string
  data: number[]
}
