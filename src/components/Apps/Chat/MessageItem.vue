<script setup lang="ts">
import type { MessageItem } from '~/models/Chat'

export interface Props {
  message: MessageItem
}
defineProps<Props>()
</script>

<template>
  <div class="chat-message flex flex-col gap-2 p-3 bg-gray-100 dark:bg-gray-700">
    {{ message.content }}

    <div class="time text-xs text-gray-500 text-end -mb-2 dark:text-gray-400">
      {{ new Date(message.created).toLocaleTimeString() }}
    </div>
  </div>
</template>

<style scoped>
.chat-message {
    border-radius: 1rem;
}
</style>
