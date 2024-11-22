import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'

import type { AppModule } from './types'
import App from './App.vue'

import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import './styles/main.scss'

declare module '@vue/runtime-core' {

  export interface ComponentCustomProperties {
    $filters: any
  }
}

async function enableMocking() {
  const { worker } = await import('~/mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

const routes = setupLayouts(generatedRoutes)
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
  let title = 'Yummy Admin'
  if (to.meta.title)
    title = `${to.meta.title} - ${title}`

  document.title = title

  next()
})
enableMocking().then(() => app.mount('#app'))
