import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Color, ColorCreateModel } from '~/models/Color'
import type { PagedAndSortedRequest } from '~/models/PagedAndSortedRequest'
import type { PagedListResult } from '~/models/PagedListResult'
import colorService from '~/services/color.service'

export interface ColorState {
}
export const useColorStore = defineStore('Color', () => {
  const colors = ref<PagedListResult<Color>>([])
  const colorItem = ref<Color>()
  const isLoading = ref(false)
  const isSaving = ref(false)

  async function getColors(options: PagedAndSortedRequest) {
    isLoading.value = true
    try {
      const response = await colorService.getList(options)
      colors.value = response
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
      // getColors(options.value)
    }
    finally {
      isLoading.value = false
    }
  }

  async function deleteColor(id: string) {
    await colorService.delete(id)
    // getColors(options.value)
  }

  function editColor() {

  }

  return {
    isLoading,
    isSaving,
    colors,
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
