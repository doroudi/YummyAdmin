<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const notify = useNotifyStore()
const store = useDashboardStore()
const { isLoading, summaryStat } = storeToRefs(store)
const layout = useLayoutStore()

onMounted(() => {
  store.getSummaryStat()
  if (!layout.isWelcomeShown) {
    setTimeout(() => {
      notify.notify({ body: t('notify.welcome'), type: 'success', duration: 10000 })
      layout.showWelcome()
    }, 2000)
  }
})
</script>

<template>
  <div>
    <div>
      <div class="line-row flex flex-col justify-stretch items-stretch lg:flex-row margin-outside w-full">
        <WelcomeCard class="w-full lg:w-2/4" />
        <RevenueChart class="w-full lg:w-1/4" />
        <RegisterSourceChart class="w-full lg:w-1/4" />
      </div>

      <div class="flex flex-col lg:flex-row margin-outside w-full pb-1">
        <div class="w-1/2">
          <VisitsChart />
        </div>

        <div class="flex flex-col lg:flex-row w-full lg:w-1/2">
          <UsersPlatformChart class="w-full lg:w-1/2" />
          <RevenueChart class="w-full lg:w-1/2" />
        </div>
      </div>

      <div class="flex flex-wrap margin-outside">
        <div class="w-full lg:w-1/2 px-2">
          <Card :title="t('dashboard.recentOrders')">
            <RecentOrders />
          </Card>
        </div>
        <div class="w-full lg:w-1/2 px-2">
          <Card :title="t('dashboard.trendingProducts')">
            <TrendingProducts />
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-row {
  min-height: 350px;
}
</style>
