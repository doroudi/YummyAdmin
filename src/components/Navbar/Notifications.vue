<script setup lang="ts">
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'

import {
  Alert28Regular as AlertIcon,
  Alert28Regular as BellIcon,
  Alert28Regular as InfoIcon,
  Alert28Regular as MessageIcon,
  Alert28Regular as OrderIcon,

} from '@vicons/fluent'
import { NIcon, NText } from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { Notification } from '~/models/Notification'
import { NotificationType } from '~/models/Notification'

const { renderLabel } = useRender()
const items = ref<SelectMixedOption[]>([])
const store = useNotificationStore()
const { notifications } = storeToRefs(store)

onMounted(async () => {
  await store.getNotifications()
  items.value = notifications.value.map((item: Notification) => {
    return {
      icon: renderNotificationIcon(item),
      label: () => renderLabel(item.title, ''),
      key: item.id,
    }
  })
})

function renderNotificationIcon(item: Notification) {
  return () => h(NIcon, null, { default: () => h(getIcon(item.type), {}) })
}

function renderNotificationLabel(item: Notification) {
  return h(NText, {}, { default: () => item.title })
}

function renderNotificationRow(item: Notification) {

}

function getIcon(notificationType: NotificationType) {
  switch (notificationType) {
    case NotificationType.Info:
      return InfoIcon
    case NotificationType.Alert:
      return AlertIcon
    case NotificationType.Message:
      return MessageIcon
    case NotificationType.Order:
      return OrderIcon
  }
}
</script>

<template>
  <div v-bind="$attrs">
    <n-dropdown :options="items">
      <n-button quaternary circle>
        <template #icon>
          <n-badge dot type="success" :offset="[-5, 5]" processing>
            <NIcon class="shake-item" size="1.4rem">
              <BellIcon />
            </NIcon>
          </n-badge>
        </template>
      </n-button>
    </n-dropdown>
  </div>
</template>
