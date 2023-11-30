import GenericService from './generic.service'
import type { Product } from '~/models/Product'
import { ApiService } from '~/common/api/api-service'

const apiService = new ApiService('Product')
class ProductService extends GenericService<Product, number> {
  constructor() {
    super(apiService)
  }
}
export default new ProductService()
