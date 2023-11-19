import GenericService from './generic.service'
import type { Brand } from '~/models/Brand'
import { ApiService } from '~/common/api/api-service'

const apiService = new ApiService('Brand')
class BrandService extends GenericService<Brand, string> {
  constructor() {
    super(apiService)
  }
}
export default new BrandService()
