<script setup lang='ts'>
import type { UploadFileInfo } from 'naive-ui/es/upload'

const { t } = useI18n()
const previewImageUrl = ref('')
const showModal = ref(false)
const showModalRef = ref(false)
const previewImageUrlRef = ref('')
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
        <n-card size="small" title="Product Information">
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

          <n-form-item path="description">
            <n-input type="textarea" placeholder="Description" />
          </n-form-item>
        </n-card>
        <n-card size="small" title="Media">
          <div class="form-control">
            <n-form-item class="mb-5" path="image" :label="t('brands.create.image')">
              <n-upload
                list-type="image-card"
                accept="image/png, image/jpeg"
                :max="20"
                @preview="handlePreview"
              />
              <n-modal
                v-model:show="showModal"
                preset="card"
                style="width: 600px"
                title="A Cool Picture"
              >
                <img :src="previewImageUrl" style="width: 100%">
              </n-modal>
            </n-form-item>
          </div>
        </n-card>
      </n-layout-content>
      <n-layout-sider :width="400">
        <n-card size="small" title="Pricing">
          <n-space vertical>
            <n-form-item path="name" :label="t('categories.create.categoryName')">
              <n-input size="large" placeholder="Price" />
            </n-form-item>
            <n-form-item path="name" :label="t('categories.create.categoryName')">
              <n-input size="large" placeholder="Discounted Price" />
            </n-form-item>
            <hr>
            <n-space p-1 justify="space-between">
              Stock
              <n-switch />
            </n-space>
          </n-space>
        </n-card>
      </n-layout-sider>
    </n-layout>
  </n-form>
</template>

<style scoped lang='scss'></style>
