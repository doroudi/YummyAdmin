<script setup lang="ts">
import { NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { Send28Filled as SendIcon } from '@vicons/fluent'

const store = useChatStore()
const { messages } = storeToRefs(store)
const message = ref('')
const sendIsActive = computed(() => message.value.trim().length > 0)

function sendMessage() {
  if (message.value.trim()) {
    store.sendMessage({
      content: message.value,
      created: new Date().toISOString(),
    })
    message.value = ''
  }
}
</script>

<template>
  <section class="messages-box flex flex-col justify-between h-100 overflow-y-auto">
    <n-scrollbar>
      <div class="flex-1 flex flex-col justify-end items-start gap-2 p-4">
        <MessageItem v-for="item of messages" :key="item.id" :message="item" />
      </div>
    </n-scrollbar>
    <div class="send-message p-4 bg-gray-100 dark:bg-gray-700 flex items-center">
      <input
        v-model="message" placeholder="Write Message" class="message-input flex-1"
        @keypress.enter="sendMessage"
      >
      <NButton v-show="sendIsActive" text type="primary" @click="sendMessage">
        <template #icon>
          <NIcon size="1.4rem">
            <SendIcon />
          </NIcon>
        </template>
      </NButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.messages-box {
    height: 100%;

    .message-input {
        background: transparent;
        border: none;

        &:focus {
            outline: none;
        }
    }
}
</style>
