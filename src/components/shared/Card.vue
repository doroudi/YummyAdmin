<script setup>
defineProps({
  shadow: { type: Boolean, default: false },
  bottomBorder: { type: Boolean, default: false },
  title: { type: String, required: false },
})
const slots = useSlots()
const layout = useLayoutStore()
</script>

<template>
  <div>
    <div v-if="slots.header" class="py-3">
      <slot name="header" />
    </div>
    <div class="card-container my-1" :class="{ shadow }">
      <div
        class="card-content bg-white dark:bg-slate-900 rounded-md shadow-lg drop-shadow-md p-3 relative z-10"
        :class="{ 'bottom-border': bottomBorder }" :style="{ 'border-color': `${layout.themeColor}99` }"
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

    &.shadow:before {
        content: "";
        width: 92%;
        box-shadow: 0 3px 20px #00000010;
        position: absolute;
        z-index: 9;
        left: 0px;
        right: 0px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.70rem;
        height: 100%;
        border-radius: 0.375rem;
        --tw-bg-opacity: 1;
        background-color: rgb(var(--color-slate-50) / var(--tw-bg-opacity));
    }

    .bottom-border {
      border-bottom: solid 3px;
    }

    .title {
      font-size:1.1rem;
      font-weight: 500;
      margin: .1rem 0.5rem 1.2rem 0.5rem;
    }
}
</style>
