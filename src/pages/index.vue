<script setup lang="ts">
import {
  Cart16Regular as BasketIcon,
  Box16Regular as BoxIcon,
  DataTrending16Regular as StatIcon,
  People16Regular as UserIcon,
} from '@vicons/fluent'

const { t } = useI18n()
</script>

<route lang="yaml">
meta:
  name: dashboard
  title: Home
</route>

<template>
  <div class="margin-outside flex flex-wrap pb-3">
    <DashboardCard :title="t('dashboard.registers')" :progress="10" :value="250">
      <NIcon class="icon text-lime-500">
        <UserIcon />
      </NIcon>
    </DashboardCard>
    <DashboardCard :title="t('dashboard.products')" :progress="10" :value="3600">
      <NIcon class="icon text-red-500">
        <BoxIcon />
      </NIcon>
    </DashboardCard>
    <DashboardCard :title="t('dashboard.sells')" :progress="-50" :value="5000">
      <NIcon class="icon text-cyan-400">
        <BasketIcon />
      </NIcon>
    </DashboardCard>
    <DashboardCard :title="t('dashboard.visits')" :progress="-1" :value="1500">
      <NIcon class="icon text-amber-500">
        <StatIcon />
      </NIcon>
    </DashboardCard>
    <DashboardCard :title="t('dashboard.activeOrders')" :progress="-1" :value="1500">
      <NIcon class="icon text-amber-400">
        <StatIcon />
      </NIcon>
    </DashboardCard>
  </div>

  <div>
    <div class="flex flex-col lg:flex-row margin-outside pb-3">
      <div class="flex flex-col w-full lg:w-1/3">
        <Card class="px-2" no-shadow>
          <template #title>
            <h3 class="font-700 mt-1 mb-4">
              {{ t('dashboard.summary') }}
            </h3>
          </template>
          <LineChart />
        </Card>
        <Card class="px-2" no-shadow>
          <template #title>
            <h3 class="font-700 mt-1 mb-4">
              {{ t('dashboard.summary') }}
            </h3>
          </template>
          <DonutChart />
        </Card>
      </div>
      <div class="w-full lg:w-2/3 px-2">
        <Card no-shadow>
          <template #title>
            <h3 class="font-700 mt-1 mb-4">
              {{ t('dashboard.summary') }}
            </h3>
          </template>
          <BarChart />
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
