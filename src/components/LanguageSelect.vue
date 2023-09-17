<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const layoutStore = useLayoutStore()
const { activeLanguage } = storeToRefs(layoutStore)
const { availableLocales } = useI18n()
const language = ref(activeLanguage)

const languages = availableLocales.map((x) => {
  return {
    label: t(x),
    value: x,
  }
})

function changeLanguage(lang: string) {
  layoutStore.changeLanguage(lang)
}
</script>

<template>
  <n-popselect v-model="language" :options="languages" @change="changeLanguage">
    <n-button>{{ t(activeLanguage) }}</n-button>
  </n-popselect>
</template>

<style lang="scss" scoped></style>
