import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Category, CategoryCreateModel } from '~/models/Category'
import { type PagedAndSortedRequest, defaultOptions } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'
import categoryService from '~/services/category.service'

export const useCategoryStore = defineStore('Category', () => {
  const categories = ref<PagedListResult<Category>>({ items: [] })
  const categoryItem = ref<Category>()
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getCategories(options: PagedAndSortedRequest = defaultOptions) {
    isLoading.value = true
    try {
      const response = await categoryService.getPagedList(options)
      categories.value = response
    }
    finally {
      isLoading.value = false
    }
  }

  function getCategory() {

  }

  async function createCategory(categoryItem: CategoryCreateModel) {
    isLoading.value = true
    try {
      await categoryService.create<CategoryCreateModel>(categoryItem)
      getCategories()
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteCategory(id: number) {
    await categoryService.delete(id)
    getCategories()
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
    createCategory,
    deleteCategory,
    editCategory,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
