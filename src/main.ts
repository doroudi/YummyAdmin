import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import type { AppModule } from './types'
import App from './App.vue'
import i18n from './modules/i18n'
import generatedRoutes from '~pages'
import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import './styles/main.scss'

const routes = setupLayouts(generatedRoutes)
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: any
  }
}
async function enableMocking() {
  const isMocking = import.meta.env.VITE_API_MOCKING_ENABLED
  if (!isMocking)
    return

  const { worker } = await import('~/mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const app = createApp(App)
app.use(router)
Object.values(import.meta.glob<{ install: AppModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app, router))

// register filters
app.config.globalProperties.$filters = {}
Object.values(import.meta.glob<any>('./common/filters/*.filter.ts', { eager: true, import: 'default' }))
  .forEach(filters => Object.keys(filters).forEach(func => app.config.globalProperties.$filters[func] = filters[func]))

router.beforeEach((to, from, next) => {
  // @ts-expect-error "Type instantiation is excessively deep and possibly infinite.ts(2589)"
  const { t } = i18n.global
  let title = t('title')
  if (to.meta.title)
    title = `${to.meta.title} - ${title}`

  document.title = title

  const isAuthenticated = useAccountStore().isAuthenticated()
  const isAuthRequired = to.meta.authRequired ?? true
  if (isAuthRequired && !isAuthenticated) {
    next({ path: 'account/login' })
    return
  }

  next()
})
enableMocking().then(() => app.mount('#app'))
