import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Notification } from '~/models/Notification'
import NotificationService from '~/services/notification.service'

export const useNotificationStore = defineStore('Notification', () => {
  const notifications = ref<Notification[]>([])
  const isLoading = ref(false)
  async function getNotifications() {
    const response = await NotificationService.getNotificationsList()
    notifications.value = response.items
  }

  function clearAll() {
    notifications.value = []
  }

  return {
    notifications,
    isLoading,
    getNotifications,
    clearAll,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot))
