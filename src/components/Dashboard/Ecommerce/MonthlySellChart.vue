<script setup lang="ts">
import { storeToRefs } from 'pinia'
const { t } = useI18n()
const store = useDashboardStore()

onMounted(() => {
  store.getMonthlySellStat()
})

const { monthlySellStat, isLoading } = storeToRefs(store)
const colors = ['var(--primary-color)', 'var(--primary-color-shade1)']
</script>

<template>
  <div class="p-2">
    <Card stretch-height title-size="normal" :title="t('dashboard.monthlySell')">
      <BarChart v-if="!isLoading && monthlySellStat" :height="300" :data="monthlySellStat" :colors="colors" />
    </Card>
  </div>
</template>

<style lang="scss">

</style>
