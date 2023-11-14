import { ApiService } from '~/common/api/api-service'
import type { Category } from '~/models/Category'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'

const apiService = new ApiService('Category')
class CategoryService {
  constructor() { }
  async getCategoryList(options: PagedAndSortedRequest): Promise<PagedListResult<Category>> {
    const response = await apiService.getPagedList<Category>('', options)
    return response
  }

  async createCategory(categoryItem: Category): Promise<Category> {
    return apiService.post<Category>('', categoryItem)
  }
}
export default new CategoryService()
