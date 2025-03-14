import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Customer } from '~/models/Customer'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'
import customerService from '~/services/customer.service'

export interface CustomerState {

}
export const useCustomerStore = defineStore('Customer', () => {
  const customers = ref<PaginatedList<Customer>>({ items: [] })
  const customerItem = ref<Customer>()
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getCustomers(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await customerService.getList(options)
      customers.value = response
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    getCustomers,
    customers,
    customerItem,
    isLoading,
    isSaving,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot))
