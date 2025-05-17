<script lang="ts" setup>
import type { MessageItem } from '~/models/Chat'

interface Props {
  items: MessageItem[]
}
defineProps<Props>()
</script>

<template>
  <n-list hoverable clickable class="pe-1">
    <n-list-item v-for="item of items" :key="item.id">
      <template #prefix>
        <n-badge :value="item.badge" type="success" :max="9">
          <NAvatar round size="medium" :src="item.from.avatar" fallback-src="assets/images/fallback.png" />
        </n-badge>
      </template>
      <div class="flex flex-col">
        <span class="text-sm text-gray-800 dark:text-white" :class="{ 'font-bold': item.isUnread }">
          {{ item.from.name }}
        </span>
        <span
          class="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
          :class="{ 'font-bold': item.isUnread }"
        >
          {{ item.title }} {{ item.createdAt }}
        </span>
        <!-- <n-thing :title="item.from.name" :description="item.title" /> -->
      </div>
    </n-list-item>
  </n-list>
</template>

<style lang="scss" scoped>

</style>
