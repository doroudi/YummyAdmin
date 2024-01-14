import { ApiService } from '~/common/api/api-service'
import type { Customer } from '~/models/Customer'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'

const apiService = new ApiService('customer')
class CustomerService {
  constructor() { }
  async getList(options: PagedAndSortedRequest): Promise<PagedListResult<Customer>> {
    const response = await apiService.getPagedList<Customer>('', options)
    return response
  }
}
export default new CustomerService()
