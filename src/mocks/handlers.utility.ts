import type { ListResult } from '~/models/ListResult'
import type { PaginatedList } from '~/models/PagedListResult'

export function CreatePagedResponse<T extends { [key: string]: any }>(
  req: any,
  items: T[],
  searchKey = 'name',
  filterParams: any[] = [],
): PaginatedList<T> {
  const url = new URL(req.url)
  const query = url.searchParams.get('query')
  const sortBy = url.searchParams.get('sortBy')
  let filteredItems = getFilteredItems(items, filterParams, url.searchParams)
  if (query)
    filteredItems = items.filter((x) =>
      x[searchKey].toLowerCase().includes(query.toLowerCase()),
    )

  if (sortBy) filteredItems.sort((a, b) => a[sortBy] - b[sortBy])

  const pageSize = url.searchParams.get('pageSize')
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

function getFilteredItems(items: any[], filterParams: any[], params: any) {
  for (let i = 0; i < filterParams.length; i++) {
    const filter = filterParams[i]
    const filterParameter = params.get(filter)
    if (filterParameter) {
      if (
        filterParameter == null ||
        (Array.isArray(filterParameter) && filterParameter.length === 0)
      ) {
        continue
      }

      if (Array.isArray(filterParameter)) {
        items = items.filter((_i) =>
          filterParameter.indexOf((x: any) => x[filter] >= 0),
        )
      } else items = items.filter((x) => x[filter] === filterParameter)
    }
  }

  return items
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
