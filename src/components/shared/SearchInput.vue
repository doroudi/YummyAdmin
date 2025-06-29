<script setup lang="ts">
import { Search24Regular as searchIcon } from '@vicons/fluent'

interface Props {
  debounceTime?: number
}
const props = withDefaults(defineProps<Props>(), { debounceTime: 500 })
const model = defineModel()
const emits = defineEmits(['search'])
const { t } = useI18n()

const focused = ref(false)
let searchTimerId: any = null

function searchInListDebounced(value: string) {
  model.value = value
  clearTimeout(searchTimerId)
  searchTimerId = setTimeout(() => {
    emits('search')
  }, props.debounceTime)
}
</script>

<template>
    <n-input v-model="model" :placeholder="t('common.search')" autosize clearable
        class="w-50 transition-property-all transition-ease-in transition-duration-200" :class="{ 'md:w-60': focused }"
        @input="searchInListDebounced" @focus="focused = true" @blur="focused = false">
        <template #prefix>
            <NIcon :component="searchIcon" />
        </template>
    </n-input>
</template>

<style lang="scss" scoped>

</style>