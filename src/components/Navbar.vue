<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  PanelLeftContract16Regular as CollapseIcon,
  PanelLeftExpand20Regular as OpenIcon,
} from '@vicons/fluent'
import GithubButton from 'vue-github-button'

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
        <ThemeSwitch mx-2 />

        <!-- Place this tag where you want the button to render. -->
        <GithubButton
          href="https://github.com/doroudi/YummyAdmin"
          class="mx-1 mt-1"
          data-color-scheme="no-preference: dark; light: light; dark: dark;" data-size="large"
          aria-label="Star doroudi/YummyAdmin on GitHub"
        >
          GitHub
        </GithubButton>
        <LanguageSelect mx-2 />
        <UserProfile mx-2 />
      </div>
    </template>
  </n-page-header>
</template>

<style lang="scss">
.navbar {
  border-bottom: solid 1px #ececec;
  padding-bottom: 0.4rem;
}
</style>
