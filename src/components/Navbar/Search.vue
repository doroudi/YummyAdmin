<script setup lang="ts">
import generatedRoutes from 'virtual:generated-pages'
import { Search24Regular as SearchIcon } from '@vicons/fluent'
import { useMagicKeys, whenever } from '@vueuse/core'
import type { InputInst } from 'naive-ui/es/input/src/interface'

const { t } = useI18n()
const searchTerm = ref('')
const focused = ref(false)

const options = computed(() => {
  return generatedRoutes
    .filter((x) => x.meta?.title !== undefined && x.meta?.title !== null)
    .filter(
      (x) =>
        searchTerm.value === '' ||
        (typeof x.meta?.title === 'string' &&
          (String(x.meta.title).indexOf(searchTerm.value) >= 0 ||
            t(`menu.${String(x.meta?.title || x.name)}`).indexOf(
              searchTerm.value,
            ) >= 0)),
    )
    .map((item, i) => {
      return {
        label: t(`menu.${item.meta?.title || item.name}`),
        value: item.name,
        key: i,
      }
    })
})

const searchInput = ref<InputInst | null>(null)
const { slash } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    const target = e.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return
    }
    if (e.key === '/' && e.type === 'keydown') e.preventDefault()
  },
})
whenever(slash, () => searchInput.value.focus())

const router = useRouter()
function gotoRoute(name: string) {
  const route = generatedRoutes.find((x) => x.name === name)
  if (route) {
    searchTerm.value = ''
    router.push(route)
  }
}
</script>

<template>
  <div class="hidden md:block md:me-2 md:w-40 transition-property-all transition-ease-in transition-duration-200"
    :class="{ 'md:w-60': focused }">
    <n-auto-complete v-model:value="searchTerm" @select="gotoRoute" :options="options" 
      clear-after-select blur-after-select>
      <template #default="{ value: slotValue, handleInput }">
        <n-input ref="searchInput" @input="handleInput" :value="slotValue" :placeholder="t('common.search')"
          @focus="focused = true" @blur="focused = false">
          <template #prefix>
            <n-icon :component="SearchIcon" />
          </template>

          <template #suffix>
            <span class="kbd-container">
              <span class="kbd">
                /
              </span>
            </span>
          </template>
        </n-input>
      </template>
    </n-auto-complete>
  </div>
</template>

<style scoped lang="scss">
.kbd-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 25px;

  .kbd {
    border: solid 1px var(--border-color);
    margin: 0.2rem 0;
    border-radius: var(--n-border-radius);
    padding: 0 0.5rem;
    height: 23px;
    line-height: 1.2rem;
    font-size: .85rem;
  }
}
</style>
