import { useApi } from '~/composables/useApi'
import type { Customer } from '~/models/Customer'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'

export const useCustomerService = () => {
  const api = useApi('customer')

  async function getList(
    options: PagedAndSortedRequest,
  ): Promise<PaginatedList<Customer>> {
    const response = await api.getPaginated<Customer>('', options)
    return response
  }

  return {
    getList,
  }
}
