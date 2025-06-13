import { ApiService } from '~/common/api/api-service'
import type { Customer } from '~/models/Customer'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'

const apiService = new ApiService('customer')
class CustomerService {
  async getList(
    options: PagedAndSortedRequest,
  ): Promise<PaginatedList<Customer>> {
    const response = await apiService.getPagedList<Customer>('', options)
    return response
  }
}
export default new CustomerService()
