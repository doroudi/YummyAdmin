<script setup lang='ts'>
import type { FormInst, FormRules } from 'naive-ui/es/form'
import { storeToRefs } from 'pinia'
import type { ColorCreateModel } from '~/models/Color'

const emits = defineEmits(['close'])
const colorStore = useColorStore()
const { isLoading } = storeToRefs(colorStore)
const colorItem = ref<ColorCreateModel>({ name: '', color: '#F0A020' })
const { t } = useI18n()
const formRef = ref<FormInst | null>(null)
async function create() {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      await colorStore.createColor(colorItem.value)
      useNotifyStore().success('Color created successfully')
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
      message: t('colors.validations.nameRequired'),
    },
  ],
}
</script>

<template>
  <n-form ref="formRef" :model="colorItem" :rules="rules" @submit.prevent="create()">
    <div class="form-control">
      <n-form-item class="mb-5" path="name" :label="t('colors.create.name')">
        <n-input
          id="name" ref="nameInput" v-model:value="colorItem.name" autofocus
          :placeholder="t('brands.create.brandName')"
        />
      </n-form-item>
    </div>
    <div class="form-control flex flex-col mb-5">
      <n-form-item :label="t('colors.create.color')">
        <n-color-picker
          v-model:value="colorItem.color"
          :modes="['hex']" :show-alpha="false"
          :swatches="[
            '#FFFFFF',
            '#18A058',
            '#2080F0',
            '#F0A020',
            'rgba(208, 48, 80, 1)',
          ]"
        />
      </n-form-item>
    </div>

    <n-button attr-type="submit" size="large" :block="true" type="primary" :loading="isLoading">
      {{ t('brands.create.buttonTitle') }}
    </n-button>
  </n-form>
</template>

<style scoped lang='scss'></style>
