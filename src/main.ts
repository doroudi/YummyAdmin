import { setupLayouts } from 'virtual:generated-layouts'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.scss'
import { createRouter, createWebHistory } from 'vue-router'
import type { AppModule } from './types'
import App from './App.vue'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

const isMocking = import.meta.env.VITE_API_MOCKING_ENABLED

if (isMocking === 'true') {
  import('~/mocks/browser').then((browser) => {
    browser.worker.start({ onUnhandledRequest: 'bypass' })
    initializeApp()
  })
}
else {
  initializeApp()
}

function initializeApp() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  const app = createApp(App)
  app.use(router)
  Object.values(import.meta.glob<{ install: AppModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app, router))

  router.beforeEach((to, from, next) => {
    // TODO: implement route guards
    next()
  })
  app.mount('#app')
}
