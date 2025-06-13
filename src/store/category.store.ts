import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Category, CategoryCreateModel } from '~/models/Category'
import type { DonutChartSeries } from '~/models/ChartData'
import {
  type PagedAndSortedRequest,
  defaultOptions,
} from '~/models/PagedAndSortedRequest'
import type { SummaryStatDto } from '~/models/SummaryStat'
import categoryService from '~/services/category.service'

export const useCategoryStore = defineStore('Category', () => {
  const categories = ref<Category[]>([])
  const categoryItem = ref<Category>()
  const isLoading = ref(true)
  const isLoadingStats = ref(false)
  const isSaving = ref(false)
  const categoryStats = ref<{
    summaryStats: SummaryStatDto
    productsStat: DonutChartSeries
  }>({})

  async function getCategories(
    options: PagedAndSortedRequest = defaultOptions,
  ) {
    isLoading.value = true
    try {
      const response = await categoryService.getPagedList(options)
      categories.value = response.items
      options.pageCount = Math.ceil(
        response.totalCount! / options.itemsPerPage!,
      )
    } finally {
      isLoading.value = false
    }
  }

  async function getCategoryStats() {
    isLoadingStats.value = true
    try {
      categoryStats.value = await categoryService.getStats()
    } finally {
      isLoadingStats.value = false
    }
  }

  async function createCategory(categoryItem: CategoryCreateModel) {
    isLoading.value = true
    try {
      await categoryService.create<CategoryCreateModel>(categoryItem)
      getCategories()
    } finally {
      isLoading.value = false
    }
  }

  async function deleteCategory(id: number) {
    await categoryService.delete(id)
    getCategories()
  }

  return {
    isLoading,
    isLoadingStats,
    isSaving,
    categories,
    categoryItem,
    getCategories,
    createCategory,
    deleteCategory,
    getCategoryStats,
    categoryStats,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
