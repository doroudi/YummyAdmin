export interface PagedAndSortedRequest {
  sortBy?: string
  sortDesc?: string
  page: number
  pageSize: number
  itemsPerPage: number
  [key: string]: any
}
