import type { PagedListResult } from '~/models/PagedListResult'

export function CreatePagedResponse<T>(req: any, items: T[]): PagedListResult<T> {
  const url = new URL(req.url)
  const pageSize = url.searchParams.get('pageSize')
  const skipCount = url.searchParams.get('skipCount')
  const skip = Number(skipCount)
  const count = Number(pageSize)
  return {
    totalCount: items.length,
    pageCount: Math.ceil(items.length / count),
    items: items.slice(skip, skip + count),
  }
}
