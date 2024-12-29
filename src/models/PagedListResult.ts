import type { ListResult } from './ListResult'

export interface PagedListResult<T> extends ListResult<T> {
  totalCount?: number
  pageCount?: number
}
