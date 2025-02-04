import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Notification } from '~/models/Notification'
import NotificationService from '~/services/notification.service'

export const useNotificationStore = defineStore('Notification', () => {
  const notifications = ref<Notification[]>([])
  const isLoading = ref(false)
  async function getNotifications() {
    const response = await NotificationService.getNotificationsList('1')
    notifications.value = response.items
  }

  return {
    notifications,
    isLoading,
    getNotifications,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot))
