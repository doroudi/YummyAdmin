import { ApiService } from '~/common/api/api-service'
import type { Product } from '~/models/Product'
import GenericService from './generic.service'

const apiService = new ApiService('Product')
class ProductService extends GenericService<Product, number> {
  constructor() {
    super(apiService)
  }
}
export default new ProductService()
