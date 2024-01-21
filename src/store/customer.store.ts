import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Customer } from '~/models/Customer'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import customerService from '~/services/customer.service'

export interface CustomerState {

}
export const useCustomerStore = defineStore('Customer', () => {
  const customers = ref<Customer[]>([])
  const customerItem = ref<Customer>()
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getCustomers(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await customerService.getList(options)
      customers.value = response.items
      options.pageSize = Math.trunc(response.totalCount / options.itemsPerPage)
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
    options,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot))
