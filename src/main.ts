import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import type { AppModule } from './types'
import App from './App.vue'
import generatedRoutes from '~pages'
import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import './styles/main.scss'

const routes = setupLayouts(generatedRoutes)

async function enableMocking() {
  const isMocking = import.meta.env.VITE_API_MOCKING_ENABLED
  if (!isMocking)
    return

  const { worker } = await import('~/mocks/browser')
  return worker.start()
}

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
enableMocking().then(() => app.mount('#app'))
