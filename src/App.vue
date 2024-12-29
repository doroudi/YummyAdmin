<script setup lang="ts">
import { alertRtl } from 'naive-ui/es/alert/styles'
import { buttonRtl } from 'naive-ui/es/button/styles'
import { inputRtl } from 'naive-ui/es/input/styles'
import { messageRtl } from 'naive-ui/es/message/styles'
import { tableRtl } from 'naive-ui/es/table/styles'
import scrollbarRtl from 'naive-ui/es/_internal/scrollbar/styles/rtl'
import { tagRtl } from 'naive-ui/es/tag/styles'
import { dialogRtl } from 'naive-ui/es/dialog/styles'
import { drawerRtl } from 'naive-ui/es/drawer/styles'
import { darkTheme, lightTheme } from 'naive-ui'

import useColors from './composables/colors'
import themeOverrides from '~/common/theme/theme-overrides'

const layout = useLayoutStore()

const rtlStyles = [
  buttonRtl,
  tableRtl,
  inputRtl,
  // paginationRtl,
  messageRtl,
  alertRtl,
  scrollbarRtl,
  tagRtl,
  dialogRtl,
  drawerRtl,
]

const customTheme = ref({ ...themeOverrides })
const { makeDarker, makeLighter } = useColors()

watch(() => layout.activeLanguage, () => {
  const body = document.querySelector('body') as HTMLElement
  if (layout.isRtl)
    body.classList.add('rtl')
  else
    body.classList.remove('rtl')
}, {
  immediate: true,
})

watch(() => layout.isDark, (newValue) => {
  if (newValue)
    document.documentElement.classList.add('dark')
  else
    document.documentElement.classList.remove('dark')
}, { immediate: true })

watch(() => layout.themeColor, (newValue) => {
  if (customTheme.value.common && newValue !== '') {
    customTheme.value.common.primaryColor = newValue
    document.documentElement.style.setProperty('--primary-color', newValue)
    document.documentElement.style.setProperty('--primary-color-shade1', makeLighter(newValue, 0.8))
    document.documentElement.style.setProperty('--primary-color-shade2', makeLighter(newValue, 0.6))
    document.documentElement.style.setProperty('--primary-color-shade3', makeLighter(newValue, 0.4))
  }
}, { immediate: true })
</script>

<template>
  <n-config-provider
    :theme="layout.isDark ? darkTheme : lightTheme" :theme-overrides="customTheme"
    :rtl="layout.isRtl ? rtlStyles : []" :preflight-style-disabled="false"
  >
    <n-notification-provider placement="bottom-right">
      <n-message-provider placement="bottom-right">
        <n-dialog-provider>
          <router-view />
          <GithubButton />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
