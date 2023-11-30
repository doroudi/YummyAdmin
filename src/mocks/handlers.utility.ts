import type { PagedListResult } from '~/models/PagedListResult'

export function CreatePagedResponse<T>(req: any, items: T[]): PagedListResult<T> {
  const url = new URL(req.url)
  const maxResultCount = url.searchParams.get('maxResultCount')
  const skipCount = url.searchParams.get('skipCount')
  const skip = Number(skipCount)
  const count = Number(maxResultCount)
  return {
    items: items.slice(skip, skip + count),
    totalCount: items.length,
  }
}
