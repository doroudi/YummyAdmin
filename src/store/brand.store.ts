import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Brand, BrandCreateModel } from '~/models/Brand'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import brandService from '~/services/brand.service'

export interface BrandState {
}
export const useBrandStore = defineStore('Brand', () => {
  const brands = ref<Brand[]>([])
  const brandItem = ref<Brand>()
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getBrands(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await brandService.getList(options)
      brands.value = response.items
      options.pageSize = Number.parseInt(response.totalCount / options.itemsPerPage)
    }
    finally {
      isLoading.value = false
    }
  }

  function getBrand() {

  }

  async function createBrand(brandItem: BrandCreateModel) {
    isLoading.value = true
    try {
      await brandService.create(brandItem)
      getBrands(options.value)
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteBrand(id: string) {
    await brandService.delete(id)
    getBrands(options.value)
  }

  function editBrand() {

  }

  return {
    isLoading,
    isSaving,
    brands,
    options,
    brandItem,
    getBrands,
    getBrand,
    createBrand,
    deleteBrand,
    editBrand,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBrandStore, import.meta.hot))
