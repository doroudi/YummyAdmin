import { ApiService } from '~/common/api/api-service'
import type { Order, OrderList } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'

const apiService = new ApiService('order')
class OrderService {
  constructor() { }
  async getOrderList(options: PagedAndSortedRequest): Promise<PagedListResult<OrderList>> {
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
}
export default new OrderService()
