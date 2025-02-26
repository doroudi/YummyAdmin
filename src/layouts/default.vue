<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { ToastNotification } from '~/store/notify.store'

const layoutStore = useLayoutStore()

const { isFluid } = storeToRefs(layoutStore)
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
  <n-layout has-sider position="absolute">
    <Sidebar />

    <n-layout :native-scrollbar="false" position="static">
      <div class="main-content flex-1 bg-slate-100 dark:bg-slate-800 dark:text-white my-2 mr-2">
        <Navbar />
        <div class="px-0 py-1 md:p-3 md:pb-15 relative md:mx-auto" :class="{ 'md-container': !isFluid }">
          <router-view v-slot="{ Component, route }">
            <transition name="route" mode="out-in">
              <div :key="route">
                <component :is="Component" />
              </div>
            </transition>
          </router-view>
        </div>
      </div>
    </n-layout>
  </n-layout>
</template>

<style lang="scss">
.n-layout {
  padding: 0 4px;
  background-color: transparent !important;
}
</style>
