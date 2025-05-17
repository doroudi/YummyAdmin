<script lang="ts" setup>
import type { MessageItem } from '~/models/Chat'

interface Props {
  items: MessageItem[]
}
defineProps<Props>()
</script>

<template>
  <n-list hoverable clickable>
    <n-list-item v-for="item of items" :key="item.id">
      <template #prefix>
        <NAvatar round size="medium" :src="item.from.avatar" fallback-src="assets/images/fallback.png" />
      </template>
      <!-- <NSPace>
        <span> {{ item.from.name }}</span>
        <span class="text-xs text-gray-500">
          {{ item.title }} {{ item.createdAt }}
        </span>
      </NSPace> -->
      <n-thing :title="item.from.name" :description="item.title" />
    </n-list-item>
  </n-list>
</template>

<style lang="scss" scoped>

</style>
