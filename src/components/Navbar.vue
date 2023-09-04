<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  ChevronBackOutline as CollapseIcon,
  Moon as MoonIcon,
  ChevronForwardOutline as OpenIcon,
  Sunny as SunIcon,
} from '@vicons/ionicons5'

const { t } = useI18n()
const layoutStore = useLayoutStore()
const { collapsed, activeLanguage } = storeToRefs(layoutStore)
const { availableLocales } = useI18n()
const language = ref(activeLanguage)

const languages = availableLocales.map((x) => {
  return {
    label: t(x),
    value: x,
  }
})

function changeLanguage(lang: string) {
  layoutStore.changeLanguage(lang)
}
</script>

<template>
  <n-page-header class="p-2 navbar">
    <template #title>
      <n-button mx-2 text size="tiny" circle @click="layoutStore.toggleSidebar">
        <template #icon>
          <n-icon>
            <OpenIcon v-if="collapsed" />
            <CollapseIcon v-else />
          </n-icon>
        </template>
      </n-button>
    </template>
    <template #extra>
      <div class="flex items-center">
        <n-button text size="small" circle @click="layoutStore.toggleTheme()">
          <template #icon>
            <NIcon>
              <SunIcon v-if="isDark" />
              <MoonIcon v-else />
            </NIcon>
          </template>
        </n-button>

        <!-- <div v-badge.danger class="mx-3">
          <i class="pi pi-bell p-badge-danger shake-item" />
        </div> -->
        <div class="mx-2">
          <n-popselect v-model="language" :options="languages" @change="changeLanguage">
            <n-button>{{ t(activeLanguage) }}</n-button>
          </n-popselect>
          <!-- <Button :label="t(locale)" class="p-button-plain p-button-text p-button-sm" @click="toggleLanguageMenu" />
          <Menu ref="languageMenu" :model="languages" :popup="true" /> -->
        </div>

        <UserProfile />
      </div>
    </template>
  </n-page-header>
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
