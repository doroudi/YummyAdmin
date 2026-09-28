<script setup lang="ts">
import { storeToRefs } from 'pinia'

const store = useDashboardStore()
const { revenueStat } = storeToRefs(store)
const period = ref('day')

onMounted(() => {
  store.getRevenueStat(period.value)
})

function updatePeriod(value: string) {
  period.value = value
  store.getRevenueStat(value)
}

const { t } = useI18n()
const ranges = [
  { label: t('common.day'), value: 'day' },
  { label: t('common.week'), value: 'week' },
  { label: t('common.month'), value: 'month' },
]

const total = computed(() =>
  (revenueStat.value as number[]).reduce((a, b) => a + b, 0),
)
</script>

<template>
  <div class="p-2">
    <Card stretch-height title-size="normal" :title="t('dashboard.revenueChart.title')">
      <div class="h-full flex flex-col justify-between">
        <div>

          <h3 class="text-3xl font-bold">
            <n-number-animation show-separator :from="0" :to="total" /> <span class="currency">{{ t('currencySign') }}</span>
          </h3>
          <p class="text-xsm text-coolgray font-light pb-2">
            {{ t('dashboard.revenueChart.subtitle') }}
          </p>
        </div>

        <SwitchSelect v-model:value="period" :ranges="ranges" @update:value="updatePeriod" />
        <div v-if="revenueStat.length" class="my-2 -mx-4">
          <Sparkline :data="revenueStat" width="100%" :height="150" color="var(--primary-color)" />
        </div>
      </div>
    </Card>
  </div>
</template>

<style lang="scss">
.currency {
  font-size: 1.2rem;
  color: #555;
}
</style>
