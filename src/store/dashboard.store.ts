import { acceptHMRUpdate, defineStore } from 'pinia'
import type { DashboardSummaryStatDto } from '~/models/SummaryStat'
import reportService from '~/services/report.service'

export const useDashboardStore = defineStore('Dashboard', () => {
  const summaryStat = ref<DashboardSummaryStatDto>({
    registers: { count: 0, progress: 0, progressFlow: [] },
    visits: { count: 0, progress: 0, progressFlow: [] },
    products: { count: 0, progress: 0, progressFlow: [] },
    sells: { count: 0, progress: 0, progressFlow: [] },
  })
  const isLoading = ref(false)

  async function getSummaryStat() {
    isLoading.value = true
    try {
      summaryStat.value = await reportService.getSummaryReport()
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    summaryStat,
    getSummaryStat,
    isLoading,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
