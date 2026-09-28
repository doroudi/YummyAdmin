<script lang="ts" setup>
import { ArrowCounterclockwise32Filled as RandomIcon } from '@vicons/fluent'
import type { SimpleChartSeries } from '~/models/ChartData'

const { t } = useI18n()

function buildData(): SimpleChartSeries[] {
  return [
    { name: 'Desktop', value: 4321 },
    { name: 'Mobile', value: 5001 },
    { name: 'Tablet', value: 1112 },
    { name: 'Unknown', value: 880 },
  ]
}

const data = ref<SimpleChartSeries[]>(buildData())
const isLoading = ref(false)

function reload() {
  isLoading.value = true
  data.value = buildData()
  isLoading.value = false
}
</script>

<template>
  <Card stretch-height title-size="medium">
    <template #title>
      <header class="flex w-full flex-row justify-between items-center pb-5">
        <h3 class="title text-lg">🍩 Donut Chart Demo</h3>
        <n-tooltip placement="top" trigger="hover">
          <template #trigger>
            <n-button quaternary circle>
              <n-icon :component="RandomIcon" @click="reload" />
            </n-button>
          </template>
          {{ t('common.refresh') }}
        </n-tooltip>
      </header>
    </template>
    <div class="pt-2">
      <DonutChart :data="data" :loading="isLoading" :height="300" />
    </div>
  </Card>
</template>
