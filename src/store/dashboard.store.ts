import { acceptHMRUpdate, defineStore } from 'pinia'
import type { DashboardSummaryStatDto } from '~/models/SummaryStat'
import type { DonutChartSeries, LocationChartSeries } from '~/models/ChartData'
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

  async function getSummaryStat() {
    isLoading.value = true
    try {
      summaryStat.value = await reportService.getSummaryReport()
    }
    finally {
      isLoading.value = false
    }
  }

  async function getGenderStat() {
    isLoading.value = true
    try {
      usersGenderData.value = await reportService.getUsersGenderStat()
    }
    finally {
      isLoading.value = false
    }
  }

  async function getRevenueStat(period: string) {
    isLoading.value = true
    try {
      revenueStat.value = await reportService.getRevenueStat(period)
    }
    finally {
      isLoading.value = false
    }
  }

  async function getLocationStat() {
    isLoading.value = true
    try {
      usersLocationData.value = await reportService.getUsersLocationStat()
    }
    finally {
      isLoading.value = false
    }
  }
  return {
    summaryStat,
    getSummaryStat,
    isLoading,
    getRevenueStat,
    revenueStat,
    getGenderStat,
    usersGenderData,
    getLocationStat,
    usersLocationData,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
