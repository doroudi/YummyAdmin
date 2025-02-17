import GenericService from './generic.service'
import type { Category } from '~/models/Category'
import { ApiService } from '~/common/api/api-service'

const apiService = new ApiService('Category')
class CategoryService extends GenericService<Category, number> {
  constructor() {
    super(apiService)
  }

  getAll() {
    return apiService.getList<Category[]>
  }
}
export default new CategoryService()
