import { ApiService } from '~/common/api/api-service'
import type { DashboardSummaryStatDto } from '~/models/SummaryStat'

const apiService = new ApiService('Report')
class ReportService {
  constructor() { }
  async getSummaryReport(): Promise<DashboardSummaryStatDto> {
    const response = await apiService.get<DashboardSummaryStatDto>('Summary')
    return response
  }
}
export default new ReportService()
