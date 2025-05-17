import { acceptHMRUpdate, defineStore } from 'pinia'
import { useWebSocket } from '@vueuse/core'
import type { MessageItem } from '~/models/Chat'

export const useChatStore = defineStore('Chat', () => {
  const messages = ref<MessageItem[]>([])
  const isLoading = ref(false)
  const { status, data, send, open, close } = useWebSocket(`wss://${import.meta.env.VITE_BASE_URL}/chat`)
  const unwatch: (() => void) | null = null

  async function connect() {
    if (status === 'CLOSED')
      open()
  }

  watch(() => data, (val: any) => {
    handleMessage(val)
  }, { deep: true, lazy: true })

  function handleMessage(message: any) {
    const { type, payload } = JSON.parse(message.value)
    switch (type) {
      case 'INIT':
      case 'UPDATE':
        messages.value = sortMessages(payload)
    }
  }

  function sortMessages(messages: MessageItem[]) {
    return messages.sort((a, b) => {
      return new Date(b.updated).getTime() - new Date(a.updated).getTime()
    })
  }

  function disconnect() {
    if (status !== 'CLOSED')
      close()
    if (unwatch)
      unwatch()
  }

  return {
    connect,
    disconnect,
    messages,
    isLoading,
    status,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
