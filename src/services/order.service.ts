import { ApiService } from '~/common/api/api-service'
import type { Order } from '~/models/Order'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'

const apiService = new ApiService('Order')
class OrderService {
  constructor() { }
  async getOrderList(options: PagedAndSortedRequest): Promise<PagedListResult<Order>> {
    const response = await apiService.getPagedList<Order>('', options)
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
