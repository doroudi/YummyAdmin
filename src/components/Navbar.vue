<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  PanelLeftContract16Regular as CollapseIcon,
  WeatherMoon48Regular as MoonIcon,
  PanelLeftExpand20Regular as OpenIcon,
  WeatherSunny48Regular as SunIcon,
} from '@vicons/fluent'

const layoutStore = useLayoutStore()
const { collapsed } = storeToRefs(layoutStore)
</script>

<template>
  <n-page-header class="p-2 navbar">
    <template #title>
      <n-button mx-2 text size="small" circle @click="layoutStore.toggleSidebar">
        <template #icon>
          <n-icon size="1.4rem">
            <OpenIcon v-if="collapsed" />
            <CollapseIcon v-else />
          </n-icon>
        </template>
      </n-button>
    </template>
    <template #extra>
      <div class="flex items-center">
        <n-button text circle @click="layoutStore.toggleTheme()">
          <template #icon>
            <NIcon size="1.4rem">
              <SunIcon v-if="isDark" />
              <MoonIcon v-else />
            </NIcon>
          </template>
        </n-button>
        <div class="mx-2">
          <LanguageSelect />
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
