<script lang="ts" setup>
import type { NotificationSetting } from '~/models/Profile'

const { t } = useI18n()

const props = defineProps<{ item: NotificationSetting }>()
const innerItem = ref(props.item)
</script>

<template>
  <n-grid x-gap="12" :cols="4" class="py-3">
    <n-gi>
      {{ t(`profile.notificationTypes.${innerItem.type}`) }}
    </n-gi>

    <n-gi>
      <n-switch v-model:value="innerItem.sms" />
    </n-gi>

    <n-gi>
      <n-switch v-model:value="innerItem.email" />
    </n-gi>

    <n-gi>
      <n-switch v-model:value="innerItem.push" />
    </n-gi>
  </n-grid>
</template>
