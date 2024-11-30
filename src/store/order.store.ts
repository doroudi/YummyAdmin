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
      const response = await orderService.getOrderList(options)
      orders.value = response.items
    }
    finally {
      isLoading.value = false
    }
  }

  async function getRecentOrders(itemsCount = 5) {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList({ ...options, pageSize: itemsCount })
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
    options,
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
