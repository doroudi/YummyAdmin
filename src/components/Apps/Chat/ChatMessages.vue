<script setup lang="ts">
import { Send28Filled as SendIcon } from '@vicons/fluent'
import { NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'

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
  <section class="messages-box flex flex-col items-stretch justify-stretch">
    <div class="flex-1 items-end flex-col justify-end">
      <n-scrollbar>
        <div class="flex flex-col justify-end items-start gap-2 p-4 flex-1">
          <MessageItem v-for="item of messages" :key="item.id" :message="item" />
        </div>
      </n-scrollbar>
    </div>
    <div class="send-message p-4 bg-gray-100 dark:bg-gray-700 flex items-center">
      <input v-model="message" placeholder="Write Message" class="message-input flex-1" @keypress.enter="sendMessage">
      <NButton :disabled="!sendIsActive" text type="primary" @click="sendMessage">
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
