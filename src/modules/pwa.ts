import type { AppModule } from '~/types'

export const install: AppModule = (app, router) => {
  console.log(router)
  router.isReady()
    .then(async () => {
      const { registerSW } = await import('virtual:pwa-register')
      registerSW({ immediate: true })
    }).catch(() => { })

  // registerSW({
  //   onNeedRefresh() {
  //     // useNotificationsStore().addNotification({ message: 'New Version available', permanent: true })
  //   },
  //   onOfflineReady() { },
  // })
}
