import { acceptHMRUpdate, defineStore } from 'pinia'

interface NotificationState {
  messages: Array<ToastNotification> | any[]
}

export interface ToastNotification {
  type?: 'default' | 'error' | 'info' | 'success' | 'warning'
  duration?: number
  permanent?: boolean
  body: string
  title?: string
  id?: number
}

export const useNotifyStore = defineStore('notify', {
  state: (): NotificationState => ({
    messages: [],
  }),
  actions: {
    notify(notification: ToastNotification) {
      notification.id = this.messages.length
        ? Math.max(...this.messages.map((x) => x.id)) + 1
        : 0
      notification.duration = notification.duration || 5000
      this.messages.push(notification)
      if (!notification.permanent) {
        setTimeout(() => {
          const messageIndex = this.messages.findIndex(
            (x) => x.id === notification.id,
          )
          this.messages.splice(messageIndex, 1)
        }, notification.duration ?? 3000)
      }
    },
    error(body: string, title?: string, permanent = false) {
      this.notify({ type: 'error', body, title, permanent })
    },
    success(body: string, title?: string, permanent = false) {
      this.notify({ type: 'success', body, title, permanent })
    },
    clear() {
      this.messages = []
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotifyStore, import.meta.hot))
