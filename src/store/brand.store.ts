import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Brand, BrandCreateModel } from '~/models/Brand'
import { type PagedAndSortedRequest, defaultOptions } from '~/models/PagedAndSortedRequest'
import brandService from '~/services/brand.service'

export interface BrandState {
}
export const useBrandStore = defineStore('Brand', () => {
  const brands = ref<Brand[]>([])
  const brandItem = ref<Brand>()
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getBrands(options: PagedAndSortedRequest = defaultOptions) {
    isLoading.value = true
    try {
      const response = await brandService.getPagedList(options)
      brands.value = response.items
      options.pageCount = Math.ceil(response.totalCount! / options.itemsPerPage!)
    }
    catch (err) {
      console.error(err)
    }
    finally {
      isLoading.value = false
    }
  }

  async function createBrand(brandItem: BrandCreateModel) {
    isLoading.value = true
    try {
      await brandService.create(brandItem)
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteBrand(id: string) {
    await brandService.delete(id)
  }

  return {
    isLoading,
    isSaving,
    brands,
    brandItem,
    getBrands,
    createBrand,
    deleteBrand,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBrandStore, import.meta.hot))
