import { acceptHMRUpdate, defineStore } from 'pinia'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'
import type { Review } from '~/models/Review'
import reviewService from '~/services/review.service'

export interface ReviewState {

}
export const useReviewStore = defineStore('Review', () => {
  const reviews = ref<PagedListResult<Review>>({ items: [] })

  const reviewItem = ref<Review>()
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getReviews(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await reviewService.getReviewList(options)
      reviews.value = response
    }
    finally {
      isLoading.value = false
    }
  }
  return {
    reviews,
    isSaving,
    isLoading,
    getReviews,
    reviewItem,
    options,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useReviewStore, import.meta.hot))
