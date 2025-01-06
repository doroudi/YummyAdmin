<script setup lang="ts">
import {
  Cart16Regular as BasketIcon,
  Box16Regular as BoxIcon,
  DataTrending16Regular as StatIcon,
  People16Regular as UserIcon,
} from '@vicons/fluent'

const { t } = useI18n()
const layout = useLayoutStore()
const notify = useNotifyStore()

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

onMounted(() => {
  if (!layout.isWelcomeShown) {
    setTimeout(() => {
      notify.notify({ body: t('notify.welcome'), type: 'success', duration: 10000 })
      layout.showWelcome()
    }, 2000)
  }
})
</script>

<template>
  <div class="margin-outside flex flex-wrap pb-3">
    <DashboardCard color="#84cc16" :title="t('dashboard.registers')" :progress="10" :value="random(1000, 4000)">
      <NIcon class="icon text-lime-500">
        <UserIcon />
      </NIcon>
    </DashboardCard>
    <DashboardCard color="#ef4444" :title="t('dashboard.products')" :progress="10" :value="random(100, 1000)">
      <NIcon class="icon text-red-500">
        <BoxIcon />
      </NIcon>
    </DashboardCard>
    <DashboardCard color="#22d3ee" :title="t('dashboard.sells')" :progress="-50" :value="random(1000, 4000)">
      <NIcon class="icon text-cyan-400">
        <BasketIcon />
      </NIcon>
    </DashboardCard>
    <DashboardCard color="#f59e0b" :title="t('dashboard.visits')" :progress="-1" :value="random(1000, 4000)">
      <NIcon class="icon text-amber-500">
        <StatIcon />
      </NIcon>
    </DashboardCard>
  </div>

  <div>
    <div class="flex flex-col lg:flex-row margin-outside pb-3">
      <div class="flex flex-col w-full lg:w-1/3">
        <Card class="p-2" :title="t('dashboard.summary')">
          <LineChart />
        </Card>
        <Card class="p-2" :title="t('dashboard.summary')">
          <DonutChart />
        </Card>
      </div>
      <div class="w-full lg:w-2/3 p-2">
        <Card :title="t('dashboard.summary')">
          <BarChart />
        </Card>
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

<style lang="scss" scoped></style>
