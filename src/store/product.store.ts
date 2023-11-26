import { acceptHMRUpdate, defineStore } from 'pinia'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { Product, ProductCreateModel } from '~/models/Product'
import productService from '~/services/category.service'

export const useProductStore = defineStore('Product', () => {
  const products = ref<Product[]>([])
  const productItem = ref<Product>()
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getProducts(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await productService.getList(options)
      products.value = response.items
      options.pageSize = Math.trunc(response.totalCount / options.itemsPerPage)
    }
    finally {
      isLoading.value = false
    }
  }

  function getProduct() {

  }

  async function createProduct(product: ProductCreateModel) {
    isLoading.value = true
    try {
      await productService.create<ProductCreateModel>(product)
      getProducts(options.value)
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteProduct(id: number) {
    await productService.delete(id)
    getProducts(options.value)
  }

  function editCategory() {

  }

  return {
    isLoading,
    isSaving,
    products,
    options,
    productItem,
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    editCategory,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
