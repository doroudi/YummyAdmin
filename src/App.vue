<script setup lang="ts">
import { alertRtl } from 'naive-ui/es/alert/styles'
import { buttonRtl } from 'naive-ui/es/button/styles'
import { inputRtl } from 'naive-ui/es/input/styles'
import { messageRtl } from 'naive-ui/es/message/styles'
import { tableRtl } from 'naive-ui/es/table/styles'
import scrollbarRtl from 'naive-ui/es/_internal/scrollbar/styles/rtl'
import { tagRtl } from 'naive-ui/es/tag/styles'
import { darkTheme, lightTheme } from 'naive-ui'
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
]

watch(() => layout.activeLanguage, () => {
  const body = document.querySelector('body') as HTMLElement
  if (layout.isRtl)
    body.classList.add('rtl')
  else
    body.classList.remove('rtl')
}, {
  immediate: true,
})
</script>

<template>
  <n-config-provider
    :theme="isDark ? darkTheme : lightTheme" :theme-overrides="themeOverrides"
    :rtl="layout.isRtl ? rtlStyles : []" :preflight-style-disabled="false"
  >
    <n-notification-provider placement="bottom-right">
      <n-message-provider placement="bottom-right">
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
