import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Category, CategoryCreateModel } from '~/models/Category'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import categoryService from '~/services/category.service'

export const useCategoryStore = defineStore('Category', () => {
  const categories = ref<Category[]>([])
  const categoryItem = ref<Category>()
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getCategories(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await categoryService.getList(options)
      categories.value = response.items
      options.pageSize = Math.trunc(response.totalCount / options.itemsPerPage)
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
      getCategories(options.value)
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteCategory(id: number) {
    await categoryService.delete(id)
    getCategories(options.value)
  }

  function editCategory() {

  }

  return {
    isLoading,
    isSaving,
    categories,
    options,
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
