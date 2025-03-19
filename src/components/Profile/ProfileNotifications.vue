<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const store = useProfileStore()
const { userSettings } = storeToRefs(store)
</script>

<template>
  <div class="w-full md:w-1/2 m-auto p-8">
    <n-grid x-gap="12" :cols="4" class="pb-8 font-bold">
      <n-gi>
        {{ t('profile.notificationType') }}
      </n-gi>

      <n-gi>
        {{ t('profile.sms') }}
      </n-gi>

      <n-gi>
        {{ t('profile.email') }}
      </n-gi>

      <n-gi>
        {{ t('profile.push') }}
      </n-gi>
    </n-grid>
    <ProfileNotificationItem v-for="item in userSettings.notifications" :key="item.type" :item="item" />
  </div>
</template>
