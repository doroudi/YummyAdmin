import { useApi } from '~/composables/useApi'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'
import type { Review } from '~/models/Review'

export const useReviewService = () => {
  const api = useApi('review')

  async function getReviewList(
    options: PagedAndSortedRequest,
  ): Promise<PaginatedList<Review>> {
    const response = await api.getPaginated<Review>('', options)
    return response
  }

  return {
    getReviewList,
  }
}
