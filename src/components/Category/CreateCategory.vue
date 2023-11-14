<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import type { Category } from '~/models/Category'

const emits = defineEmits(['close'])
const categoryStore = useCategoryStore()
const { isLoading } = storeToRefs(categoryStore)
const categoryItem = ref<Category>({} as Category)
const { t } = useI18n()
async function create() {
  // TODO: validate
  await categoryStore.createCategory(categoryItem.value)
  emits('close')
}
</script>

<template>
  <form @submit.prevent="create()">
    <div class="mb-5">
      <span class="p-float-label">
        <label for="username" class="block font-medium">{{ t('category.create.categoryName') }}</label>
        <n-input id="name" :placeholder="t('category.create.categoryName')" />
      </span>
    </div>

    <div class="mb-8">
      <label for="parent" class="block font-medium">{{ t('category.create.parent') }}</label>
      <n-input type="text" :placeholder="t('category.create.parent')" />
    </div>

    <n-button attr-type="submit" size="large" :block="true" type="primary" :loading="isLoading">
      {{ t('category.create.buttonTitle') }}
    </n-button>
  </form>
</template>

<style scoped lang='scss'></style>
