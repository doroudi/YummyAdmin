export interface DashboardSummaryStatDto {
  registers: SummaryStatDto
  products: SummaryStatDto
  sells: SummaryStatDto
  visits: SummaryStatDto
}

export interface SummaryStatDto {
  count: number
  progress: number
  progressFlow: number[]
}
