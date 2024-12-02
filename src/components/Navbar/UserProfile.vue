<script setup lang="ts">
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import {
  DoorArrowRight20Regular as LogoutIcon,
  Settings20Regular as SettingsIcon,
} from '@vicons/fluent'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const items: SelectMixedOption[]
  = [
    {
      icon: renderIcon(SettingsIcon),
      label: renderLabel(t('userMenu.profile'), '/account/profile'),
      key: 'options',
    },
    {
      icon: renderIcon(LogoutIcon),
      label: renderLabel(t('userMenu.logout'), '/account/login'),
      key: 'login',
    },
  ]

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon, {}) })
}

function renderLabel(title: string, path: string) {
  return () => h(RouterLink, { to: { path } }, { default: () => title })
}
</script>

<template>
  <div class="flex items-center" v-bind="$attrs">
    <n-dropdown :options="items">
      <img class="avatar" src="@/assets/images/user.png">
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
