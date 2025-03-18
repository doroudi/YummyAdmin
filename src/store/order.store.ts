import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Order, OrderList } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import orderService from '~/services/order.service'

export const useOrderStore = defineStore('Order', () => {
  const orders = ref<OrderList[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getOrders(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList(options)
      orders.value = response.items
      options.pageCount = Math.ceil(response.totalCount! / options.itemsPerPage!)
    }
    finally {
      isLoading.value = false
    }
  }

  async function getRecentOrders(itemsPerPage = 5) {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList({ page: 1, itemsPerPage })
      orders.value = response.items
    }
    finally {
      isLoading.value = false
    }
  }

  async function getOrderDetail(order: Order) {
    return await orderService.getOrder(order.id)
  }

  return {
    orders,
    getOrders,
    getOrderDetail,
    isSaving,
    isLoading,
    getRecentOrders,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
