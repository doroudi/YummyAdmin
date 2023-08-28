import { registerSW } from 'virtual:pwa-register'
import type { AppModule } from '~/types'

export const install: AppModule = () => {
  registerSW({
    onNeedRefresh() {
      // useNotificationsStore().addNotification({ message: 'New Version available', permanent: true })
    },
    onOfflineReady() { },
  })
}
