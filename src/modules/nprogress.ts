import NProgress from 'nprogress'
import type { AppModule } from '~/types'

export const install: AppModule = (app: any, router: any) => {
  router.beforeEach((to: any, from: any) => {
    if (to.path !== from.path) NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
