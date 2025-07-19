<script setup lang="ts">
import { Translate16Regular as TranslateIcon } from '@vicons/fluent'
import { NIcon } from 'naive-ui/es/icon'
import { storeToRefs } from 'pinia'
import ArabicIcon from '../CustomIcons/ArabicIcon.vue'
import ChineseIcon from '../CustomIcons/ChineseIcon.vue'
import EnglandIcon from '../CustomIcons/EnglandIcon.vue'
import GermanyIcon from '../CustomIcons/GermanyIcon.vue'
import TurkishIcon from '../CustomIcons/TurkishIcon.vue'

import { off } from 'dist/assets/index-CPwl54Xv'
import PersianIcon from '../CustomIcons/PersianIcon.vue'

defineProps<{ showTitle?: boolean }>()
const { t } = useI18n()
const layoutStore = useLayoutStore()
const { activeLanguage } = storeToRefs(layoutStore)
const { availableLocales } = useI18n()
const language = ref(activeLanguage)

const languages = availableLocales.sort(sortLangs).map((x) => {
  return {
    label: () => renderLabel(t(`languages.${x}`), x),
    value: x,
  }
})

function changeLanguage(lang: string) {
  layoutStore.changeLanguage(lang)
  layoutStore.resetWelcomeState()
  setTimeout(() => window.location.reload(), 1500)
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
    case 'cn':
      return ChineseIcon
    default:
      return EnglandIcon
  }
}

function sortLangs(a: string, b: string): number {
  const ordered = ['en', 'fa', 'cn', 'de', 'ar', 'tr']
  return ordered.findIndex((x) => x === a) - ordered.findIndex((x) => x === b)
}
</script>

<template>
  <div v-bind="$attrs">
    <n-popselect v-model:value="language" trigger="hover" :options="languages" @update-value="changeLanguage">
      <n-button quaternary :circle="!showTitle">
        <template #icon>
          <NIcon size="1.4rem">
            <TranslateIcon />
          </NIcon>
        </template>
        <span v-if="showTitle">{{ t(`languages.${activeLanguage}`) }}</span>
      </n-button>
    </n-popselect>
  </div>
</template>

<style lang="scss" scoped></style>
