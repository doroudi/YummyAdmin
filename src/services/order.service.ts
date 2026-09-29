import { useApi } from '~/composables/useApi'
import type { Order, OrderList } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'

export const useOrderService = () => {
  const api = useApi('order')

  async function getOrderList(
    options: PagedAndSortedRequest,
  ): Promise<PaginatedList<OrderList>> {
    const response = await api.getPaginated<OrderList>('', options)
    return response
  }

  async function getOrder(id: string): Promise<Order> {
    const response = await api.get<Order>(id)
    return response
  }

  async function deleteOrder(id: string): Promise<boolean> {
    return await api.delete<boolean>(id)
  }

  return {
    getOrderList,
    getOrder,
    deleteOrder,
  }
}
