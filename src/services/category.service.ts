import { useApi } from '~/composables/useApi'
import type { Category } from '~/models/Category'
import { useGenericService } from './generic.service'

export const useCategoryService = () => {
  const base = useGenericService<Category, number>('category')
  const api = useApi('category')

  function getAll() {
    return api.getList<Category[]>('all', {})
  }

  function getStats() {
    return api.get<{
      summaryStats: any
      productsByCategoryStat: any
    }>('stats')
  }

  return {
    ...base,
    getAll,
    getStats,
  }
}
