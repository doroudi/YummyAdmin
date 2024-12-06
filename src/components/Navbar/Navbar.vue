<script setup lang="ts">
import { Home28Regular as HomeIcon } from '@vicons/fluent'

const route = useRoute()
const { t } = useI18n()
</script>

<template>
  <n-page-header class="px-2 py-3 navbar">
    <template #title>
      <n-breadcrumb>
        <n-breadcrumb-item>
          <RouterLink to="/">
            <n-icon :component="HomeIcon" /> {{ t('home') }}
          </RouterLink>
        </n-breadcrumb-item>
        <n-breadcrumb-item v-for="item in route.meta.breadcrumb" :key="item">
          {{ t(`menu.${item}`) }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #extra>
      <div class="flex items-center">
        <ThemeCustomize />
        <ThemeSwitch class="mx-1" />
        <LanguageSelect class="mx-1" />
        <Notifications class="mx-1" />
        <UserProfile class="mx-1" />
      </div>
    </template>
  </n-page-header>
</template>

<style lang="scss">
.navbar {
  border-bottom: solid 1px #ececec;
  padding-bottom: 0.4rem;
}

.dark {
  .navbar {
    border-bottom-color: #2f3339;
  }
}
</style>
