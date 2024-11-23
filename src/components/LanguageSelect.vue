<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Translate16Regular as TranslateIcon } from '@vicons/fluent'

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
  <div v-bind="$attrs">
    <n-popselect v-model:value="language" trigger="click" :options="languages" @update-value="changeLanguage">
      <n-button quaternary circle>
        <template #icon>
          <NIcon size="1.4rem">
            <TranslateIcon />
          </NIcon>
        </template>
      </n-button>
    </n-popselect>
  </div>
</template>

<style lang="scss" scoped></style>
