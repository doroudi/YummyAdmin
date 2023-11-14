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

<template>
  <div class="margin-outside flex pb-3">
    <DashboardCard class="w-1/5" :icon="UserIcon" title="Registers" :progress="10" :value="250" />
    <DashboardCard class="w-1/5" :icon="BoxIcon" title="Products" :progress="10" :value="3600" />
    <DashboardCard class="w-1/5" :icon="BasketIcon" title="Sells" :progress="-50" :value="5000" />
    <DashboardCard class="w-1/5" :icon="StatIcon" title="Visits" :progress="-1" :value="1500" />
    <DashboardCard class="w-1/5" :icon="StatIcon" title="Visits" :progress="-1" :value="1500" />
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
