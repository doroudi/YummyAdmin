import { ApiService } from '~/common/api/api-service'
import type { Order, OrderList, OrderStatus } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'

const apiService = new ApiService('order')

class OrderService {
  async getOrderList(
    options: PagedAndSortedRequest,
  ): Promise<PaginatedList<OrderList>> {
    const response = await apiService.getPagedList<OrderList>('', options)
    return response
  }

  async getOrder(id: string): Promise<Order> {
    const response = await apiService.get<Order>(id)
    return response
  }

  async deleteOrder(id: string): Promise<boolean> {
    return await apiService.delete<boolean>(id)
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<boolean> {
    try {
      const response = await apiService.put<boolean>(`${id}/status`, {
        status,
      })
      return response ?? true
    } catch (error) {
      return false
    }
  }
}

export default new OrderService()
