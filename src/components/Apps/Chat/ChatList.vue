<script lang="ts" setup>
import type { ChatItem } from '~/models/Chat'

interface Props {
  items: ChatItem[]
}
defineProps<Props>()
const emits = defineEmits(['select'])
const selectedChat = ref<ChatItem | null>(null)
function selectChat(item: ChatItem) {
  selectedChat.value = item
  emits('select', item.id)
}
</script>

<template>
  <NList hoverable clickable class="pe-1">
    <NListItem v-for="item of items" :key="item.id" @click="selectChat(item)"
      :class="{ selected: item.id === selectedChat?.id }">
      <template #prefix>
        <NBadge :value="item.badge" type="success" :max="9">
          <NAvatar round size="medium" :src="item.from.avatar" fallback-src="assets/images/fallback.png" />
        </NBadge>
      </template>
      <div class="flex flex-col">
        <span class="text-sm text-gray-800 dark:text-white" :class="{ 'font-bold': item.isUnread }">
          {{ item.from.name }}
        </span>
        <span class="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
          :class="{ 'font-bold': item.isUnread }">
          {{ item.title }} {{ item.createdAt }}
        </span>
      </div>
    </NListItem>
  </NList>
</template>

<style lang="scss" scoped>
.selected {
  font-weight: bold;
  background: var(--n-merged-color-hover);

    position: relative;

    &::before {
      content: '';
      z-index: 999;
      position: absolute;
      left: -10px;
      top: 2px;
      height: 18px;
      width: 3px;
      border-radius: 3px;
      background: var(--primary-color);
  }
}
</style>
