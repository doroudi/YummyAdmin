<script setup lang="ts">
import type { ToastNotification } from '~/store/notify.store'

const notification = useNotification()
const notificationsStore = useNotifyStore()
watch(() => notificationsStore.messages, (newVal: ToastNotification[], oldVal: ToastNotification[]) => {
  if (newVal.length < oldVal.length)
    return
  const lastMessage = newVal[newVal.length - 1]
  notification.create({
    type: lastMessage.type,
    content: lastMessage.body,
    duration: !lastMessage.permanent ? lastMessage.duration : undefined,
    closable: !lastMessage.permanent,
  })
}, { deep: true })
</script>

<template>
  <main class="text-gray-700 dark:text-gray-200">
    <RouterView />
  </main>
</template>
