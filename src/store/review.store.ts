import { acceptHMRUpdate, defineStore } from 'pinia'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { Review } from '~/models/Review'
import reviewService from '~/services/review.service'

export type ReviewState = {}
export const useReviewStore = defineStore('Review', () => {
  const reviews = ref<Review[]>([])

  const reviewItem = ref<Review>()
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getReviews(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await reviewService.getReviewList(options)
      reviews.value = response.items
      options.pageCount = Math.ceil(
        response.totalCount! / options.itemsPerPage!,
      )
    } finally {
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
