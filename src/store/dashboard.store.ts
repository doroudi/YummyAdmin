import { acceptHMRUpdate, defineStore } from 'pinia'
import type {
  ChartData,
  DonutChartSeries,
  LocationChartSeries,
} from '~/models/ChartData'
import type { DashboardSummaryStatDto } from '~/models/SummaryStat'
import reportService from '~/services/report.service'

export const useDashboardStore = defineStore('Dashboard', () => {
  const summaryStat = ref<DashboardSummaryStatDto>({
    registers: { count: 0, progress: 0, progressFlow: [] },
    visits: { count: 0, progress: 0, progressFlow: [] },
    products: { count: 0, progress: 0, progressFlow: [] },
    sells: { count: 0, progress: 0, progressFlow: [] },
  })

  const usersGenderData = ref<DonutChartSeries[]>([])
  const usersLocationData = ref<LocationChartSeries[]>()
  const revenueStat = ref<any>([])
  const isLoading = ref(false)
  const isLoadingStats = ref(false)
  const monthlySellStat = ref<ChartData | null>()
  async function getSummaryStat() {
    isLoadingStats.value = true
    try {
      summaryStat.value = await reportService.getSummaryReport()
    } finally {
      isLoadingStats.value = false
    }
  }

  async function getMonthlySellStat() {
    isLoading.value = true
    try {
      const data = await reportService.getMonthlySellStat()
      monthlySellStat.value = data
    } finally {
      isLoading.value = false
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

  async function getRevenueStat(period: string) {
    isLoading.value = true
    try {
      revenueStat.value = await reportService.getRevenueStat(period)
    } finally {
      isLoading.value = false
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
    getRevenueStat,
    revenueStat,
    getGenderStat,
    usersGenderData,
    getLocationStat,
    usersLocationData,
    getMonthlySellStat,
    monthlySellStat,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
