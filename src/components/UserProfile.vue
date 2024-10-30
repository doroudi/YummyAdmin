<script setup lang="ts">
import { ChevronCircleDown20Regular as ChevronIcon } from '@vicons/fluent'
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
    
    <!-- <div class="flex flex-col p-2">
      <h3 class="username">
        User Name
      </h3>
      <h5 class="role text-dark dark:text-slate-400">
        User Role
      </h5>
    </div> -->

    <n-popselect v-model="selectedItem" :options="items" @update:value="doMenuAction">
      
      <img class="avatar" src="@/assets/images/user.png">
      <!-- <n-button mx-2 text size="small" circle>
        <template #icon>
          <n-icon size="1.4rem">
            <ChevronIcon />
          </n-icon>
        </template>
      </n-button> -->
    </n-popselect>
    <!-- <TieredMenu ref="menu" :model="items" :popup="true" /> -->
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
