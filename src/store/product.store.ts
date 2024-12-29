import { acceptHMRUpdate, defineStore } from 'pinia'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'
import type { Product, ProductCreateModel } from '~/models/Product'
import productService from '~/services/product.service'

export const useProductStore = defineStore('Product', () => {
  const products = ref<PagedListResult<Product>>({ items: [] })
  const productItem = ref<Product>()
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getProducts(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await productService.getList(options)
      products.value = response
    }
    finally {
      isLoading.value = false
    }
  }

  async function getTrendingProducts(itemsPerPage = 5) {
    isLoading.value = true
    try {
      const response = await productService.getList({ page: 1, itemsPerPage })
      products.value = response
    }
    finally {
      isLoading.value = false
    }
  }

  async function createProduct(product: ProductCreateModel) {
    isLoading.value = true
    try {
      await productService.create<ProductCreateModel>(product)
      // getProducts()
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteProduct(id: number) {
    await productService.delete(id)
  }

  function editProduct() {

  }

  return {
    isLoading,
    isSaving,
    products,
    // options,
    productItem,
    getProducts,
    createProduct,
    deleteProduct,
    editProduct,
    getTrendingProducts,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
