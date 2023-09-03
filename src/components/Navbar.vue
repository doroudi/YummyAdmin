<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import {
  ChevronBackOutline as CollapseIcon,
  ChevronForwardOutline as OpenIcon,
} from '@vicons/ionicons5'

const { t } = useI18n()
const languageMenu = ref()
const layoutStore = useLayoutStore()
const { collapsed } = storeToRefs(layoutStore)
const { availableLocales, locale } = useI18n()

function update() {
  layoutStore.toggleSidebar()
}
function toggleLanguageMenu(event: any) {
  languageMenu.value.toggle(event)
}
const languages = availableLocales.map((x) => {
  return {
    label: t(x),
    command: () => layoutStore.changeLanguage(x),
  }
})
</script>

<template>
  <n-page-header class="p-2">
    <template #title>
      <n-button circle @click="layoutStore.toggleSidebar">
        <template #icon>
          <NIcon>
            <OpenIcon v-if="collapsed" />
            <CollapseIcon v-else />
          </NIcon>
        </template>
      </n-button>
    </template>
    <template #extra>
      <div class="flex items-center">
        <i v-if="isDark" class="i-bx-sun" @click="layoutStore.toggleTheme()" />
        <i v-else class="i-bx-moon" @click="layoutStore.toggleTheme()" />
        <div v-badge.danger class="mx-3">
          <i class="pi pi-bell p-badge-danger shake-item" />
        </div>
        <div>
          <Button :label="t(locale)" class="p-button-plain p-button-text p-button-sm" @click="toggleLanguageMenu" />
          <Menu ref="languageMenu" :model="languages" :popup="true" />
        </div>

        <UserProfile />
      </div>
    </template>
  </n-page-header>
  <nav class="navbar flex p-1 justify-between items-center">
    <div class="flex items-center justify-between">
      <!-- <n-toggle
        v-model="toggleButtonState" on-label=""
        class="p-button p-button-rounded p-button-link  p-button-plain p-button-sm" off-label=""
        off-icon="i-bx-menu-alt-left" on-icon="i-bx-menu" @change="update()"
      /> -->
      <!-- <BreadCrumb /> -->
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  border-bottom: solid 1px #ececec;
  padding-bottom: 0.4rem;
}

.p-togglebutton.p-button {
  background-color: transparent;
  border: none;
  color: #333;
  box-shadow: none;

  &.p-highlight {
    background-color: transparent;
    border: none;

    .p-button-icon-left,
    .p-togglebutton.p-button.p-highlight .p-button-icon-right {
      color: var(--surface-600);
    }

    &:hover {
      background-color: transparent;

      .p-button-icon-left,
      .p-togglebutton.p-button.p-highlight .p-button-icon-right {
        color: var(--surface-600);
      }
    }
  }
}
</style>
