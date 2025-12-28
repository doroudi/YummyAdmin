<script setup lang="ts">
const props = withDefaults(defineProps(), {
  colors: () => [
    'var(--primary-color)',
    'var(--primary-color-shade1)',
    'var(--primary-color-shade2)',
    'var(--primary-color-shade3)',
  ],
  height: 400,
  loading: false,
})
</script>

<template>
  <BaseChart v-bind="$attrs" type="bar" :loading="loading" :height="height" :data="data" :colors="colors"
    :show-legend="showLegend" />
</template>

<style lang="scss" scoped></style>
