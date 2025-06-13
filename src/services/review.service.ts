import { ApiService } from '~/common/api/api-service'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PaginatedList } from '~/models/PagedListResult'
import type { Review } from '~/models/Review'

const apiService = new ApiService('review')
class ReviewService {
  async getReviewList(
    options: PagedAndSortedRequest,
  ): Promise<PaginatedList<Review>> {
    const response = await apiService.getPagedList<Review>('', options)
    return response
  }
}
export default new ReviewService()
