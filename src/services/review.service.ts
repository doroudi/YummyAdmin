import { ApiService } from '~/common/api/api-service'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'
import type { Review } from '~/models/Review'

const apiService = new ApiService('review')
class ReviewService {
  constructor() { }
  async getReviewList(options: PagedAndSortedRequest): Promise<PagedListResult<Review>> {
    const response = await apiService.getPagedList<Review>('', options)
    return response
  }
}
export default new ReviewService()
