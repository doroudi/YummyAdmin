import { ApiService } from '~/common/api/api-service'
import type { Category, CategoryCreateModel } from '~/models/Category'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'

const apiService = new ApiService('Category')
class CategoryService {
  constructor() { }
  async getCategoryList(options: PagedAndSortedRequest): Promise<PagedListResult<Category>> {
    const response = await apiService.getPagedList<Category>('', options)
    return response
  }

  async createCategory(categoryItem: CategoryCreateModel): Promise<Category> {
    return apiService.post<Category>('', categoryItem)
  }

  async deleteCategory(id: string | number): Promise<boolean> {
    return apiService.delete<boolean>(id)
  }
}
export default new CategoryService()
