import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Category } from '~/models/Category'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import categoryService from '~/services/category.service'

export interface CategoryState {

}
export const useCategoryStore = defineStore('Category', () => {
  const categories = ref<Category[]>([])
  const totalCount = ref<number>(0)
  const categoryItem = ref<Category>()
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getCategories(options: PagedAndSortedRequest) {
    const response = await categoryService.getCategoryList(options)
    categories.value = response.items
    totalCount.value = response.totalCount
  }

  function getCategory() {

  }

  function addCategory() {

  }

  function deleteCategory() {

  }

  function editCategory() {

  }

  return {
    isLoading,
    isSaving,
    categories,
    categoryItem,
    getCategories,
    getCategory,
    addCategory,
    deleteCategory,
    editCategory,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
