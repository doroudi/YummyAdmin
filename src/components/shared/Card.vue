<script setup lang="ts">
import { storeToRefs } from 'pinia'

defineProps({
  title: { type: String, required: false },
})
const slots = useSlots()
const layout = useLayoutStore()
const { flatDesign } = storeToRefs(layout)
</script>

<template>
  <div>
    <div v-if="slots.header" class="py-3">
      <slot name="header" />
    </div>
    <div class="card-container my-1">
      <div
        class="card-content bg-white dark:bg-slate-900 rounded-md border-solid border-cool-gray-200 dark:border-slate-8 p-3 relative z-10"
        :class="{ 'shadow-lg': !flatDesign, 'drop-shadow-md': !flatDesign, 'border-1': flatDesign }"
      >
        <div v-if="slots.title">
          <slot name="title" />
        </div>
        <div v-else-if="title">
          <h3 class="title text-dark-400 dark:text-light-800">
            {{ title }}
          </h3>
        </div>
        <div v-if="slots.subtitle">
          <slot name="subtitle" />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
    position: relative;

    .title {
      font-size:1.1rem;
      font-weight: 500;
      margin: .1rem 0.5rem 1.2rem 0.5rem;
    }
}
</style>
