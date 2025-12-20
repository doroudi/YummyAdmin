<script lang="ts" setup>
import type { SimpleChartSeries } from '~/models/ChartData'

const data = ref<SimpleChartSeries[]>([
  { name: 'Email', value: 60 },
  { name: 'Google', value: 120 },
  { name: 'Apple', value: 10 },
])
const isLoading = ref(false)

function handleChartClick() {}

function handleDataError() {}

function retryLoad() {}
</script>

<template>
    <ChartComponent  :data="data" :loading="isLoading" :height="400" chart-type="pie"
        @chart-click="handleChartClick" @data-error="handleDataError">
        <template #error-action>
            <n-button @click="retryLoad">Retry</n-button>
        </template>
    </ChartComponent>
    <!-- <BarChart :loading="isLoading" :height="300" :data="monthlySellStat" :colors="colors" /> -->
</template>
