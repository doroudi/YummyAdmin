<script setup lang="ts">
import {
  DoorArrowRight20Regular as LogoutIcon,
  Settings20Regular as SettingsIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'

const { renderLabel, renderIcon } = useRender()
const profileStore = useProfileStore()
const { userProfile } = storeToRefs(profileStore)
const { t } = useI18n()
onMounted(() => profileStore.loadUserProfile())
const items: any[]
  = [
    {
      icon: renderIcon(SettingsIcon),
      label: () => renderLabel(t('userMenu.profile'), '/account/profile'),
      key: 'options',
    },
    {
      icon: renderIcon(LogoutIcon),
      label: () => renderLabel(t('userMenu.logout'), '/account/login'),
      key: 'login',
    },
  ]
</script>

<template>
  <div class="flex items-center" v-bind="$attrs">
    <n-dropdown :options="items">
      <img class="avatar" :src="userProfile.avatar" alt="avatar">
    </n-dropdown>
  </div>
</template>

<style lang="scss">
.username {
  font-size: 0.8rem;
  font-weight: bold;
}

.avatar {
  width: 33px;
  height: 33px;
  border-radius: 50%;
}

.role {
  font-size: 0.7rem;
}

.p-tieredmenu .p-menuitem-active>.p-submenu-list {
  right: 100%;
  left: auto;
}

.rtl {

  .p-tieredmenu .p-menuitem-active>.p-submenu-list {
    right: auto;
    left: 100%;
  }
}
</style>
