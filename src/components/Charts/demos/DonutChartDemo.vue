<script lang="ts" setup>
import type { ChartData } from '~/models/ChartData'
import reportService from '~/services/report.service'

const monthlySellStat = ref<ChartData | null>(null)
const isLoading = ref(true)
onMounted(async () => {
  try {
    isLoading.value = true
    monthlySellStat.value = await reportService.getMonthlySellStat()
  } finally {
    isLoading.value = false
  }
})

function handleChartClick() {}

function handleDataError() {}

function retryLoad() {}
</script>

<template>
    <ChartComponent :data="monthlySellStat" :loading="isLoading" :height="400" chart-type="donut"
        @chart-click="handleChartClick" @data-error="handleDataError">
        <template #error-action>
            <n-button @click="retryLoad">Retry</n-button>
        </template>
    </ChartComponent>
    <!-- <BarChart :loading="isLoading" :height="300" :data="monthlySellStat" :colors="colors" /> -->
</template>
