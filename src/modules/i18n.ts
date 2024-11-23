import { createI18n } from 'vue-i18n'
import type { AppModule } from '~/types'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', { eager: true }))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)

const storedValue = localStorage.getItem('layout')
let locale = 'en'
if (storedValue) {
  const parsed = JSON.parse(storedValue)
  if (parsed && Object.prototype.hasOwnProperty.call(parsed, 'activeLanguage')) {
    if (['en', 'fa', 'tr', 'ar', 'ch', 'de'].includes(parsed.activeLanguage))
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
