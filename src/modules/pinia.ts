import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { AppModule } from '~/types'

// Setup Pinia
// https://pinia.vuejs.org/
export const install: AppModule = (app) => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
