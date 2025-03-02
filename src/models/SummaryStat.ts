export interface DashboardSummaryStatDto {
  registers: SummaryStatDto | null
  products: SummaryStatDto | null
  sells: SummaryStatDto | null
  visits: SummaryStatDto | null
}

export interface SummaryStatDto {
  count: number
  progress: number
  progressFlow: number[]
}
