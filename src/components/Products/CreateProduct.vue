<script setup lang='ts'>
import type { UploadFileInfo } from 'naive-ui/es/upload'
import type { TreeSelectOption } from 'naive-ui/es/tree-select/src/interface'
import { storeToRefs } from 'pinia'
import {
  Add24Filled as PlusIcon,
} from '@vicons/fluent'
import type { Category } from '~/models/Category'
import type { ProductCreateModel } from '~/models/Product'
import type { Brand } from '~/models/Brand'

const { t } = useI18n()
const previewImageUrl = ref('')
const showModal = ref(false)
const showModalRef = ref(false)
const previewImageUrlRef = ref('')
const productItem = ref<ProductCreateModel>({} as ProductCreateModel)
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
const { categories } = storeToRefs(categoryStore)
const { brands } = storeToRefs(brandStore)
const categoryOptions = ref([])
const brandOptions = ref([])
onMounted(async () => {
  await categoryStore.getCategories()
  await brandStore.getBrands()
  categoryOptions.value = categories.value.map(mapCategoryToOptions)
  brandOptions.value = brands.value.map(mapBrandToOptions)
})

function mapCategoryToOptions(item: Category): TreeSelectOption {
  return {
    key: item.id,
    label: item.name,
    children: item.children?.map(mapCategoryToOptions),
  }
}

function mapBrandToOptions(item: Brand) {
  return {
    value: item.id,
    label: item.name,
  }
}

function handlePreview(file: UploadFileInfo) {
  const { url } = file
  previewImageUrlRef.value = url as string
  showModalRef.value = true
}
</script>

<template>
  <n-form>
    <n-layout has-sider sider-placement="right">
      <n-layout-content px-2>
        <n-card size="small" title="Product Information" class="mb-3">
          <n-form-item path="name" :label="t('categories.create.categoryName')">
            <n-input placeholder="Product Name" label="Name" size="large" />
          </n-form-item>
          <n-space justify="start">
            <n-form-item path="name" :label="t('categories.create.categoryName')">
              <n-input placeholder="SKU" label="SKU" size="large" />
            </n-form-item>

            <n-form-item path="name" :label="t('categories.create.categoryName')">
              <n-input placeholder="Barcode" label="Barcode" size="large" />
            </n-form-item>
          </n-space>

          <div path="description">
            <Editor v-model="productItem.description" />
          </div>
        </n-card>
        <n-card size="small" title="Media">
          <div class="form-control">
            <n-form-item class="mb-5" path="image" :label="t('brands.create.image')">
              <n-upload list-type="image-card" accept="image/png, image/jpeg" :max="20" @preview="handlePreview" />
              <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="A Cool Picture">
                <img :src="previewImageUrl" style="width: 100%">
              </n-modal>
            </n-form-item>
          </div>
        </n-card>
      </n-layout-content>
      <n-layout-sider :width="400">
        <n-card size="small" title="Pricing" class="mb-2">
          <n-space vertical>
            <n-form-item path="name" :label="t('categories.create.categoryName')">
              <n-input size="large" placeholder="Price" />
            </n-form-item>
            <n-form-item path="name" :label="t('categories.create.categoryName')">
              <n-input size="large" placeholder="Discounted Price" />
            </n-form-item>
            <hr>
            <n-space p-1 justify="space-between">
              InStock
              <n-switch />
            </n-space>
          </n-space>
        </n-card>

        <n-card size="small" title="Category">
          <n-space vertical>
            <n-form-item path="category" :label="t('categories.create.categoryName')">
              <n-tree-select
                v-model="productItem.categoryId" key-field="key" :options="categoryOptions"
                :placeholder="t('categories.create.parent')"
              />
            </n-form-item>
            <n-form-item path="brand" :label="t('categories.create.categoryName')">
              <n-select v-model="productItem.brandId" :options="brandOptions" />
            </n-form-item>
            <n-form-item path="keywords" :label="t('categories.create.categoryName')">
              <n-dynamic-tags v-model:value="productItem.tags" :max="10">
                <template #trigger="{ activate, disabled }">
                  <n-button size="small" type="primary" dashed :disabled="disabled" @click="activate()">
                    <template #icon>
                      <n-icon>
                        <PlusIcon />
                      </n-icon>
                    </template>
                    New Keyword
                  </n-button>
                </template>
              </n-dynamic-tags>
            </n-form-item>
          </n-space>
        </n-card>
      </n-layout-sider>
    </n-layout>
  </n-form>
</template>

<style scoped lang='scss'></style>
