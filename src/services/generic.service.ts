import type { ApiService } from '~/common/api/api-service'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'

class GenericService<T, TKey> {
  private apiService: ApiService
  constructor(service: ApiService) {
    this.apiService = service
  }

  async getList(options: PagedAndSortedRequest): Promise<PagedListResult<T>> {
    const response = await this.apiService.getPagedList<T>('', options)
    return response
  }

  async getSingle(id: TKey): Promise<T> {
    return await this.apiService.get<T>(`${id}`)
  }

  async create<TModel>(item: TModel): Promise<T> {
    return await this.apiService.post<T>('', item)
  }

  async edit(id: TKey, item: T): Promise<T> {
    return await this.apiService.put<T>(`${id}`, item)
  }

  async delete(id: TKey): Promise<boolean> {
    return await this.apiService.delete<boolean>(`${id}`)
  }
}
export default GenericService
