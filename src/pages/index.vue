<script setup lang="ts">
import {
  Cart16Regular as BasketIcon,
  Box16Regular as BoxIcon,
  DataTrending16Regular as StatIcon,
  People16Regular as UserIcon,
} from '@vicons/fluent'

const { t } = useI18n()
// const { options } = useOptions()
</script>

<route lang="yaml">
meta:
  name: dashboard
  title: Home
</route>

<template>
  <div class="margin-outside flex pb-3">
    <DashboardCard class="w-1/5" :title="t('dashboard.registers')" :progress="10" :value="250">
      <NIcon class="icon text-lime-500"><UserIcon /></NIcon>
    </DashboardCard>
    <DashboardCard class="w-1/5" :title="t('dashboard.products')" :progress="10" :value="3600">
      <NIcon class="icon text-red-500"><BoxIcon /></NIcon>
    </DashboardCard>
    <DashboardCard class="w-1/5" :title="t('dashboard.sells')" :progress="-50" :value="5000">
      <NIcon class="icon text-cyan-400"><BasketIcon /></NIcon>
    </DashboardCard>
    <DashboardCard class="w-1/5" :title="t('dashboard.visits')" :progress="-1" :value="1500">
      <NIcon class="icon text-amber-500"><StatIcon /></NIcon>
      </DashboardCard>
    <DashboardCard class="w-1/5 " :title="t('dashboard.activeOrders')" :progress="-1" :value="1500">
      <NIcon class="icon text-amber-400"><StatIcon /></NIcon>
    </DashboardCard>
  </div>

  <div>
    <div class="flex margin-outside pb-3">
      <div class="flex flex-col w-1/3">
        <Card class="px-2" no-shadow>
          <template #header>
            <h3 class="font-500">
              {{ t('dashboard.summary') }}
            </h3>
          </template>
          <LineChart />
        </Card>
        <Card class="px-2" no-shadow>
          <DonutChart />
        </Card>
      </div>
      <div class="w-2/3 px-2">
        <Card no-shadow>
          <template #header>
            <h3 class="font-500">
              {{ t('dashboard.summary') }}
            </h3>
          </template>
          <BarChart />
        </Card>
      </div>
    </div>

    <div class="flex margin-outside pb-3">
      <div class="flex flex-col w-1/3">
        <Card class="px-2" no-shadow>
          <template #header>
            <h3 class="font-500">
              {{ t('dashboard.summary') }}
            </h3>
          </template>
          <LineChart />
        </Card>
        <Card class="px-2" no-shadow>
          <DonutChart />
        </Card>
      </div>
      <div class="w-2/3 px-2">
        <Card no-shadow>
          <template #header>
            <h3 class="font-500">
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
