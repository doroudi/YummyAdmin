<script lang="ts" setup>
import type { ChartData } from '~/models/ChartData'
import { useReportService } from '~/services/report.service'

const reportService = useReportService()
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
    <Card stretch-height title-size="medium" title="📉 Area Chart Demo">
        <div class="pt-2">
            <AreaChart :data="monthlySellStat" :loading="isLoading" :height="300" />
        </div>
    </Card>
</template>
