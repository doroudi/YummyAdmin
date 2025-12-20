export interface DashboardSummaryStatDto {
  visits: SummaryStatDto
  visitors: SummaryStatDto
  views: SummaryStatDto
  bounceRate: SummaryStatDto
}

export interface SummaryStatDto {
  count: number
  suffix?: string
  progress: number
  progressFlow: number[]
}
