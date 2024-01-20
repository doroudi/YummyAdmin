import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Order } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import orderService from '~/services/order.service'

export const useOrderStore = defineStore('Order', () => {
  const orders = ref<Order[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getOrders(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList(options)
      orders.value = response.items
      options.pageSize = Math.trunc(response.totalCount / options.itemsPerPage)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    orders,
    getOrders,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
