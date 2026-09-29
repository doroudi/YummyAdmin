import { useApi } from '~/composables/useApi'
import type { ListResult } from '~/models/ListResult'
import type { Notification } from '~/models/Notification'

export const useNotificationsService = () => {
  const api = useApi('notification')

  async function getNotificationsList(): Promise<ListResult<Notification>> {
    const response = await api.getList<Notification>('', {})
    return response
  }

  return {
    getNotificationsList,
  }
}
