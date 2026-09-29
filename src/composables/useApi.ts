import { ApiService } from '~/common/api/api-service'
import type { ListResult } from '~/models/ListResult'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'

/**
 * Composition-style replacement for the old `new ApiService(slug)` wiring that
 * every service used to do at module scope.
 *
 * The surface mirrors the Nuxt version's `useApi(slug)` one-for-one, but here it
 * delegates to the axios-backed `ApiService` so the existing bearer-token and
 * error-notification interceptors in `common/api/http-client` keep working.
 */
export const useApi = (urlSlug: string) => {
  const api = new ApiService(urlSlug)

  return {
    get: <T>(url: string, params?: any): Promise<T> => api.get<T>(url, params),

    getList: <T>(url: string, params: any): Promise<ListResult<T>> =>
      api.getList<T>(url, params),

    getPaginated: <T>(
      url: string,
      options: PagedAndSortedRequest,
    ): Promise<PaginatedList<T>> => api.getPagedList<T>(url, options),

    query: <T>(url: string, params?: any): Promise<T> =>
      api.query<T>(url, params),

    post: <T>(url: string, data?: any): Promise<T> => api.post<T>(url, data),

    put: <T>(url: string, data?: any): Promise<T> => api.put<T>(url, data),

    delete: <T>(url: string): Promise<T> => api.delete<T>(url),

    getBlobFile: (url: string, params?: any) => api.getBlobFile(url, params),

    postFile: (url: string, params: { files: any[] }) =>
      api.postFile(url, params),
  }
}
