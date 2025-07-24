<script setup lang='ts'>
import { Add24Filled as PlusIcon } from '@vicons/fluent'
import type { TreeSelectOption } from 'naive-ui/es/tree-select/src/interface'
import type { UploadFileInfo } from 'naive-ui/es/upload'
import { storeToRefs } from 'pinia'
import type { Brand } from '~/models/Brand'
import type { Category } from '~/models/Category'
import type { ProductCreateModel } from '~/models/Product'

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
const categoryOptions = ref<any[]>([])
const brandOptions = ref<any[]>([])

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
    <n-flex>
      <div class="w-full lg:w-3/4">
        <Card size="small" :title="t('products.create.productInformation')" class="mb-3">
          <n-form-item path="name" :label="t('products.create.name')">
            <n-input :placeholder="t('products.create.name')" label="Name" size="large" />
          </n-form-item>
          <n-space justify="start">
            <n-form-item path="name" :label="t('products.create.sku')">
              <n-input :placeholder="t('products.create.sku')" :label="t('products.create.sku')" size="large" />
            </n-form-item>

            <n-form-item path="name" :label="t('products.create.barcode')">
              <n-input :placeholder="t('products.create.barcode')" :label="t('products.create.barcode')" size="large" />
            </n-form-item>
          </n-space>

          <div path="description">
            <Editor v-model="productItem.description" :placeholder="t('products.create.productInformation')" />
          </div>
        </Card>
        <Card size="small" :title="t('products.create.media')">
          <div class="form-control">
            <n-form-item class="mb-5" path="image" :label="t('brands.create.image')">
              <n-upload list-type="image-card" accept="image/png, image/jpeg" :max="20" @preview="handlePreview" />
              <n-modal v-model:show="showModal" preset="card" style="width: 600px"
                :title="t('products.create.imageName')">
                <img :src="previewImageUrl" style="width: 100%">
              </n-modal>  
            </n-form-item>
          </div>
        </Card>
      </div>

      <div class="w-full lg:flex-1">
        <Card size="small" :title="t('products.create.pricing')" class="mb-2">
          <n-space vertical>
            <n-form-item path="name" :label="t('products.create.price')">
              <n-input size="large" :placeholder="t('products.create.price')" />
            </n-form-item>
            <n-form-item path="name" :label="t('products.create.discountedPrice')">
              <n-input size="large" :placeholder="t('products.create.discountedPrice')" />
            </n-form-item>
            <hr>
            <n-space p-1 justify="space-between">
              {{ t('products.create.inStock') }}
              <n-switch />
            </n-space>
          </n-space>
        </Card>

        <Card size="small" :title="t('products.create.category')">
          <n-space vertical>
            <n-form-item path="category" :label="t('products.create.category')">
              <n-tree-select v-model="productItem.categoryId" key-field="key" :options="categoryOptions"
                :placeholder="t('products.create.category')" />
            </n-form-item>
            <n-form-item path="brand" :label="t('products.create.brand')">
              <n-select v-model="productItem.brandId" :options="brandOptions"
                :placeholder="t('products.create.brand')" />
            </n-form-item>
            <n-form-item path="keywords" :label="t('products.create.keywords')">
              <n-dynamic-tags v-model:value="productItem.tags" :max="10">
                <template #trigger="{ activate, disabled }">
                  <n-button size="small" type="primary" dashed :disabled="disabled" @click="activate()">
                    <template #icon>
                      <n-icon>
                        <PlusIcon />
                      </n-icon>
                    </template>
                    {{ t('products.create.newKeyword') }}
                  </n-button>
                </template>
              </n-dynamic-tags>
            </n-form-item>
          </n-space>
        </Card>
      </div>
    </n-flex>
  </n-form>
</template>

<style lang='scss'>
.n-card>.n-card-header .n-card-header__main {
  font-weight: bold;
}
</style>
