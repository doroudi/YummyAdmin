<script setup lang="ts">
import { alertRtl } from 'naive-ui/es/alert/styles'
import { buttonRtl } from 'naive-ui/es/button/styles'
import { inputRtl } from 'naive-ui/es/input/styles'
import { messageRtl } from 'naive-ui/es/message/styles'
import { paginationRtl } from 'naive-ui/es/pagination/styles'
import { tableRtl } from 'naive-ui/es/table/styles'
import scrollbarRtl from 'naive-ui/es/_internal/scrollbar/styles/rtl'
import { tagRtl } from 'naive-ui/es/tag/styles'
import themeOverrides from '~/common/theme/theme-overrides'

const layout = useLayoutStore()

const rtlStyles = [
  buttonRtl,
  tableRtl,
  inputRtl,
  paginationRtl,
  messageRtl,
  alertRtl,
  scrollbarRtl,
  tagRtl,
]
// const { t } = useI18n()

useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Description' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

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
  <n-config-provider :theme-overrides="themeOverrides" :rtl="rtlStyles" preflight-style-disabled>
    <n-notification-provider placement="bottom">
      <n-message-provider placement="bottom">
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
