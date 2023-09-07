<script setup>
defineProps({
  noShadow: { type: Boolean, default: false },
})
const slots = useSlots()
</script>

<template>
  <div>
    <div v-if="slots.header" class="py-3">
      <slot name="header" />
    </div>
    <div class="card-container my-1" :class="{ 'no-shadow': noShadow }">
      <div class="card-content bg-white dark:bg-slate-800 rounded-md shadow-lg p-3 relative z-10">
        <div v-if="slots.title">
          <slot name="title" />
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

    &:before {
        content: "";
        width: 90%;
        box-shadow: 0 3px 20px #0000000b;
        position: absolute;
        z-index: 9;
        left: 0px;
        right: 0px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.75rem;
        height: 100%;
        border-radius: 0.375rem;
        --tw-bg-opacity: 1;
        background-color: rgb(var(--color-slate-50) / var(--tw-bg-opacity));
    }

    &.no-shadow:before {
        display: none;
    }
}
</style>
