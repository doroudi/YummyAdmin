import { useApi } from '~/composables/useApi'
import type { ChartData } from '~/models/ChartData'
import type { DashboardSummaryStatDto } from '~/models/SummaryStat'
import type { VisitStat } from '~/models/VisitStat'

export const useReportService = () => {
  const api = useApi('Report')

  async function getSummaryReport(): Promise<DashboardSummaryStatDto> {
    const response = await api.get<DashboardSummaryStatDto>('Summary')
    return response
  }

  async function getRevenueStat(period: string): Promise<any> {
    const response = await api.get<any>(`Revenue/${period}`)
    return response
  }

  async function getUsersGenderStat(): Promise<any> {
    const response = await api.get<any>('UsersGender')
    return response
  }

  async function getUsersLocationStat(): Promise<any> {
    const response = await api.get<any>('UsersLocation')
    return response
  }

  async function getMonthlySellStat(): Promise<ChartData> {
    const response = await api.get<ChartData>('monthlySellStat')
    return response
  }

  async function getChartDemoData(length: number): Promise<ChartData> {
    const response = await api.get<ChartData>(`chartDemoData/${length}`)
    return response
  }

  async function getVisitsStat(): Promise<VisitStat> {
    const response = await api.get<VisitStat>(`visitsData`)
    return response
  }

  return {
    getSummaryReport,
    getRevenueStat,
    getUsersGenderStat,
    getUsersLocationStat,
    getMonthlySellStat,
    getChartDemoData,
    getVisitsStat,
  }
}
