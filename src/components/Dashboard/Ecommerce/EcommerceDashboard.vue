<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  Cart16Regular as BasketIcon,
  Box16Regular as BoxIcon,
  DataTrending16Regular as StatIcon,
  People16Regular as UserIcon,
} from '@vicons/fluent'

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
        <SellChart class="w-full lg:w-1/4" />
        <RegisterSourceChart class="w-full lg:w-1/4" />
      </div>

      <div class="flex flex-col lg:flex-row margin-outside w-full pb-1">
        <div class="flex flex-wrap w-1/2">
          <SummaryStatCard
            class="w-full sm:w-1/2" :loading="isLoading" :data="summaryStat.registers"
            :title="t('dashboard.registers')" :icon="UserIcon"
          />
          <SummaryStatCard
            class="w-full sm:w-1/2" :loading="isLoading" :data="summaryStat.products"
            :title="t('dashboard.products')" :icon="BoxIcon"
          />
          <SummaryStatCard
            class="w-full sm:w-1/2" :loading="isLoading" :data="summaryStat.sells"
            :title="t('dashboard.sells')" :icon="BasketIcon"
          />
          <SummaryStatCard
            class="w-full sm:w-1/2" :loading="isLoading" :data="summaryStat.visits"
            :title="t('dashboard.visits')" :icon="StatIcon"
          />
        </div>

        <div class="flex flex-col lg:flex-row w-full lg:w-1/2">
          <UsersPlatformChart class="w-full lg:w-1/2" />
          <SellChart class="w-full lg:w-1/2" />
        </div>
      </div>

      <div class="flex flex-wrap margin-outside">
        <div class="w-full lg:w-1/2 px-2">
          <Card :title="t('dashboard.recentOrders')">
            <RecentOrders />
          </Card>
        </div>
        <div class="w-full lg:w-1/2 px-2">
          <Card :title="t('dashboard.recentOrders')">
            <RecentOrders />
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
