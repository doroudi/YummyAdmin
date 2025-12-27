<script lang="ts" setup>
import {
  ArrowCounterclockwise32Filled as RandomIcon,
  Settings24Regular as SettingIcon,
} from '@vicons/fluent'
import type { ChartData } from '~/models/ChartData'
import reportService from '~/services/report.service'

const monthlySellStat = ref<ChartData | null>(null)
const isLoading = ref(true)

onMounted(() => loadData())

async function loadData() {
  try {
    isLoading.value = true
    monthlySellStat.value = await reportService.getMonthlySellStat()
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Card stretch-height title-size="medium">
    <template #title>
      <header class="flex w-full flex-row justify-between items-center pb-5" title="">
        <h3 class="title text-lg">📈 Line Chart Demo</h3>
        <div>
          <n-tooltip placement="top" trigger="hover">
            <template #trigger>
              <n-button quaternary circle>
                <n-icon @click="loadData" :component="RandomIcon"></n-icon>
              </n-button>
            </template>
            {{ t('common.refresh') }}
          </n-tooltip>

          <n-tooltip placement="top" trigger="hover">
            <template #trigger>
              <n-button quaternary circle>
                <n-icon @click="loadData" :component="SettingIcon"></n-icon>
              </n-button>
            </template>
            {{ t('common.settings') }}
          </n-tooltip>
        </div>
      </header>
    </template>
    <div class="pt-2">
      <LineChart :data="monthlySellStat" :loading="isLoading" :height="300" />
    </div>
  </Card>
</template>
