<script setup lang="ts">
import { storeToRefs } from 'pinia'

const collapsed = ref(false)
const store = useChatStore()
const { chats, status } = storeToRefs(store)

onMounted(() => {
  store.connect()
})

onBeforeUnmount(() => {
  if (status === 'OPEN')
    store.disconnect()
})

function loadChatMessages(chatId: number) {
  store.loadChatMessages(chatId)
}
</script>

<template>
  <NLayout has-sider sider-placement="left" class="h-100vh">
    <NLayoutSider
      bordered collapse-mode="width" :collapsed-width="0" :width="300" :collapsed="collapsed"
      @collapse="collapsed = true" @expand="collapsed = false"
    >
      <NScrollbar>
        <div class="p-3">
          <NInput round placeholder="Search Chats" clearable />
        </div>
        <ChatList :items="chats" @select="loadChatMessages" />
      </NScrollbar>
    </NLayoutSider>
    <NLayoutContent>
      <ChatMessages />
    </NLayoutContent>
  </NLayout>
</template>

<style lang="scss" scoped>

</style>
