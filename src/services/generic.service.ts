import { useApi } from '~/composables/useApi'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'

/**
 * Shared CRUD surface for the resource services, as a composable instead of the
 * old `GenericService<T, TKey>` base class.
 *
 * `remove` (rather than `delete`) matches the Nuxt version's naming.
 */
export const useGenericService = <T, TKey>(apiPrefix: string) => {
  const api = useApi(apiPrefix)

  return {
    getPagedList: (options: PagedAndSortedRequest): Promise<PaginatedList<T>> =>
      api.getPaginated<T>('', options),

    getList: async (): Promise<T[]> => {
      const response = await api.getList<T>('all', {})
      return response.items
    },

    getSingle: (id: TKey): Promise<T> => api.get<T>(`${id}`),

    create: <TModel>(item: TModel): Promise<T> => api.post<T>('', item),

    edit: <TModel>(id: TKey, item: TModel): Promise<T> =>
      api.put<T>(`${id}`, item),

    remove: (id: TKey): Promise<boolean> => api.delete<boolean>(`${id}`),
  }
}
