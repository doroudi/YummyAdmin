import { ApiService } from '~/common/api/api-service'
import type { ListResult } from '~/models/ListResult'
import type { Notification } from '~/models/Notification'

const apiService = new ApiService('notification')
class NotificationsService {
  async getNotificationsList(): Promise<ListResult<Notification>> {
    const response = await apiService.getList<Notification>('', {})
    return response
  }
}
export default new NotificationsService()
