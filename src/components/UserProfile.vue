<script setup lang="ts">
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'

const { t } = useI18n()
const selectedItem = ref('')
const router = useRouter()
const items: SelectMixedOption[]
  = [
    { label: t('userMenu.options'), value: '/options' },
    {
      label: t('userMenu.logout'),
      value: '/account/login',

    },
  ]

function doMenuAction(value: string) {
  router.push(value)
}
</script>

<template>
  <div class="flex items-center">
    <n-popselect v-model="selectedItem" :options="items" @update:value="doMenuAction">
      <img class="avatar" src="@/assets/images/user.png">
    </n-popselect>
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
