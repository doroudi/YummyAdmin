import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'
import type { AppModule } from '~/types'

const storedValue = localStorage.getItem('layout')
let locale = 'en'
if (storedValue) {
  const parsed = JSON.parse(storedValue)
  if (parsed && Object.hasOwn(parsed, 'activeLanguage')) {
    if (['en', 'fa', 'tr', 'ar', 'zn', 'de'].includes(parsed.activeLanguage))
      locale = parsed.activeLanguage
  }
}

const i18n = createI18n({
  legacy: false,
  locale,
  messages,
})

export const install: AppModule = (app) => {
  app.use(i18n)
}

export default i18n
