import { ApiService } from '~/common/api/api-service'
import type { ChartData } from '~/models/ChartData'
import type { DashboardSummaryStatDto } from '~/models/SummaryStat'
import type { VisitStat } from '~/models/VisitStat'

const apiService = new ApiService('Report')
class ReportService {
  async getSummaryReport(): Promise<DashboardSummaryStatDto> {
    const response = await apiService.get<DashboardSummaryStatDto>('Summary')
    return response
  }

  async getRevenueStat(period: string): Promise<any> {
    const response = await apiService.get<any>(`Revenue/${period}`)
    return response
  }

  async getUsersGenderStat(): Promise<any> {
    const response = await apiService.get<any>('UsersGender')
    return response
  }

  async getUsersLocationStat(): Promise<any> {
    const response = await apiService.get<any>('UsersLocation')
    return response
  }

  async getMonthlySellStat(): Promise<ChartData> {
    const response = await apiService.get<ChartData>('monthlySellStat')
    return response
  }

  async getChartDemoData(length: number): Promise<ChartData> {
    const response = await apiService.get<ChartData>(`chartDemoData/${length}`)
    return response
  }

  async getVisitsStat(): Promise<VisitStat> {
    const response = await apiService.get<VisitStat>(`visitsData`)
    return response
  }
}
export default new ReportService()
