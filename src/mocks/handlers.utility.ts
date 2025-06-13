import type { ListResult } from '~/models/ListResult'
import type { PaginatedList } from '~/models/PagedListResult'

export function CreatePagedResponse<T extends { [key: string]: any }>(
  req: any,
  items: T[],
  searchKey = 'name',
): PaginatedList<T> {
  const url = new URL(req.url)
  const query = url.searchParams.get('query')
  let filteredItems = items
  if (query)
    filteredItems = items.filter((x) =>
      x[searchKey].toLowerCase().includes(query.toLowerCase()),
    )

  const pageSize = url.searchParams.get('itemsPerPage')
  const skipCount = url.searchParams.get('page')
  const count = Number(pageSize)
  const skip = (Number(skipCount) - 1) * count
  return {
    totalCount: filteredItems.length,
    totalPages: Math.ceil(filteredItems.length / count),
    items: filteredItems.slice(skip, skip + count),
    hasPreviousPage: skip > 0,
    hasNextPage: skip + count < filteredItems.length,
    pageNumber: Math.floor(skip / count) + 1,
  }
}

export function CreateListResponse<T extends { [key: string]: any }>(
  req: any,
  items: T[],
  searchKey = 'name',
): ListResult<T> {
  const url = new URL(req.url)
  const query = url.searchParams.get('query')
  let filteredItems = items
  if (query)
    filteredItems = items.filter((x) =>
      x[searchKey].toLowerCase().includes(query.toLowerCase()),
    )
  return {
    items: filteredItems,
  }
}
