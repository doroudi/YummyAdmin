<script setup lang="ts">
import { storeToRefs } from 'pinia'
import {
  Cart16Regular as BasketIcon,
  Box16Regular as BoxIcon,
  DataTrending16Regular as StatIcon,
  People16Regular as UserIcon,
} from '@vicons/fluent'

const { t } = useI18n()
const store = useDashboardStore()
const { summaryStat, isLoading } = storeToRefs(store)
</script>

<template>
  <div>
    <div class="margin-outside flex flex-wrap pb-3">
      <SummaryStatCard
        class="w-full sm:w-1/2 md:w-1/4"
        :loading="isLoading" :data="summaryStat.registers" :title="t('dashboard.registers')"
        :icon="UserIcon"
      />
      <SummaryStatCard
        class="w-full sm:w-1/2 md:w-1/4"
        :loading="isLoading" :data="summaryStat.products" :title="t('dashboard.products')"
        :icon="BoxIcon"
      />
      <SummaryStatCard
        class="w-full sm:w-1/2 md:w-1/4"
        :loading="isLoading" :data="summaryStat.sells" :title="t('dashboard.sells')"
        :icon="BasketIcon"
      />
      <SummaryStatCard
        class="w-full sm:w-1/2 md:w-1/4"
        :loading="isLoading" :data="summaryStat.visits" :title="t('dashboard.visits')"
        :icon="StatIcon"
      />
    </div>
    <div>
      <div class="flex flex-col lg:flex-row margin-outside pb-3">
        <div class="w-full lg:w-2/3 p-2">
          <Card :title="t('dashboard.summary')">
            <BarChart />
          </Card>
        </div>
        <div class="flex flex-col w-full lg:w-1/3">
          <Card class="p-2" :title="t('dashboard.summary')">
            <LineChart />
          </Card>
          <UsersGenderChart />
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

<style lang="scss" scoped></style>
