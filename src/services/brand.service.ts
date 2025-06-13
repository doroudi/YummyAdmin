import { ApiService } from '~/common/api/api-service'
import type { Brand } from '~/models/Brand'
import GenericService from './generic.service'

const apiService = new ApiService('Brand')
class BrandService extends GenericService<Brand, string> {
  constructor() {
    super(apiService)
  }
}
export default new BrandService()
