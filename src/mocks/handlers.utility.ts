import type { PagedListResult } from '~/models/PagedListResult'

export function CreatePagedResponse<T>(req: any, items: T[], searchKey = 'name'): PagedListResult<T> {
  const url = new URL(req.url)
  const itemsPerPage = url.searchParams.get('itemsPerPage') ?? '10'
  const page = url.searchParams.get('page') ?? '1'
  const query = url.searchParams.get('query')
  let filteredItems = items
  if (query)
    filteredItems = items.filter(x => x[searchKey].toLowerCase().includes(query.toLowerCase()))

  const skip = Number((Number.parseInt(page) - 1) * Number.parseInt(itemsPerPage))
  const count = Number(itemsPerPage)
  return {
    totalCount: filteredItems.length,
    pageCount: Math.ceil(filteredItems.length / count),
    items: filteredItems.slice(skip, skip + count),
  }
}
