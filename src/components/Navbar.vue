<script setup lang="ts">
import { ref } from 'vue'

const { t } = useI18n()
const languageMenu = ref()
const layout = useLayoutStore()
const toggleButtonState = ref(layout.collapsed)
const { availableLocales, locale } = useI18n()

function update() {
  layout.toggleSidebar()
}
function toggleLanguageMenu(event: any) {
  languageMenu.value.toggle(event)
}
const languages = availableLocales.map((x) => {
  return {
    label: t(x),
    command: () => layout.changeLanguage(x),
  }
})
</script>

<template>
  <n-page-header subtitle="A podcast to improve designs">
    <template #header />
    <template #avatar>
      <n-avatar
        src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
      />
    </template>

    <template #extra>
      <div class="flex items-center">
        <i v-if="isDark" class="i-bx-sun" @click="layout.toggleTheme()" />
        <i v-else class="i-bx-moon" @click="layout.toggleTheme()" />
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
