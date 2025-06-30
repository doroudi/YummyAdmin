<script setup lang="ts">
import { Search24Regular as SearchIcon } from '@vicons/fluent'
import { useMagicKeys, whenever } from '@vueuse/core'
import type { InputInst } from 'naive-ui/es/input/src/interface'

const { t } = useI18n()
const value = ref('')
const focused = ref(false)
const valueRef = ref('')

//TODO: implement features search
const options = computed(() => {
  return ['@gmail.com', '@outlook.com', '@yahoo.com'].map((suffix) => {
    const prefix = valueRef.value.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  })
})

const searchInput = ref<InputInst | null>(null)
const { ctrl_k } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown') e.preventDefault()
  },
})
whenever(ctrl_k, () => searchInput.value.focus())
</script>

<template>
    <div class="hidden md:block md:me-2 md:w-40 transition-property-all transition-ease-in transition-duration-200"
        :class="{ 'md:w-60': focused }">
        <n-auto-complete v-model:value="value" :options="options">
            <template #default="{ value: slotValue, handleInput }">
                <n-input ref="searchInput" @input="handleInput" :value="slotValue" :placeholder="t('common.search')"
                    @focus="focused = true" @blur="focused = false">
                    <template #prefix>
                        <n-icon :component="SearchIcon" />
                    </template>

                    <template #suffix>
                        <span class="kbd-container">
                            <span class="kbd">
                                <kbd class="kbd-ctrl">Ctrl</kbd>
                                <kbd>K</kbd>
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
        background: var(--n-background-color);
        border-radius: var(--n-border-radius);
        padding: 0 0.4rem;
        height: 23px;
        line-height: 1.2rem;
        font-size:.85rem;

        .kbd-ctrl {
            margin-right: 2px;
        }
    }
}

</style>
