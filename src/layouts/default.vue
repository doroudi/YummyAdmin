<script setup lang="ts">
import type { ToastNotification } from '~/store/notify.store'

const props = defineProps({
  isFluid: {
    type: Boolean,
    default: false,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
})

const layoutStore = useLayoutStore()
const notification = useNotification()
const notificationsStore = useNotifyStore()

const effectiveFluid = computed(() => {
  return props.isFluid || layoutStore.isFluid
})

watch(
  () => notificationsStore.messages,
  (newVal: ToastNotification[], oldVal: ToastNotification[]) => {
    if (newVal.length < oldVal.length) return

    const lastMessage = newVal[newVal.length - 1]
    notification.create({
      type: lastMessage.type,
      content: lastMessage.body,
      duration: !lastMessage.permanent ? lastMessage.duration : undefined,
      closable: !lastMessage.permanent,
    })
  },
  { deep: true },
)
</script>

<template>
  <n-layout has-sider position="absolute">
    <Sidebar />

    <n-layout :native-scrollbar="false" position="static">
      <div class="main-content flex-1 dark:bg-slate-800 dark:text-white my-2">
        <Navbar />
        <div class="relative h-full">
          <NScrollbar>
            <div
              class="h-full overflow-auto md:mx-auto"
              :class="{ 'md-container': !effectiveFluid, 'md:pb-18': !fullScreen, 'p-3': !fullScreen }"
            >
              <router-view v-slot="{ Component, route }">
                <transition name="route" mode="out-in">
                  <div :key="route.name">
                    <component :is="Component" />
                  </div>
                </transition>
              </router-view>
            </div>
          </NScrollbar>
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

.main-content {
  --un-bg-opacity: .6;
}
</style>
