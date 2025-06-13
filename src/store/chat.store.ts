import { useWebSocket } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ChatItem, MessageItem } from '~/models/Chat'

export const useChatStore = defineStore('Chat', () => {
  const chats = ref<ChatItem[]>([])
  const messages = ref<MessageItem[]>([
    {
      id: '1',
      content: 'Welcome to the chat! How can I assist you today?',
      created: new Date(),
      updated: new Date(),
    },
    {
      id: '1',
      content: 'How are things?',
      created: new Date(),
    },
  ])
  const isLoading = ref(false)
  const { status, data, send, open, close } = useWebSocket(
    `wss://${import.meta.env.VITE_BASE_URL}/chat`,
  )
  const unwatch: (() => void) | null = null

  async function connect() {
    if (status === 'CLOSED') open()
  }

  function loadChatMessages(id: number) {
    send(JSON.stringify({ action: 'DETAILS', id }))
  }

  function sendMessage(message: MessageItem) {
    messages.value.push(message)
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
      case 'DETAILS':
        messages.value = payload
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
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
