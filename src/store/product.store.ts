import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Product, ProductCreateModel } from '~/models/Product'
import productService from '~/services/product.service'

export const useProductStore = defineStore('Product', () => {
  const products = ref<Product[]>([])
  const productItem = ref<Product>()
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getProducts() {
    isLoading.value = true
    try {
      const response = await productService.getList(options)
      products.value = response.items
      options.pageCount = Math.ceil(response.totalCount / options.itemsPerPage)
    }
    finally {
      isLoading.value = false
    }
  }

  async function getTrendingProducts(pageSize = 5) {
    isLoading.value = true
    try {
      const response = await productService.getList({ ...options, pageSize })
      products.value = response.items
    }
    finally {
      isLoading.value = false
    }
  }

  async function createProduct(product: ProductCreateModel) {
    isLoading.value = true
    try {
      await productService.create<ProductCreateModel>(product)
      getProducts()
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteProduct(id: number) {
    await productService.delete(id)
    getProducts()
  }

  function editProduct() {

  }

  return {
    isLoading,
    isSaving,
    products,
    options,
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
