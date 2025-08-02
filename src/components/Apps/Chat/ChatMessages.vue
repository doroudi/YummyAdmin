<script setup lang="ts">
import {
  Call28Regular as CallIcon,
  Send28Filled as SendIcon,
} from '@vicons/fluent'
import { NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
const { t } = useI18n()

const store = useChatStore()
const { messages, currentChat } = storeToRefs(store)
const message = ref('')
const sendIsActive = computed(() => message.value.trim().length > 0)

function sendMessage() {
  if (message.value.trim()) {
    store.sendMessage({
      content: message.value,
      created: new Date().toISOString(),
      senderId: null,
    })
    message.value = ''
  }
}

function isLastMessage(index: number) {
  if (index === messages.value.length - 1) return true
  return messages.value[index].senderId !== messages.value[index + 1].senderId
}
</script>

<template>
  <div v-if="currentChat" class="messages-box flex flex-col items-stretch justify-stretch">
    <header class="send-message p-3 bg-gray-100 dark:bg-gray-700 flex justify-between">
      <div class="flex items-center">
        <n-avatar :src="currentChat.from.avatar" :alt="currentChat.from.name" class="me-2" round />
        <span class="text-gray-800 dark:text-gray-200">{{ currentChat.from.name }}</span>
      </div>

      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <n-button class="hidden md:flex" quaternary circle>
            <template #icon>
              <NIcon size="1.4rem">
                <CallIcon />
              </NIcon>
            </template>
          </n-button>
        </template>
        <span>{{ t('chatApp.call') }}</span>
      </n-tooltip>
    </header>
    <section class="flex flex-col flex-1">
      <div class="flex-1 items-end flex-col justify-end">
        <n-scrollbar>
          <div class="flex flex-col justify-end items-start gap-2 py-4 px-7 flex-1">
            <MessageItem v-for="(item, i) of messages" :key="item.id" :self-message="!item.senderId" :message="item"
              :last="isLastMessage(i)" />
          </div>
        </n-scrollbar>
      </div>

      <section id="send-message" class="send-message p-4 bg-gray-100 dark:bg-gray-700 flex items-center">
        <input v-model="message" :placeholder="t('chatApp.writeMessage')" class="message-input flex-1"
          @keypress.enter="sendMessage">
        <NButton :disabled="!sendIsActive" text type="primary" @click="sendMessage">
          <template #icon>
            <NIcon class="rtl-rotate" size="1.4rem">
              <SendIcon />
            </NIcon>
          </template>
        </NButton>
      </section>
    </section>
  </div>
</template>

<style scoped lang="scss">
.messages-box {
  height: calc(100% - 51px);

  .message-input {
    background: transparent;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
