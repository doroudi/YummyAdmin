import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Color, ColorCreateModel } from '~/models/Color'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import colorService from '~/services/color.service'

export interface ColorState {
}
export const useColorStore = defineStore('Color', () => {
  const colors = ref<Color[]>([])
  const colorItem = ref<Color>()
  const isLoading = ref(false)
  const isSaving = ref(false)
  const { options } = useOptions()

  async function getColors(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await colorService.getList(options)
      colors.value = response.items
      options.pageCount = Math.ceil(response.totalCount / options.pageSize)
    }
    finally {
      isLoading.value = false
    }
  }

  function getColor() {

  }

  async function createColor(colorItem: ColorCreateModel) {
    isLoading.value = true
    try {
      await colorService.create(colorItem)
      getColors(options.value)
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteColor(id: string) {
    await colorService.delete(id)
    getColors(options.value)
  }

  function editColor() {

  }

  return {
    isLoading,
    isSaving,
    colors,
    options,
    colorItem,
    getColors,
    getColor,
    createColor,
    deleteColor,
    editColor,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useColorStore, import.meta.hot))
