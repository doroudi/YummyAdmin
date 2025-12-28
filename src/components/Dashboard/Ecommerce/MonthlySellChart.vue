<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const store = useDashboardStore()

const { monthlySellStat, isLoadingMonthlyStat } = storeToRefs(store)
const colors = ['var(--primary-color)', 'var(--primary-color-shade1)']

onMounted(async () => {
  await store.getMonthlySellStat()
})
</script>

<template>
  <div class="p-2">
    <Card stretch-height title-size="medium" :title="'📈 ' + t('dashboard.monthlySell')">
      <div class="pt-5">
        <BarChart :loading="isLoadingMonthlyStat" :height="300" :data="monthlySellStat" :colors="colors" />
      </div>
    </Card>
  </div>
</template>