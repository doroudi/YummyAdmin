<script setup lang="ts">
import { darkTheme, lightTheme } from 'naive-ui'
import scrollbarRtl from 'naive-ui/es/_internal/scrollbar/styles/rtl'
import { alertRtl } from 'naive-ui/es/alert/styles'
import { buttonRtl } from 'naive-ui/es/button/styles'
import { dialogRtl } from 'naive-ui/es/dialog/styles'
import { drawerRtl } from 'naive-ui/es/drawer/styles'
import { inputRtl } from 'naive-ui/es/input/styles'
import { messageRtl } from 'naive-ui/es/message/styles'
import { tableRtl } from 'naive-ui/es/table/styles'
import { tagRtl } from 'naive-ui/es/tag/styles'

import themeOverrides, {
  darkThemeOverrides,
} from '~/common/theme/theme-overrides'
import useColors from './composables/useColors'

const layout = useLayoutStore()

const rtlStyles = [
  buttonRtl,
  tableRtl,
  inputRtl,
  messageRtl,
  alertRtl,
  scrollbarRtl,
  tagRtl,
  dialogRtl,
  drawerRtl,
]

const customTheme = ref({ ...themeOverrides })
const customDarkTheme = ref({ ...themeOverrides, ...darkThemeOverrides })
const { makeLighter } = useColors()

const activeTheme = computed(() => (layout.isDark ? darkTheme : lightTheme))
const activeThemeOverrides = computed(() =>
  layout.isDark ? customDarkTheme.value : customTheme.value,
)

watch(
  () => layout.isRtl,
  () => {
    const body = document.querySelector('body') as HTMLElement
    if (layout.isRtl) body.classList.add('rtl')
    else body.classList.remove('rtl')
  },
  {
    immediate: true,
  },
)

watch(
  () => layout.isDark,
  (newValue: boolean) => {
    if (newValue) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  },
  { immediate: true },
)

watch(
  () => layout.themeColor,
  (newValue: string) => {
    setThemeColor(newValue)
  },
  { immediate: true },
)

function setThemeColor(newValue: string) {
  if (newValue === '') return

  const shade1 = makeLighter(newValue, 0.8)
  const shade2 = makeLighter(newValue, 0.6)
  const shade3 = makeLighter(newValue, 0.4)
  document.documentElement.style.setProperty('--primary-color', newValue)
  document.documentElement.style.setProperty('--primary-color-shade1', shade1)
  document.documentElement.style.setProperty('--primary-color-shade2', shade2)
  document.documentElement.style.setProperty('--primary-color-shade3', shade3)
  if (!customTheme.value.common || !customDarkTheme.value.common) return

  customTheme.value.common.primaryColor = newValue
  customTheme.value.common.primaryColorHover = shade1
  customTheme.value.common.primaryColorPressed = shade2
  customTheme.value.common.primaryColorSuppl = shade3

  customDarkTheme.value.common.primaryColor = newValue
  customDarkTheme.value.common.primaryColorHover = shade1
  customDarkTheme.value.common.primaryColorPressed = shade2
  customDarkTheme.value.common.primaryColorSuppl = shade3

  customTheme.value.Button = {
    color: newValue,
    colorHover: shade1,
    colorPressed: shade2,
    colorFocus: shade3,
  }
  customDarkTheme.value.common.primaryColor = newValue
  customDarkTheme.value.Button = {
    color: newValue,
    colorHover: shade1,
    colorPressed: shade2,
    colorFocus: shade3,
  }
}
</script>

<template>
  <n-config-provider
    inline-theme-disabled
    :theme="activeTheme"
    :theme-overrides="activeThemeOverrides"
    :rtl="layout.isRtl ? rtlStyles : []"
    :preflight-style-disabled="false"
  >
    <n-notification-provider placement="bottom-right">
      <n-message-provider placement="bottom-right">
        <n-dialog-provider>
          <RouterView />
          <GithubButton />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
