<script setup lang="ts">
import { storeToRefs } from 'pinia'

const collapsed = ref(false)
const store = useChatStore()
const { messages, status } = storeToRefs(store)

onMounted(() => {
  store.connect()
})

onBeforeUnmount(() => {
  if (status === 'OPEN')
    store.disconnect()
})
</script>

<template>
  <n-layout has-sider sider-placement="left">
    <n-layout-sider
      bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
      @collapse="collapsed = true" @expand="collapsed = false"
    >
      <n-scrollbar style="height: 100%">
        <ChatList :items="messages" />
      </n-scrollbar>
    </n-layout-sider>
    <n-layout-content>
      <div class="px-3">
        {{ status }}
      </div>
    </n-layout-content>
  </n-layout>
</template>

<style lang="scss" scoped>

</style>
