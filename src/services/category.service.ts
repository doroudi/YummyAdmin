import GenericService from './generic.service'
import type { Category } from '~/models/Category'
import { ApiService } from '~/common/api/api-service'

const apiService = new ApiService('category')
class CategoryService extends GenericService<Category, number> {
  constructor() {
    super(apiService)
  }

  getAll() {
    return apiService.getList<Category[]>
  }

  getStats() {
    return apiService.get<{ summaryStats: any; productsByCategoryStat: any }>('stats')
  }
}
export default new CategoryService()
