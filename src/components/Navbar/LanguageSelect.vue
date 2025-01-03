<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Translate16Regular as TranslateIcon } from '@vicons/fluent'
import { NIcon } from 'naive-ui/es/icon'
import EnglandIcon from '../CountryIcons/EnglandIcon.vue'
import GermanyIcon from '../CountryIcons/GermanyIcon.vue'
import ChineseIcon from '../CountryIcons/ChineseIcon.vue'
import ArabicIcon from '../CountryIcons/ArabicIcon.vue'
import TurkishIcon from '../CountryIcons/TurkishIcon.vue'

import PersianIcon from '../CountryIcons/PersianIcon.vue'

defineProps<{ showTitle: string }>()
const { t } = useI18n()
const layoutStore = useLayoutStore()
const { activeLanguage } = storeToRefs(layoutStore)
const { availableLocales } = useI18n()
const language = ref(activeLanguage)

const languages = availableLocales.map((x) => {
  return {
    label: () => renderLabel(t(x), x),
    value: x,
  }
})

function changeLanguage(lang: string) {
  layoutStore.changeLanguage(lang)
  window.location.reload()
}

function renderLabel(label: string, language: string) {
  return h('div', { class: 'flex items-center gap-2' }, [
    h(getLanguageIcon(language)),
    h('span', null, { default: () => label }),
  ])
}

function getLanguageIcon(language: string) {
  switch (language) {
    case 'en':
      return EnglandIcon
    case 'de':
      return GermanyIcon
    case 'ar':
      return ArabicIcon
    case 'tr':
      return TurkishIcon
    case 'fa':
      return PersianIcon
    case 'ch':
      return ChineseIcon
    default:
      return EnglandIcon
  }
}
</script>

<template>
  <div v-bind="$attrs">
    <n-popselect v-model:value="language" trigger="click" :options="languages" @update-value="changeLanguage">
      <n-button quaternary :circle="!showTitle">
        <template #icon>
          <NIcon size="1.4rem">
            <TranslateIcon />
          </NIcon>
        </template>
        <span v-if="showTitle">{{ t(activeLanguage) }}</span>
      </n-button>
    </n-popselect>
  </div>
</template>

<style lang="scss" scoped></style>
