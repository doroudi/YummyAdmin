export interface PagedAndSortedRequest {
  sortBy?: string
  sortDesc?: string
  page: number
  itemsPerPage?: number
  [key: string]: any
}

const defaultOptions: PagedAndSortedRequest = {
  page: 1,
  itemsPerPage: 10,
}

export { defaultOptions }
