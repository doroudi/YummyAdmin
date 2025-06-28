<script setup lang="ts">
import {
  Warning24Regular as AlertIcon,
  Alert28Regular as BellIcon,
  Person24Regular as CustomerIcon,
  MailInbox24Regular as EmptyIcon,
  Info24Regular as InfoIcon,
  Cart20Regular as OrderIcon,
  Shield24Regular as SecurityIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import { NotificationType } from '~/models/Notification'

const store = useNotificationStore()
const { notifications } = storeToRefs(store)
const { t } = useI18n()

onMounted(async () => {
  await store.getNotifications()
})

function getIcon(notificationType: NotificationType) {
  switch (notificationType) {
    case NotificationType.info:
      return InfoIcon
    case NotificationType.alert:
      return AlertIcon
    case NotificationType.security:
      return SecurityIcon
    case NotificationType.order:
      return OrderIcon
    case NotificationType.customer:
      return CustomerIcon
  }
}
</script>

<template>
  <div v-bind="$attrs">
    <n-popover class="notifications" trigger="hover" :show-arrow="true" style="width: 270px;max-height: 450px;">
      <template #trigger>
        <n-button quaternary circle>
          <template #icon>
            <n-badge dot type="success" :offset="[-5, 5]" processing>
              <NIcon class="shake-item" size="1.4rem">
                <BellIcon />
              </NIcon>
            </n-badge>
          </template>
        </n-button>
      </template>
      <template #header>
        <NText strong depth="1">
          {{ t('notifications.title') }}
        </NText>
      </template>
      <template #footer>
        <NButton :disabled="!notifications.length" quaternary @click="store.clearAll()">
          {{ t('notifications.clear') }}
        </NButton>
      </template>
      <n-empty v-if="!notifications.length" class="m-5" :description="t('notifications.empty')">
        <template #icon>
          <n-icon>
            <EmptyIcon />
          </n-icon>
        </template>
      </n-empty>
      <NScrollbar v-else style="max-height:300px">
        <div class="notifications-list">
          <n-list hoverable clickable>
            <n-list-item v-for="item of notifications" :key="item.id">
              <template #prefix>
                <div class="icon ms-2">
                  <NIcon class="notification-icon" :class="NotificationType[item.type].toLowerCase()" size="20">
                    <Component :is="getIcon(item.type)" />
                  </NIcon>
                </div>
              </template>
              <n-thing :title="item.title" :description="item.message" />
            </n-list-item>
          </n-list>
        </div>
      </NScrollbar>
    </n-popover>
  </div>
</template>

<style lang="scss">
.notifications {
  .n-popover__content {
    --n-padding: 0;
  }
}

.notifications-list {
  --n-padding: 8px 14px;
  --b-border-radius: 0px;

  .n-list.n-list--hoverable .n-list-item {
    padding: 12px 0;
  }

  .n-thing .n-thing-main .n-thing-header {
    margin-bottom: 0;

    .n-thing-header__title {
      font-size: 13px;
      font-weight: bold;
    }
  }

  .n-thing-main__description {
    font-size: 13px;
  }
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  color: var(--color);
  background-color: rgb(from var(--color) r g b / 0.1);

  &.info {
    --color: #00d9ff;
  }

  &.security {
    --color: #ff2f2f;
  }

  &.alert {
    --color: #ffcc00;
  }

  &.order {
    --color: #a74aff;
  }

  &.customer {
    --color: #09c758;
  }
}

.notification-item {
  .notification-content {
    .title {
      font-size: 0.8rem;
      font-weight: bold;
      margin: 0;
    }

    .text {
      font-size: 0.8rem;
    }
  }
}
</style>
