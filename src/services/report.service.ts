import { ApiService } from '~/common/api/api-service'
import type { DashboardSummaryStatDto } from '~/models/SummaryStat'

const apiService = new ApiService('Report')
class ReportService {
  constructor() { }
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
}
export default new ReportService()
