import { ApiService } from '~/common/api/api-service'
import type { Category } from '~/models/Category'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'

const apiService = new ApiService('Category')
class CategoryService {
  constructor() { }
  async getCategoryList(options: PagedAndSortedRequest): Promise<Category[]> {
    const response = await apiService.getPagedList<Category>('', options)
    return response
  }
}
export default new CategoryService()
