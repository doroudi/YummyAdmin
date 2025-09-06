<script lang="ts" setup>
import type { NotificationSetting } from '@/models/Profile'
const { t } = useI18n()

defineProps<{ item: notificationTypes }>()
</script>

<template>
  <n-grid x-gap="12" :cols="4" class="py-3">
    <n-gi>
      {{ t(`profile.notificationTypes.${item.type}`) }}
    </n-gi>

    <n-gi>
      <n-switch :value="item.sms" />
    </n-gi>

    <n-gi>
      <n-switch :value="item.email" />
    </n-gi>

    <n-gi>
      <n-switch :value="item.push" />
    </n-gi>
  </n-grid>
</template>
