<script setup>
import { DataTrending16Regular as StatIcon } from '@vicons/fluent'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const store = useCategoryStore()
const { categoryStats, isLoadingStats } = storeToRefs(store)

onMounted(() => {
  store.getCategoryStats()
})
</script>

<template>
  <div class="">
    {{ categoryStats.count }}
    <h2 class="card-title px-2 pb-4">
      {{ t('categories.stat') }}
    </h2>
    <SummaryStatCard
      class="w-full" :data="categoryStats.summaryStats" :loading="isLoadingStats"
      :title="t('categories.stat')" :icon="StatIcon"
    />
    <h2 class="card-title px-2 py-4">
      {{ t('categories.topCategories') }}
    </h2>
    <DonutChart
      v-if="!isLoadingStats && categoryStats.productsByCategoryStat" :data="categoryStats.productsByCategoryStat"
      :show-legend="false" color-scheme="#4FC3F7"
    />
  </div>
</template>

<style lang="scss" scoped>
.card-title {
  font-size: 1rem;
}
</style>
