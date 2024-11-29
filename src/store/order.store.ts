import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Order, OrderList } from '~/models/Order'
import orderService from '~/services/order.service'

export const useOrderStore = defineStore('Order', () => {
  const orders = ref<OrderList[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getOrders() {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList(options.value)
      orders.value = response.items
      options.value.itemCount = response.pageCount
      options.value.pageCount = response.totalCount
    }
    finally {
      isLoading.value = false
    }
  }

  async function getOrderDetail(order: Order) {
    return await orderService.getOrder(order.id)
  }

  return {
    options,
    orders,
    getOrders,
    getOrderDetail,
    isSaving,
    isLoading,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
