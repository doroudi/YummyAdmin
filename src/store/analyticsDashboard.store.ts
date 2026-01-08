import { acceptHMRUpdate, defineStore } from 'pinia'
import type { LocationChartSeries, SimpleChartSeries } from '~/models/ChartData'
import type { DashboardSummaryStatDto } from '~/models/SummaryStat'
import type { VisitStat } from '~/models/VisitStat'
import reportService from '~/services/report.service'

export const useAnalyticsDashboardStore = defineStore(
  'AnalyticsDashboard',
  () => {
    const summaryStat = ref<DashboardSummaryStatDto>({
      visitors: { count: 0, progress: 0, progressFlow: [] },
      visits: { count: 0, progress: 0, progressFlow: [] },
      views: { count: 0, progress: 0, progressFlow: [] },
      bounceRate: { count: 0, progress: 0, progressFlow: [] },
    })

    const usersGenderData = ref<SimpleChartSeries[]>([])
    const usersLocationData = ref<LocationChartSeries[]>()
    const visitsStatData = ref<VisitStat | null>(null)
    const isLoadingStats = ref(false)
    const isLoading = ref(false)
    const isLoadingVisits = ref(false)

    async function getSummaryStat() {
      isLoadingStats.value = true
      try {
        summaryStat.value = await reportService.getSummaryReport()
      } finally {
        isLoadingStats.value = false
      }
    }

    async function getGenderStat() {
      isLoading.value = true
      try {
        usersGenderData.value = await reportService.getUsersGenderStat()
      } finally {
        isLoading.value = false
      }
    }

    async function getVisitsStat() {
      isLoadingVisits.value = true
      try {
        visitsStatData.value = await reportService.getVisitsStat()
      } finally {
        isLoadingVisits.value = false
      }
    }

    async function getLocationStat() {
      isLoading.value = true
      try {
        usersLocationData.value = await reportService.getUsersLocationStat()
      } finally {
        isLoading.value = false
      }
    }

    return {
      summaryStat,
      getSummaryStat,
      isLoading,
      isLoadingStats,
      getGenderStat,
      usersGenderData,
      getLocationStat,
      usersLocationData,
      getVisitsStat,
      isLoadingVisits,
      visitsStatData,
    }
  },
)
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
