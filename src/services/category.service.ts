import { ApiService } from '~/common/api/api-service'
import type { Category } from '~/models/Category'
import GenericService from './generic.service'

const apiService = new ApiService('category')
class CategoryService extends GenericService<Category, number> {
  constructor() {
    super(apiService)
  }

  getAll() {
    return apiService.getList<Category[]>
  }

  getStats() {
    return apiService.get<{ summaryStats: any; productsByCategoryStat: any }>(
      'stats',
    )
  }
}
export default new CategoryService()
