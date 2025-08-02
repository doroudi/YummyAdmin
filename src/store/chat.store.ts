import { useWebSocket } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ChatItem, MessageItem } from '~/models/Chat'

export const useChatStore = defineStore('Chat', () => {
  const chats = ref<ChatItem[]>([])
  const currentChat = ref<ChatItem | null>(null)
  const messages = ref<MessageItem[]>([])
  const isLoading = ref(false)
  const unwatch: (() => void) | null = null

  const { status, data, send, open, close } = useWebSocket(
    `wss://${import.meta.env.VITE_BASE_URL}/chat`,
  )

  async function connect() {
    if (status === 'CLOSED') open()
  }

  function loadChatMessages(id: number) {
    currentChat.value = chats.value.find((chat) => chat.id === id)
    messages.value = []
    send(JSON.stringify({ action: 'DETAILS', id }))
  }

  function sendMessage(message: MessageItem) {
    messages.value.push(message)
    send(JSON.stringify({ action: 'MESSAGE', message }))
  }

  watch(
    () => data,
    (val: any) => {
      handleMessage(val)
    },
    { deep: true, lazy: true },
  )

  function handleMessage(message: any) {
    const { type, payload } = JSON.parse(message.value)
    switch (type) {
      case 'INIT':
      case 'UPDATE':
        chats.value = sortChats(payload)
        break
      case 'MESSAGE':
        messages.value.push(payload)
    }
  }

  function sortChats(chats: ChatItem[]) {
    return chats.sort((a, b) => {
      return new Date(b.updated).getTime() - new Date(a.updated).getTime()
    })
  }

  function disconnect() {
    if (status !== 'CLOSED') close()
    if (unwatch) unwatch()
  }

  return {
    connect,
    disconnect,
    chats,
    isLoading,
    status,
    loadChatMessages,
    messages,
    sendMessage,
    currentChat,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
