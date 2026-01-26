import { acceptHMRUpdate, defineStore } from 'pinia'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { Product, ProductCreateModel } from '~/models/Product'
import productService from '~/services/product.service'

export const useProductStore = defineStore('Product', () => {
  const products = ref<Product[]>([])
  const trendingProducts = ref<Product[]>([])
  const productItem = ref<Product>()
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getProducts(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await productService.getPagedList(options)
      products.value = response.items
      options.pageCount = Math.ceil(response.totalCount! / options.pageSize!)
    } finally {
      isLoading.value = false
    }
  }

  async function getTrendingProducts(pageSize = 5) {
    isLoading.value = true
    try {
      const response = await productService.getPagedList({
        page: 1,
        pageSize,
      })
      trendingProducts.value = response.items
    } finally {
      isLoading.value = false
    }
  }

  async function createProduct(product: ProductCreateModel) {
    isLoading.value = true
    try {
      await productService.create<ProductCreateModel>(product)
    } finally {
      isLoading.value = false
    }
  }

  async function deleteProduct(id: string) {
    await productService.delete(id)
    products.value.splice(
      products.value.findIndex((x: Product) => x.id === id),
      1,
    )
  }

  async function deleteMultipleProducts(ids: string[]) {
    ids.forEach(async (id) => {
      await productService.delete(id)
      products.value.splice(
        products.value.findIndex((x: Product) => x.id === id),
        1,
      )
    })
  }

  function editProduct() {}

  return {
    isLoading,
    isSaving,
    products,
    trendingProducts,
    productItem,
    getProducts,
    createProduct,
    deleteProduct,
    editProduct,
    getTrendingProducts,
    deleteMultipleProducts,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
