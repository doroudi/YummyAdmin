<script setup lang='ts'>
import type { FormInst, FormRules } from 'naive-ui/es/form'
import type { UploadFileInfo } from 'naive-ui/es/upload'
import { storeToRefs } from 'pinia'
import type { BrandCreateModel } from '~/models/Brand'

const emits = defineEmits(['close'])
const brandStore = useBrandStore()
const { isLoading } = storeToRefs(brandStore)
const brandItem = ref<BrandCreateModel>({ name: '', url: '', image: '' })
const { t } = useI18n()
const formRef = ref<FormInst | null>(null)
async function create() {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      await brandStore.createBrand(brandItem.value)
      emits('close')
    }
  })
}

const nameInput = ref()
onMounted(() => {
  nameInput.value?.focus()
})

const rules: FormRules = {
  name: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: t('brands.validations.name'),
    },
  ],
  url: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: t('brands.validations.url'),
    },
  ],
  image: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: t('brands.validations.image'),
    },
  ],
}
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
  <n-form ref="formRef" :model="brandItem" :rules="rules" @submit.prevent="create()">
    <div class="form-control">
      <n-form-item class="mb-5" path="name" :label="t('brands.create.brandName')">
        <n-input
          id="name" ref="nameInput" v-model:value="brandItem.name" autofocus
          :placeholder="t('brands.create.brandName')"
        />
      </n-form-item>
    </div>
    <div class="form-control flex flex-col mb-5">
      <n-form-item path="url" :label="t('brands.create.url')">
        <n-input
          v-model:value="brandItem.url" autofocus
          :placeholder="t('brands.create.url')"
        />
      </n-form-item>
    </div>

    <div class="form-control">
      <n-form-item class="mb-5" path="image" :label="t('brands.create.image')">
        <n-upload
          list-type="image-card"
          accept="image/png, image/jpeg"
          :max="1"
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
    <n-button attr-type="submit" size="large" :block="true" type="primary" :loading="isLoading">
      {{ t('brands.create.buttonTitle') }}
    </n-button>
  </n-form>
</template>

<style scoped lang='scss'></style>
