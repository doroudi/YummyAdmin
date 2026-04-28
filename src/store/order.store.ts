import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Order, OrderList, OrderStatus } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import orderService from '~/services/order.service'

export interface BatchUpdateResult {
  success: string[]
  failed: string[]
}

export const useOrderStore = defineStore('Order', () => {
  const orders = ref<OrderList[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getOrders(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList(options)
      orders.value = response.items
      options.pageCount = Math.ceil(response.totalCount! / options.pageSize!)
    } finally {
      isLoading.value = false
    }
  }

  async function getRecentOrders(pageSize = 5) {
    isLoading.value = true
    try {
      const response = await orderService.getOrderList({
        page: 1,
        pageSize,
      })
      orders.value = response.items
    } finally {
      isLoading.value = false
    }
  }

  async function getOrderDetail(order: Order) {
    return await orderService.getOrder(order.id)
  }

  async function deleteItem(id: number) {
    const itemIndex = orders.value.findIndex((x: any) => x.id === id)
    if (itemIndex !== -1) orders.value.splice(itemIndex, 1)
  }

  function updateOrderStatusLocal(orderId: string, newStatus: OrderStatus) {
    const orderIndex = orders.value.findIndex((order) => order.id === orderId)
    if (orderIndex !== -1) {
      orders.value[orderIndex].status = newStatus
    }
  }

  async function updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
  ): Promise<boolean> {
    isSaving.value = true
    try {
      const success = await orderService.updateOrderStatus(orderId, newStatus)
      if (success) {
        updateOrderStatusLocal(orderId, newStatus)
      }
      return success
    } finally {
      isSaving.value = false
    }
  }

  async function batchUpdateOrderStatus(
    orderIds: string[],
    newStatus: OrderStatus,
  ): Promise<BatchUpdateResult> {
    isSaving.value = true
    const result: BatchUpdateResult = {
      success: [],
      failed: [],
    }

    try {
      const promises = orderIds.map(async (orderId) => {
        try {
          const success = await orderService.updateOrderStatus(
            orderId,
            newStatus,
          )
          if (success) {
            updateOrderStatusLocal(orderId, newStatus)
            result.success.push(orderId)
          } else {
            result.failed.push(orderId)
          }
        } catch (error) {
          result.failed.push(orderId)
        }
      })

      await Promise.all(promises)
      return result
    } finally {
      isSaving.value = false
    }
  }

  return {
    orders,
    getOrders,
    getOrderDetail,
    isSaving,
    isLoading,
    getRecentOrders,
    deleteItem,
    updateOrderStatus,
    updateOrderStatusLocal,
    batchUpdateOrderStatus,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
