<script setup lang="ts">
const { t } = useI18n()
const store = useDashboardStore()
const layout = useLayoutStore()

onMounted(() => {
  store.getSummaryStat()
  if (!layout.isWelcomeShown) {
    layout.showWelcome()
  }
})
</script>

<template>
  <div>
    <div class="box-row">
      <WelcomeCard class="w-full lg:w-2/4" />
      <RevenueChart class="w-full lg:w-1/4" />
      <RegisterSourceChart class="w-full lg:w-1/4" />
    </div>

    <div class="flex flex-col lg:flex-row margin-outside w-full pb-1">
      <div class="lg:w-3/4 w-full">
        <MonthlySellChart />
      </div>

      <div class="flex flex-col lg:flex-row w-full lg:w-1/4">
        <DailySellChart class="w-full" />
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
</template>

<style lang="scss" scoped>
.box-row {
  min-height: 350px;
}
</style>
