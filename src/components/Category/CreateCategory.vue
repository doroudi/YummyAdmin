<script setup lang='ts'>
import type { FormInst, FormRules } from 'naive-ui/es/form'
import type { TreeSelectOption } from 'naive-ui/es/tree-select/src/interface'
import { storeToRefs } from 'pinia'
import type { Category, CategoryCreateModel } from '~/models/Category'
import categoryService from '~/services/category.service'

const emits = defineEmits(['close'])
const categoryStore = useCategoryStore()
const { isLoading } = storeToRefs(categoryStore)
const categoryItem = ref<CategoryCreateModel>({ name: '', parentId: 0 })
const { t } = useI18n()
const formRef = ref<FormInst | null>(null)
const parents = ref<TreeSelectOption[]>([])
const nameInput = ref()

onMounted(async () => {
  nameInput.value?.focus()
  const categories = await categoryService.getList()
  parents.value.push({ key: 0, label: 'Root' })
  parents.value.push(...categories.map(mapCategoryToOptions))
})

const rules: FormRules = {
  name: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: t('categories.validations.nameRequired'),
    },
  ],
  parentId: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: t('categories.validations.parentRequired'),
    },
  ],
}

function mapCategoryToOptions(item: Category): TreeSelectOption {
  return {
    key: item.id,
    label: item.name,
    children: item.children?.map(mapCategoryToOptions),
  }
}

async function create() {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      await categoryStore.createCategory(categoryItem.value)
      useNotifyStore().success(t('categories.createdSucceed'))
      emits('close')
    }
  })
}
</script>

<template>
  <n-form ref="formRef" :model="categoryItem" :rules="rules" @submit.prevent="create()">
    <div class="form-control">
      <n-form-item class="mb-5" path="name" :label="t('categories.create.categoryName')">
        <n-input
          id="name" ref="nameInput" v-model:value="categoryItem.name"
          :placeholder="t('categories.create.categoryName')"
        />
      </n-form-item>
    </div>
    <div class="form-control">
      <n-form-item class="mb-5" :label="t('categories.create.parent')">
        <n-tree-select v-model="categoryItem.parentId" key-field="key" :options="parents" :placeholder="t('categories.create.parent')" default-value="Root" />
      </n-form-item>
    </div>
    <n-button attr-type="submit" size="large" :block="true" type="primary" :loading="isLoading">
      {{ t('categories.create.buttonTitle') }}
    </n-button>
  </n-form>
</template>

<style scoped lang='scss'></style>
