<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface Props {
  modelValue: string
}
const props = defineProps<Props>()
const content = ref<string>(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    content.value = props.modelValue
  },
)

const options = {
  readOnly: true,
  theme: 'snow',
  format: {
    align: 'left',
  },
}
</script>

<template>
  <QuillEditor v-model="content" :option="options" toolbar="minimal" align="right" v-bind="$attrs" />
</template>

<style lang="scss">
.ql-container.ql-snow {
  border: solid 1px var(--n-scrollbar-color);
  border-radius: 0 0 5px 5px;
}

.ql-toolbar.ql-snow {
  border: solid 1px var(--n-scrollbar-color);
  border-radius: 5px 5px 0 0;
}

.ql-editor {
  min-height: 180px;
  font-family: Shabnam;
}
</style>
