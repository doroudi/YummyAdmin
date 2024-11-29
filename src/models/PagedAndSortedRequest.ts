export interface PagedAndSortedRequest {
  sortBy?: string
  sortDesc?: string
  page: number
  pageSize: number
  [key: string]: any
}

const defaultOptions: PagedAndSortedRequest = {
  page: 1,
  pageSize: 10,
}

export { defaultOptions }
